import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
      password: ""
    });
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
        [name]: value
      });
    };
    const handleLoginSubmit = (event) => {
      event.preventDefault();
      const email = loginData.email.trim();
      const password = loginData.password;
      // Get registered user from localStorage
      const savedUser =
        JSON.parse(localStorage.getItem("cargoUser"));
      // Check whether account exists
      if (!savedUser) {
        alert("No account found. Please create an account first.");
        return;
      }
      // Check email
      if (email !== savedUser.email) {
        alert("Invalid email address.");
        return;
      }
      // Check password
      if (password !== savedUser.password) {
        alert("Incorrect password.");
        return;
      }
      // Login successful
      localStorage.setItem("cargoLoggedIn", "true");
      alert("Login successful!");
      navigate("/");
    };
    return (
      <main className="login-page">
        <section className="login-container">
          <div className="login-heading">
            <p className="login-small-title">WELCOME BACK</p>
            <h1>Login to CarGo</h1>
            <p>Login to manage your bookings and favorite cars. </p>
          </div>
          <form
            className="login-form"
            onSubmit={handleLoginSubmit}>
            <div className="login-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                required />
            </div>
            <div className="login-form-group">
              <label>Password</label>
             <div className="login-password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required/>
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowLoginPassword(!showLoginPassword)
                  }
                  aria-label={
                    showLoginPassword
                      ? "Hide password"
                      : "Show password"
                  }>    {showLoginPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit-btn"> Login </button>
          </form>
          <div className="login-extra-text">
            <p>Don't have an account?
               <button type="button"
                   className="login-create-account-btn"
                   onClick={() => navigate("/register")}
              >Create Account</button>
            </p>
          </div>
        </section>
      </main>
     );  
}
export default Login