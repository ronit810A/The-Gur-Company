import { createServer } from "node:http";
import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const port = Number(process.env.API_PORT || 3001);
const dataPath = fileURLToPath(new URL("./data/products.json", import.meta.url));
const categories = new Set(["powder", "block", "syrup"]);
const statuses = new Set(["active", "draft"]);
const bodyLimit = 1024 * 1024;
let mutationQueue = Promise.resolve();

async function readProducts() {
  const contents = await readFile(dataPath, "utf8");
  const products = JSON.parse(contents);
  if (!Array.isArray(products)) {
    throw new Error("The product data file must contain an array.");
  }
  return products;
}

function sendJson(response, status, value, headers = {}) {
  response.writeHead(status, { ...headers, "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function getAdminSession(request, sessions) {
  const sessionCookie = (request.headers.cookie || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("gurcompany-admin-session="));
  const sessionId = sessionCookie?.split("=", 2)[1];
  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

function isSecureRequest(request) {
  return request.socket.encrypted || request.headers["x-forwarded-proto"] === "https";
}

function sessionCookie(request, token, maxAge) {
  const secure = isSecureRequest(request) ? "; Secure" : "";
  return `gurcompany-admin-session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > bodyLimit) {
        reject(Object.assign(new Error("Request body is too large."), { status: 413 }));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error("Request body must be valid JSON."), { status: 400 }));
      }
    });
    request.on("error", reject);
  });
}

function validateProduct(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "A product object is required.";
  }
  if (typeof value.name !== "string" || !value.name.trim() || value.name.trim().length > 100) {
    return "Product name must be between 1 and 100 characters.";
  }
  if (!categories.has(value.category)) {
    return "Choose a valid product category.";
  }
  if (typeof value.price !== "number" || !Number.isFinite(value.price) || value.price <= 0) {
    return "Price must be a positive number.";
  }
  if (!Number.isInteger(value.stock) || value.stock < 0) {
    return "Stock must be a non-negative whole number.";
  }
  if (value.status !== undefined && !statuses.has(value.status)) {
    return "Product status must be active or draft.";
  }
  if (value.description !== undefined && (typeof value.description !== "string" || value.description.length > 400)) {
    return "Description must be 400 characters or fewer.";
  }
  if (value.image !== undefined && typeof value.image !== "string") {
    return "Product image must be a URL or an empty value.";
  }
  if (value.image) {
    try {
      const imageUrl = new URL(value.image);
      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        return "Product image must use an HTTP or HTTPS URL.";
      }
    } catch {
      if (!value.image.startsWith("/") || value.image.startsWith("//")) {
        return "Product image must be a valid HTTP or HTTPS URL.";
      }
    }
  }
  return "";
}

function mutateProducts(mutation) {
  const result = mutationQueue.catch(() => {}).then(async () => {
    const products = await readProducts();
    const outcome = mutation(products);
    if (outcome.save) {
      const temporaryPath = path.join(path.dirname(dataPath), `products-${randomUUID()}.tmp`);
      await writeFile(temporaryPath, `${JSON.stringify(outcome.products, null, 2)}\n`, "utf8");
      await rename(temporaryPath, dataPath);
    }
    return outcome;
  });
  mutationQueue = result.then(() => undefined, () => undefined);
  return result;
}

async function handleRequest(request, response, auth) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/admin/session" && request.method === "GET") {
    const session = getAdminSession(request, auth.sessions);
    sendJson(response, 200, { authenticated: Boolean(session), email: session?.email || null });
    return;
  }

  if (url.pathname === "/api/admin/login" && request.method === "POST") {
    if (!auth.email || !auth.password || auth.password.length < 12) {
      sendJson(response, 503, { error: "Set SUPER_ADMIN_EMAIL and a password of at least 12 characters in your .env file." });
      return;
    }

    const payload = await readRequestBody(request);
    if (
      !payload ||
      typeof payload.email !== "string" ||
      typeof payload.password !== "string" ||
      payload.email.length > 254 ||
      payload.password.length > 1024
    ) {
      sendJson(response, 400, { error: "Enter a valid email address and password." });
      return;
    }

    const submittedEmail = createHash("sha256").update(payload.email.trim().toLowerCase()).digest();
    const expectedEmail = createHash("sha256").update(auth.email.trim().toLowerCase()).digest();
    const submittedPassword = createHash("sha256").update(payload.password).digest();
    const expectedPassword = createHash("sha256").update(auth.password).digest();
    const validEmail = timingSafeEqual(submittedEmail, expectedEmail);
    const validPassword = timingSafeEqual(submittedPassword, expectedPassword);
    const validCredentials = validEmail && validPassword;

    if (!validCredentials) {
      sendJson(response, 401, { error: "The email or password is incorrect." });
      return;
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
    auth.sessions.set(token, { email: auth.email.trim(), expiresAt });
    sendJson(
      response,
      200,
      { authenticated: true, email: auth.email.trim() },
      { "Set-Cookie": sessionCookie(request, token, 8 * 60 * 60) }
    );
    return;
  }

  if (url.pathname === "/api/admin/logout" && request.method === "POST") {
    const sessionCookieHeader = (request.headers.cookie || "")
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("gurcompany-admin-session="));
    const sessionId = sessionCookieHeader?.split("=", 2)[1];
    if (sessionId) auth.sessions.delete(sessionId);
    sendJson(
      response,
      200,
      { authenticated: false },
      { "Set-Cookie": sessionCookie(request, "", 0) }
    );
    return;
  }

  if (url.pathname === "/api/admin/products" && request.method === "GET") {
    if (!getAdminSession(request, auth.sessions)) {
      sendJson(response, 401, { error: "Sign in as a super admin to access the dashboard." });
      return;
    }
    sendJson(response, 200, await readProducts());
    return;
  }

  if (!url.pathname.startsWith("/api/products")) {
    sendJson(response, 404, { error: "API route not found." });
    return;
  }

  if (url.pathname === "/api/products" && request.method === "GET") {
    const products = await readProducts();
    sendJson(response, 200, products.filter((product) => product.status === "active"));
    return;
  }

  if (
    url.pathname.startsWith("/api/products") &&
    ["POST", "PUT", "DELETE"].includes(request.method) &&
    !getAdminSession(request, auth.sessions)
  ) {
    sendJson(response, 401, { error: "Sign in as a super admin to manage products." });
    return;
  }

  if (url.pathname === "/api/products" && request.method === "POST") {
    const payload = await readRequestBody(request);
    const validationError = validateProduct(payload);
    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }
    const product = {
      id: randomUUID(),
      name: payload.name.trim(),
      category: payload.category,
      price: payload.price,
      stock: payload.stock,
      status: payload.status || "active",
      description: (payload.description || "").trim(),
      image: (payload.image || "").trim(),
    };
    const outcome = await mutateProducts((products) => ({
      products: [...products, product],
      save: true,
    }));
    sendJson(response, 201, outcome.products[outcome.products.length - 1]);
    return;
  }

  const productMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);
  if (!productMatch) {
    sendJson(response, 404, { error: "API route not found." });
    return;
  }

  let productId;
  try {
    productId = decodeURIComponent(productMatch[1]);
  } catch {
    sendJson(response, 400, { error: "Product ID is invalid." });
    return;
  }

  if (request.method === "PUT") {
    const payload = await readRequestBody(request);
    const validationError = validateProduct(payload);
    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }
    const outcome = await mutateProducts((products) => {
      const index = products.findIndex((product) => product.id === productId);
      if (index === -1) return { products, save: false, missing: true };
      const updatedProduct = {
        ...products[index],
        name: payload.name.trim(),
        category: payload.category,
        price: payload.price,
        stock: payload.stock,
        status: payload.status || "active",
        description: (payload.description || "").trim(),
        image: (payload.image || "").trim(),
      };
      const updatedProducts = products.slice();
      updatedProducts[index] = updatedProduct;
      return { products: updatedProducts, save: true, product: updatedProduct };
    });
    if (outcome.missing) {
      sendJson(response, 404, { error: "Product not found." });
      return;
    }
    sendJson(response, 200, outcome.product);
    return;
  }

  if (request.method === "DELETE") {
    const outcome = await mutateProducts((products) => {
      const remaining = products.filter((product) => product.id !== productId);
      return { products: remaining, save: remaining.length !== products.length, missing: remaining.length === products.length };
    });
    if (outcome.missing) {
      sendJson(response, 404, { error: "Product not found." });
      return;
    }
    sendJson(response, 200, { success: true });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed." });
}

function handleApiError(error, response) {
  console.error("Product API request failed:", error);
  if (!response.headersSent) {
    sendJson(response, error.status || 500, { error: error.status ? error.message : "The product request could not be completed." });
  } else {
    response.destroy();
  }
}

export function createProductApiMiddleware({
  superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "",
  superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "",
} = {}) {
  const auth = {
    email: superAdminEmail,
    password: superAdminPassword,
    sessions: new Map(),
  };

  return (request, response, next) => {
    if (!request.url?.startsWith("/api/")) {
      next();
      return;
    }

    handleRequest(request, response, auth).catch((error) => handleApiError(error, response));
  };
}

export function createProductServer() {
  return createServer(createProductApiMiddleware());
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createProductServer().listen(port, "127.0.0.1", () => {
    console.log(`Product API running at http://127.0.0.1:${port}`);
  });
}
