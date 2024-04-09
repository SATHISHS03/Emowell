import React, { useState } from "react";
import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        email,
        username,
        password,
      });
      // Handle success (e.g., navigate to login page or show success message)
      console.log(response.data);
      navigate("/emowell/signin"); // Redirect user to login page after successful signup
    } catch (error) {
      // Handle error (e.g., show error message)
      // The optional chaining operator (?.) is used to safely access data without throwing an error if response is undefined or null.
      console.error(error.response?.data || error.message);
      // Set an error message to display to the user
      setErrorMessage(error.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <section className="min-h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="container max-w-md px-8 py-10 bg-white rounded-lg shadow dark:bg-neutral-800">
        <div className="text-center mb-10">
          <img
            className="mx-auto h-20 w-auto"
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-800 dark:text-neutral-200">
            Join The Emowell Team
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Sign up to start your journey
          </p>
        </div>
        {errorMessage && ( // Display error message if it exists
          <div className="mb-4 text-center text-sm text-red-600">
            {errorMessage}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSignup}>
        <div>
            <TEInput
              type="text"
              label="Username"
              placeholder="Your username"
              className="mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <TEInput
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              className="mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <TEInput
              type="password"
              label="Password"
              placeholder="••••••••"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <TEInput
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              className="mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="submit"
                style={{
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                Sign Up
              </button>
            </TERipple>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};
