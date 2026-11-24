import { useState } from "react";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveProfile, readProfile } from "../ProfilePageData/profileData";
import { startDemoSession } from "./demoAuth";

function AuthForm({ mode, onAuthenticated }) {
  const [error, setError] = useState("");
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));

    try {
      let user;

      if (isSignup) {
        const name = String(formData.get("name")).trim();
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
          throw new Error("Your passwords do not match.");
        }

        saveProfile({ name, email, phone: "" });
        user = startDemoSession({ name, email });
      } else {
        const profile = readProfile();

        if (profile.email.toLowerCase() !== email.toLowerCase()) {
          throw new Error("No demo account matches that email. Please sign up first.");
        }

        user = startDemoSession(profile);
      }

      onAuthenticated(user);
      const returnPath = location.state?.from;
      const destination =
        !isSignup && ["/cart", "/wishlist"].includes(returnPath)
          ? returnPath
          : "/profile";
      navigate(destination, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-intro heading">
          <span className="auth-icon"><UserRound size={25} /></span>
          <h6 className="auth-eyebrow">THE GUR COMPANY</h6>
          <h1>{isSignup ? "Create your account." : "Welcome back."}</h1>
          <p>
            {isSignup
              ? "Save your details and keep your favourites close."
              : "Sign in to find your profile, wishlist and cart."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </>
          )}

          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="auth-password">Password</label>
          <div className="auth-password-field">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="auth-password"
              name="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </div>

          {isSignup && (
            <>
              <label htmlFor="auth-confirm-password">Confirm password</label>
              <div className="auth-password-field">
                <LockKeyhole size={17} aria-hidden="true" />
                <input
                  id="auth-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  minLength={8}
                  required
                />
              </div>
            </>
          )}

          <p className="auth-demo-note">
            Demo only: passwords are not saved or verified. Your profile details
            stay in this browser.
          </p>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit">
            {isSignup ? "Sign up" : "Log in"} <ArrowRight size={17} />
          </button>

          <p className="auth-switch">
            {isSignup ? "Already have a profile?" : "New to The Gur Company?"}{" "}
            <Link to={isSignup ? "/login" : "/signup"}>
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;
