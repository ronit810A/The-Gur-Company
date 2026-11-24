import { UserRound } from "lucide-react";

function ProfileOverview({ profile }) {
  const initials = profile.name
    ? profile.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "";

  return (
    <section className="profile-overview">
      <div className="profile-avatar" aria-hidden="true">
        {initials || <UserRound size={30} />}
      </div>
      <p className="profile-eyebrow">YOUR DETAILS</p>
      <h2 className="heading">{profile.name || "Welcome to your profile"}</h2>
      <p className="profile-overview-copy">
        {profile.email || "Add your details to make your profile yours."}
      </p>
      <div className="profile-privacy-note">
        Your profile details are saved on this device.
      </div>
    </section>
  );
}

export default ProfileOverview;
