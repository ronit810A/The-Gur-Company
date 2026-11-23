import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

function ContactSection() {
  const [mailLink, setMailLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const link = `mailto:support@thegurcompany?subject=${subject}&body=${body}`;
    setMailLink(link);
    window.location.href = link;
  };

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <p className="contact-eyebrow">WE’RE HERE FOR YOU</p>
          <h1>Let’s talk<br />all things gur.</h1>
          <p>
            Have a question, a recipe to share, or just want to say hello?
            We’d be happy to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-details">
              <p className="contact-eyebrow">GET IN TOUCH</p>
              <h2>We’d love to<br />hear from you.</h2>
              <p className="contact-intro">
                Send us a note and our team will be glad to help with your
                questions about our products, orders, or recipes.
              </p>

              <a className="contact-detail" href="tel:+918297966777">
                <span className="contact-detail-icon"><Phone size={20} /></span>
                <span><small>Call us</small><strong>+91 8297 966 777</strong></span>
              </a>
              <a className="contact-detail" href="mailto:support@thegurcompany">
                <span className="contact-detail-icon"><Mail size={20} /></span>
                <span><small>Email us</small><strong>support@thegurcompany</strong></span>
              </a>
              <div className="contact-detail">
                <span className="contact-detail-icon"><MapPin size={20} /></span>
                <span>
                  <small>Find us</small>
                  <strong>175 Elizabeth Ave Str, San Jose,<br />CA, 90025</strong>
                </span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <p className="contact-eyebrow">DROP US A NOTE</p>
              <h2>What’s on your mind?</h2>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="How should we address you?" required />
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              <label htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" name="message" rows="5" placeholder="Tell us a little more..." required />
              <button className="contact-submit" type="submit">
                Open your email app <Send size={17} />
              </button>
              {mailLink && (
                <p className="contact-form-note" role="status">
                  If your email app didn’t open, <a href={mailLink}>send your message here</a>.
                </p>
              )}
              <p className="contact-form-note">
                Submitting opens your email app with your message ready to send.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
