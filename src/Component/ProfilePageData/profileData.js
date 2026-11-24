export const PROFILE_STORAGE_KEY = "gurcompany-profile";

export const emptyProfile = {
  name: "",
  email: "",
  phone: "",
};

export function readProfile() {
  const savedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!savedProfile) {
    return emptyProfile;
  }

  const profile = JSON.parse(savedProfile);
  const isValidProfile =
    profile &&
    typeof profile.name === "string" &&
    typeof profile.email === "string" &&
    typeof profile.phone === "string";

  if (!isValidProfile) {
    throw new Error("Your saved profile data is not in the expected format.");
  }

  return profile;
}

export function saveProfile(profile) {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}
