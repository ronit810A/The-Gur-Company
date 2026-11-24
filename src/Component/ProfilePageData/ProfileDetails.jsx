import { useState } from "react";
import { Save } from "lucide-react";
import { saveProfile } from "./profileData";

function ProfileDetails({ profile, onProfileChange, onError }) {
  const [notice, setNotice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedProfile = {
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim(),
      phone: String(formData.get("phone")).trim(),
    };

    try {
      onProfileChange(saveProfile(updatedProfile));
      setNotice("Your profile details have been saved.");
      onError("");
    } catch (saveError) {
      onError(saveError.message);
      setNotice("");
    }
  };

  return (
    <section className="profile-details">
      <div className="heading profile-section-heading">
        <h6 className="profile-eyebrow">ACCOUNT INFORMATION</h6>
        <h2>Your details</h2>
        <p>Update the information you’d like us to have on hand.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-name">Full name</label>
        <input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          defaultValue={profile.name}
          required
        />

        <label htmlFor="profile-email">Email address</label>
        <input
          id="profile-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={profile.email}
          required
        />

        <label htmlFor="profile-phone">Phone number</label>
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          defaultValue={profile.phone}
        />

        <button className="profile-save-button" type="submit">
          Save profile <Save size={17} />
        </button>
        {notice && <p className="profile-status" role="status">{notice}</p>}
      </form>
    </section>
  );
}

export default ProfileDetails;
