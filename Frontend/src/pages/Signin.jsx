import React, { useState } from "react";
import axios from "axios";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
// import { authState } from "../store/atoms/state"; // Ensure correct import path
// import { useSetRecoilState } from 'recoil';
import { useAuth } from "../hooks/useAuth";
export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", { email, password });
      login(response.data.token); // Use login from useAuth to set the token
      navigate("/emowell/dashboard"); // Navigate to the dashboard upon successful login
    } catch (error_) { // Note the use of error_ to avoid name conflict
      // Extract the error message from the response if available, otherwise use the generic error message
      // setError(error_.response?.data.message || error_.message);
      console.log(error_.response?.data.message || error_.message); // Corrected to use error_
      alert(error_.response?.data.message || error_.message); // Corrected to use error_
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
            Welcome Back to The Emowell Team
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Please login to your account
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <TEInput
              type="text"
              label="Email"
              placeholder="Your email"
              className="mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Corrected here
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
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#!" className="font-medium text-orange-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
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
                Sign In
              </button>
            </TERipple>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account? 
            <a href="/emowell/Signup" className="font-medium text-orange-600 hover:text-indigo-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
