
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const contactEmail = "ronit810a@gmail.com";

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function ContactSection() {
  const [submission, setSubmission] = useState({
    sending: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    // Check EmailJS configuration
    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      setSubmission({
        sending: false,
        error: "EmailJS is not configured. Please check your .env file.",
        success: "",
      });
      return;
    }

    setSubmission({
      sending: true,
      error: "",
      success: "",
    });

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        emailServiceId,
        emailTemplateId,
        form,
        emailPublicKey
      );

      // Reset form after successful submission
      form.reset();

      setSubmission({
        sending: false,
        error: "",
        success: "Your message has been sent successfully!",
      });

    } catch (error) {
      console.error("EmailJS Error:", error);
      const errorMessage = typeof error?.text === "string"
        ? error.text
        : error instanceof Error
          ? error.message
          : "Unknown EmailJS error";
      const errorStatus = error?.status ? ` (${error.status})` : "";

      setSubmission({
        sending: false,
        error: `EmailJS error${errorStatus}: ${errorMessage}. Please check your EmailJS service, template, public key, and allowed domain. You can also email us directly at ${contactEmail}.`,
        success: "",
      });
    }
  };

  return (
    <>
      {/* Contact Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-eyebrow">
            WE’RE HERE FOR YOU
          </p>

          <h1>
            Let’s talk
            <br />
            all things gur.
          </h1>

          <p>
            Have a question, a recipe to share, or just want to say hello?
            We’d be happy to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-layout">

            {/* Contact Details */}
            <div className="contact-details">
              <p className="contact-eyebrow">
                GET IN TOUCH
              </p>

              <h2>
                We’d love to
                <br />
                hear from you.
              </h2>

              <p className="contact-intro">
                Send us a note and our team will be glad to help with your
                questions about our products, orders, or recipes.
              </p>

              {/* Phone */}
              <a
                className="contact-detail"
                href="tel:+918297966777"
              >
                <span className="contact-detail-icon">
                  <Phone size={20} />
                </span>

                <span>
                  <small>Call us</small>
                  <strong>+91 8297 966 777</strong>
                </span>
              </a>

              {/* Email */}
              <a
                className="contact-detail"
                href={`mailto:${contactEmail}`}
              >
                <span className="contact-detail-icon">
                  <Mail size={20} />
                </span>

                <span>
                  <small>Email us</small>
                  <strong>{contactEmail}</strong>
                </span>
              </a>

              {/* Address */}
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <MapPin size={20} />
                </span>

                <span>
                  <small>Find us</small>

                  <strong>
                    175 Elizabeth Ave Str, San Jose,
                    <br />
                    CA, 90025
                  </strong>
                </span>
              </div>
            </div>

            {/* Contact Form */}
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <p className="contact-eyebrow">
                DROP US A NOTE
              </p>

              <h2>
                What’s on your mind?
              </h2>

              {/* Name */}
              <label htmlFor="contact-name">
                Your name
              </label>

              <input
                id="contact-name"
                name="from_name"
                type="text"
                autoComplete="name"
                placeholder="How should we address you?"
                required
              />

              {/* Email */}
              <label htmlFor="contact-email">
                Email address
              </label>

              <input
                id="contact-email"
                name="reply_to"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              {/* Message */}
              <label htmlFor="contact-message">
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell us a little more..."
                required
              />

              {/* Submit Button */}
              <button
                className="contact-submit"
                type="submit"
                disabled={submission.sending}
              >
                {submission.sending
                  ? "Sending..."
                  : "Submit"}

                <Send size={17} />
              </button>

              {/* Error Message */}
              {submission.error && (
                <p
                  className="contact-form-note"
                  role="alert"
                >
                  {submission.error}
                </p>
              )}

              {/* Success Message */}
              {submission.success && (
                <p
                  className="contact-form-note"
                  role="status"
                >
                  {submission.success}
                </p>
              )}

            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
