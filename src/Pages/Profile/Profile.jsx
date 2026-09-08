import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("cargoUser")) || null;
    setUser(savedUser);
    if (savedUser) {
      setProfileData({
        name: savedUser.name,
        email: savedUser.email
      });
    }
  }, []);
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  const handleSaveProfile = () => {
    const updatedName = profileData.name.trim();
    const updatedEmail = profileData.email.trim();
    if (updatedName.length < 3) {
      alert("Please enter a valid name.");
      return;
    }
    if (!updatedEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    const updatedUser = {
      ...user,
      name: updatedName,
      email: updatedEmail
    };
    localStorage.setItem(
      "cargoUser",
      JSON.stringify(updatedUser)
    );
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };
  const handleProfileLogout = () => {
    localStorage.removeItem("cargoLoggedIn");
    alert("Logged out successfully.");
    navigate("/login");
  };
  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-empty">
          <h2>No User Found</h2>
          <p>Please create an account first.</p>
        </div>
      </main>
    );
  }
  return (
    <main className="profile-page">
      <section className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            👤
          </div>
          <h1>My Profile</h1>
          <p>
            Manage your CarGo account information.
          </p>
        </div>
        <div className="profile-information">
          {/* NAME */}
          <div className="profile-information-row">
            <span className="profile-information-label">
              Name
            </span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="profile-edit-input"
              />
            ) : (
              <span className="profile-information-value">
                {user.name}
              </span>
            )}
          </div>
          {/* EMAIL */}
          <div className="profile-information-row">
            <span className="profile-information-label">
              Email
            </span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="profile-edit-input"
              />
            ) : (
              <span className="profile-information-value">
                {user.email}
              </span>
            )}
          </div>
          {/* ACCOUNT STATUS */}
          <div className="profile-information-row">
            <span className="profile-information-label">
              Account Status
            </span>
            <span className="profile-status">
              Active
            </span>
          </div>
        </div>
        {/* PROFILE ACTIONS */}
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button
                type="button"
                className="profile-save-btn"
                onClick={handleSaveProfile}
              >Save Changes
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setProfileData({
                    name: user.name,
                    email: user.email
                  });
                }}
              >Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="profile-edit-btn"
              onClick={() => setIsEditing(true)}
            >Edit Profile
            </button>
          )}
          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleProfileLogout}
          >Logout
          </button>
        </div>
      </section>
    </main>
  );
}
export default Profile;