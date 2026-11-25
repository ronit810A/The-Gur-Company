import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { validateProduct } from "../server.mjs";

const productKey = "gurcompany:products";
const sessionKeyPrefix = "gurcompany:admin-session:";
const sessionLifetimeSeconds = 8 * 60 * 60;
const seedPath = fileURLToPath(new URL("../data/products.json", import.meta.url));

const createProductScript = `
local products = cjson.decode(redis.call("GET", KEYS[1]) or "[]")
local product = cjson.decode(ARGV[1])
table.insert(products, product)
redis.call("SET", KEYS[1], cjson.encode(products))
return cjson.encode(product)
`;

const updateProductScript = `
local products = cjson.decode(redis.call("GET", KEYS[1]) or "[]")
local productId = ARGV[1]
local updatedProduct = cjson.decode(ARGV[2])
for index, product in ipairs(products) do
  if product.id == productId then
    products[index] = updatedProduct
    redis.call("SET", KEYS[1], cjson.encode(products))
    return cjson.encode(updatedProduct)
  end
end
return nil
`;

const deleteProductScript = `
local products = cjson.decode(redis.call("GET", KEYS[1]) or "[]")
local productId = ARGV[1]
for index, product in ipairs(products) do
  if product.id == productId then
    table.remove(products, index)
    redis.call("SET", KEYS[1], cjson.encode(products))
    return 1
  end
end
return 0
`;

function sendJson(response, status, value, headers = {}) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  for (const [name, content] of Object.entries(headers)) {
    response.setHeader(name, content);
  }
  response.end(JSON.stringify(value));
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw Object.assign(
      new Error("Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel Environment Variables."),
      { status: 503 }
    );
  }
  return { url, token };
}

async function redisCommand(...command) {
  const { url, token } = getRedisConfig();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const result = await response.json();
  if (!response.ok || result.error) {
    console.error("Product database request failed:", result.error || response.status);
    throw Object.assign(new Error("The product database request failed."), { status: 502 });
  }
  return result.result;
}

async function readJsonBody(request) {
  if (request.body !== undefined) {
    if (typeof request.body === "string") {
      try {
        return JSON.parse(request.body);
      } catch {
        throw Object.assign(new Error("Request body must be valid JSON."), { status: 400 });
      }
    }
    return request.body;
  }

  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > 1024 * 1024) {
      throw Object.assign(new Error("Request body is too large."), { status: 413 });
    }
  }
  try {
    return JSON.parse(body);
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON."), { status: 400 });
  }
}

async function readProducts() {
  const storedProducts = await redisCommand("GET", productKey);
  if (storedProducts !== null) {
    const products = JSON.parse(storedProducts);
    if (!Array.isArray(products)) {
      throw new Error("Stored product data must be an array.");
    }
    return products;
  }

  const seedProducts = JSON.parse(await readFile(seedPath, "utf8"));
  if (!Array.isArray(seedProducts)) {
    throw new Error("The initial product data must be an array.");
  }
  await redisCommand("SET", productKey, JSON.stringify(seedProducts), "NX");
  const initializedProducts = await redisCommand("GET", productKey);
  return JSON.parse(initializedProducts || JSON.stringify(seedProducts));
}

function getCookie(request, name) {
  const cookie = (request.headers.cookie || "")
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  return cookie?.slice(name.length + 1) || "";
}

async function readAdminSession(request) {
  const token = getCookie(request, "gurcompany-admin-session");
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const storedSession = await redisCommand("GET", `${sessionKeyPrefix}${token}`);
  if (!storedSession) return null;
  const session = JSON.parse(storedSession);
  if (session.expiresAt <= Date.now()) {
    await redisCommand("DEL", `${sessionKeyPrefix}${token}`);
    return null;
  }
  return session;
}

function getSuperAdminCredentials() {
  const email = process.env.SUPER_ADMIN_EMAIL?.trim();
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw Object.assign(
      new Error("Set SUPER_ADMIN_EMAIL and a SUPER_ADMIN_PASSWORD of at least 12 characters in Vercel Environment Variables."),
      { status: 503 }
    );
  }
  return { email, password };
}

function matchesCredentials(submittedEmail, submittedPassword, expectedEmail, expectedPassword) {
  const emailHash = (value) => createHash("sha256").update(value).digest();
  const emailMatches = timingSafeEqual(
    emailHash(submittedEmail.trim().toLowerCase()),
    emailHash(expectedEmail.trim().toLowerCase())
  );
  const passwordMatches = timingSafeEqual(emailHash(submittedPassword), emailHash(expectedPassword));
  return emailMatches && passwordMatches;
}

function setSessionCookie(request, response, token, maxAge) {
  const secure = request.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `gurcompany-admin-session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`
  );
}

async function handleLogin(request, response) {
  const { email, password } = getSuperAdminCredentials();
  const payload = await readJsonBody(request);
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
  if (!matchesCredentials(payload.email, payload.password, email, password)) {
    sendJson(response, 401, { error: "The email or password is incorrect." });
    return;
  }

  const token = randomBytes(32).toString("hex");
  const session = { email, expiresAt: Date.now() + sessionLifetimeSeconds * 1000 };
  await redisCommand(
    "SET",
    `${sessionKeyPrefix}${token}`,
    JSON.stringify(session),
    "EX",
    String(sessionLifetimeSeconds)
  );
  setSessionCookie(request, response, token, sessionLifetimeSeconds);
  sendJson(response, 200, { authenticated: true, email });
}

async function handleLogout(request, response) {
  const token = getCookie(request, "gurcompany-admin-session");
  if (/^[a-f0-9]{64}$/.test(token)) {
    await redisCommand("DEL", `${sessionKeyPrefix}${token}`);
  }
  setSessionCookie(request, response, "", 0);
  sendJson(response, 200, { authenticated: false });
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `https://${request.headers.host || "localhost"}`);
  const { pathname } = url;

  if (pathname === "/api/admin/session" && request.method === "GET") {
    const session = await readAdminSession(request);
    sendJson(response, 200, { authenticated: Boolean(session), email: session?.email || null });
    return;
  }

  if (pathname === "/api/admin/login" && request.method === "POST") {
    await handleLogin(request, response);
    return;
  }

  if (pathname === "/api/admin/logout" && request.method === "POST") {
    await handleLogout(request, response);
    return;
  }

  if (pathname === "/api/products" && request.method === "GET") {
    const products = await readProducts();
    sendJson(response, 200, products.filter((product) => product.status === "active"));
    return;
  }

  if (pathname === "/api/admin/products" && request.method === "GET") {
    if (!await readAdminSession(request)) {
      sendJson(response, 401, { error: "Sign in as a super admin to access the dashboard." });
      return;
    }
    sendJson(response, 200, await readProducts());
    return;
  }

  const productMatch = pathname.match(/^\/api\/products(?:\/([^/]+))?$/);
  if (!productMatch || !["POST", "PUT", "DELETE"].includes(request.method)) {
    sendJson(response, 404, { error: "API route not found." });
    return;
  }

  if (!await readAdminSession(request)) {
    sendJson(response, 401, { error: "Sign in as a super admin to manage products." });
    return;
  }

  if (request.method === "POST" && !productMatch[1]) {
    const payload = await readJsonBody(request);
    const validationError = validateProduct(payload);
    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }
    await readProducts();
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
    const createdProduct = await redisCommand(
      "EVAL",
      createProductScript,
      "1",
      productKey,
      JSON.stringify(product)
    );
    sendJson(response, 201, JSON.parse(createdProduct));
    return;
  }

  let productId;
  try {
    productId = decodeURIComponent(productMatch[1] || "");
  } catch {
    sendJson(response, 400, { error: "Product ID is invalid." });
    return;
  }
  if (!productId) {
    sendJson(response, 404, { error: "Product ID is required." });
    return;
  }

  if (request.method === "PUT") {
    const payload = await readJsonBody(request);
    const validationError = validateProduct(payload);
    if (validationError) {
      sendJson(response, 400, { error: validationError });
      return;
    }
    await readProducts();
    const updatedProduct = {
      id: productId,
      name: payload.name.trim(),
      category: payload.category,
      price: payload.price,
      stock: payload.stock,
      status: payload.status || "active",
      description: (payload.description || "").trim(),
      image: (payload.image || "").trim(),
    };
    const result = await redisCommand(
      "EVAL",
      updateProductScript,
      "1",
      productKey,
      productId,
      JSON.stringify(updatedProduct)
    );
    if (!result) {
      sendJson(response, 404, { error: "Product not found." });
      return;
    }
    sendJson(response, 200, JSON.parse(result));
    return;
  }

  await readProducts();
  const deleted = await redisCommand("EVAL", deleteProductScript, "1", productKey, productId);
  if (!deleted) {
    sendJson(response, 404, { error: "Product not found." });
    return;
  }
  sendJson(response, 200, { success: true });
}

export async function handleVercelApi(request, response) {
  try {
    await handleRequest(request, response);
  } catch (error) {
    console.error("Vercel API request failed:", error);
    if (!response.headersSent) {
      sendJson(response, error.status || 500, {
        error: error.status ? error.message : "The request could not be completed.",
      });
    } else {
      response.destroy();
    }
  }
}
