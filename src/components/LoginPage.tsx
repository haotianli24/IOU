import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/iou_transparent.png"; // Adjust path as needed
import { auth, signInWithEmailAndPassword } from "../../firebase"; // Import Firebase auth

export function LoginPage() {
  const [email, setEmail] = useState(""); // State to track the email
  const [password, setPassword] = useState(""); // State to track the password
  const [error, setError] = useState(""); // State to track login errors

  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Log in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate("/dashboard"); // Redirect to the dashboard upon successful login
    } catch (err) {
      setError("Invalid email or password. Please try again."); // Display a user-friendly error
      console.error("Login failed:", err); // Log the error for debugging
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Outer container with full height and gray background */}
      <div className="relative w-full max-w-xl">
        {/* Logo container: position it above the form */}
        <div className="absolute w-full flex justify-center -top-[250px]">
          <img src={logo} alt="IOU Logo" className="w-100 h-auto" />
        </div>

        {/* White form box below the logo */}
        <div className="bg-white shadow-lg rounded-md pt-32 pb-16 px-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center text-lg">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middle-blue text-lg"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middle-blue text-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-8">
              <button
                type="button"
                className="bg-middle-blue text-white py-4 px-10 rounded-md hover:bg-darker-blue transition-colors flex-1 text-xl"
                onClick={() => navigate("/signup")} // Navigate to SignupPage
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="bg-middle-blue text-white py-4 px-10 rounded-md hover:bg-darker-blue transition-colors flex-1 text-xl"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
