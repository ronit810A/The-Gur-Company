import { useEffect, useState } from "react";
import { ArrowLeft, Leaf, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Css/admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Admin session could not be checked.");
        if (active && result.authenticated) navigate("/admin", { replace: true });
      })
      .catch((sessionError) => {
        if (active) setError(sessionError.message);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign-in failed.");
      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingSession) {
    return <main className="admin-auth-loading" role="status">Checking super-admin session…</main>;
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link className="admin-login-brand" to="/" aria-label="The Gur Company home">
          <span className="admin-brand-icon"><Leaf size={21} /></span>
          <span>The Gur Company<small>ADMIN PORTAL</small></span>
        </Link>

        <div className="admin-login-icon"><ShieldCheck size={25} /></div>
        <p className="admin-eyebrow">SECURE ADMIN ACCESS</p>
        <h1>Welcome back</h1>
        <p className="admin-login-description">Sign in with your super-admin account to manage the store.</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />

          {error && <div className="admin-login-error" role="alert">{error}</div>}

          <button type="submit" className="admin-login-submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in to dashboard"}
          </button>
        </form>

        <Link className="admin-login-back" to="/"><ArrowLeft size={15} /> Back to storefront</Link>
      </section>
    </main>
  );
}

export default AdminLogin;
