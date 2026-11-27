import { Link } from "react-router-dom";
import "../Css/privacy-policy.css";

function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <section className="privacy-policy-hero">
        <div className="container">
          <p className="privacy-policy-eyebrow">YOUR PRIVACY MATTERS</p>
          <h1>Privacy Policy</h1>
          <p>
            This page explains the information the current Gur Company website
            stores and how it is used.
          </p>
        </div>
      </section>

      <section className="privacy-policy-content">
        <div className="container">
          <p className="privacy-policy-intro">
            This policy reflects the features currently implemented on this
            website. It may change if the site’s features or data practices change.
          </p>

          <section className="privacy-policy-section">
            <h2>Information saved in your browser</h2>
            <p>
              The site uses your browser’s local storage to support its demo
              account and shopping features. This can include your name and email
              for the demo session, profile details such as your phone number,
              and the products in your cart and wishlist.
            </p>
            <p>
              This information is stored on the device and browser you use to
              visit the site. It remains there until you remove it in the site
              or clear the browser’s saved site data.
            </p>
          </section>

          <section className="privacy-policy-section">
            <h2>Contact form</h2>
            <p>
              Submitting the contact form opens your email application with your
              message, name, and email address filled in. The website does not
              send the message itself; it is sent only if you choose to send it
              from your email application.
            </p>
          </section>

          <section className="privacy-policy-section">
            <h2>Cookies and site services</h2>
            <p>
              The admin dashboard uses a session cookie to keep an authorised
              administrator signed in. It is marked HttpOnly and SameSite=Strict,
              expires after eight hours, and is marked Secure on HTTPS requests.
            </p>
            <p>
              Product pages request the active product catalogue from this site’s
              API. The site also loads font files from Google Fonts.
            </p>
          </section>

          <section className="privacy-policy-section">
            <h2>Your choices</h2>
            <p>
              You can remove saved profile, cart, wishlist, and demo-session
              information by clearing this site’s local storage in your browser.
              This also removes the data needed to restore those features on
              your next visit.
            </p>
            <p>
              For privacy questions, contact us at{" "}
              <a href="mailto:support@thegurcompany">support@thegurcompany</a>.
            </p>
          </section>

          <Link className="privacy-policy-back" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
