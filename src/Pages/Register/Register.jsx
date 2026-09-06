import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
    const handleRegisterChange = (event) => {
      const { name, value } = event.target;
      setRegisterData({
        ...registerData,
        [name]: value
      });
    };
    const handleRegisterSubmit = (event) => {
      event.preventDefault();
      const name = registerData.name.trim();
      const email = registerData.email.trim();
      const password = registerData.password;
      const confirmPassword = registerData.confirmPassword;
      if (name.length < 3) {
        alert("Please enter a valid name.");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      const existingUser =
        JSON.parse(localStorage.getItem("cargoUser"));
      if (existingUser && existingUser.email === email) {
        alert("An account with this email already exists.");
        return;
      }
      const userData = {
          name: name,
          email: email,
          password: password
      };
      localStorage.setItem(
        "cargoUser",
        JSON.stringify(userData)
      );
      alert("Account created successfully!");
      navigate("/login");
    };
  return (

          <main className="register-page">
            <section className="register-container">
              <div className="register-heading">
                <p className="register-small-title"> JOIN CARGO </p>
                <h1>Create Account</h1>
                <p>Create your account to book cars and manage your rentals.</p>
              </div>
              <form
                className="register-form"
                onSubmit={handleRegisterSubmit}>
                <div className="register-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required/>
                </div>
                <div className="register-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required/>
                </div>
                <div className="register-form-group">
                  <label>Password</label>
                  <div className="register-password-wrapper">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required/>
                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      aria-label={
                        showRegisterPassword
                          ? "Hide password"
                          : "Show password"
                      }>
                      {showRegisterPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="register-form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required/>
                </div>
                <button
                  type="submit"
                  className="register-submit-btn"
                >Create Account</button>
              </form>
              <div className="register-login-text">
                <p>
                  Already have an account?
                  <button
                    type="button"
                    className="register-login-btn"
                    onClick={() => navigate("/login")}
                  >Login</button>
                </p>
              </div>
            </section>
          </main>
  )
}
export default Register