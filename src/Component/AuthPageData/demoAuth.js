export const DEMO_SESSION_KEY = "gurcompany-demo-session";

export function readDemoSession() {
  const savedSession = window.localStorage.getItem(DEMO_SESSION_KEY);

  if (!savedSession) {
    return null;
  }

  const session = JSON.parse(savedSession);

  if (
    !session ||
    typeof session.name !== "string" ||
    typeof session.email !== "string"
  ) {
    throw new Error("Your saved demo session is not in the expected format.");
  }

  return session;
}

export function startDemoSession(user) {
  const session = {
    name: user.name,
    email: user.email,
  };

  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function endDemoSession() {
  window.localStorage.removeItem(DEMO_SESSION_KEY);
}
