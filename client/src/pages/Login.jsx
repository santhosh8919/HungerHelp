import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting after login
import "./Login.css";

const URL = "https://surplus-food-management.onrender.com/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "", // Updated to 'email' instead of 'username'
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages if login fails
  const navigate = useNavigate(); // Hook to handle redirection

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value, // Dynamically update state for each input field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Correct payload structure
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        alert("Login successful");
        setUser({ email: "", password: "" });

        // Role-based redirection
        if (data.role === "donor") {
          navigate("/doner");
        } else if (data.role === "receiver") {
          navigate("/receiver");
        } else {
          alert("Unauthorized role");
        }
      } else {
        setErrorMessage(data.message || "Invalid credentials");
        console.log("Invalid credentials:", data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login2.png"
                  alt="a man is trying to do login"
                  width="600"
                  height="450"
                />
              </div>
              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email" // Changed to 'email'
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
