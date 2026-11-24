import { useEffect, useState } from "react";
import ProfileDetails from "../Component/ProfilePageData/ProfileDetails";
import ProfileHero from "../Component/ProfilePageData/ProfileHero";
import ProfileOverview from "../Component/ProfilePageData/ProfileOverview";
import ProfileShortcuts from "../Component/ProfilePageData/ProfileShortcuts";
import { emptyProfile, readProfile } from "../Component/ProfilePageData/profileData";
import "../Css/home.css";
import "../Css/profile.css";

function Profile({ onLogout }) {
  const [profile, setProfile] = useState(emptyProfile);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      try {
        setProfile(readProfile());
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProfile();
    window.addEventListener("storage", loadProfile);
    return () => window.removeEventListener("storage", loadProfile);
  }, []);

  return (
    <main className="profile-page">
      <ProfileHero />
      {error ? (
        <section className="profile-content">
          <div className="container">
            <p className="profile-error" role="alert">
              We couldn’t load your profile. Please check your saved profile data.
            </p>
          </div>
        </section>
      ) : !isLoaded ? (
        <section className="profile-content" aria-busy="true">
          <div className="container">
            <p className="profile-loading">Loading your profile...</p>
          </div>
        </section>
      ) : (
        <section className="profile-content">
          <div className="container">
            <div className="profile-layout">
              <div className="profile-sidebar">
                <ProfileOverview profile={profile} onLogout={onLogout} />
                <ProfileShortcuts />
              </div>
              <ProfileDetails
                profile={profile}
                onProfileChange={setProfile}
                onError={setError}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Profile;
