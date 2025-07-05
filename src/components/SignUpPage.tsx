import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/iou_transparent.png"; // Adjust path as needed
import { auth, createUserWithEmailAndPassword } from "../../firebase"; // Correct import from firebase.js

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset the error state
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      // Handle Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("The password is too weak. It must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is badly formatted.");
      } else {
        setError("Failed to create account. Please try again.");
      }
      console.error("Error during sign-up:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl">
        <div className="absolute w-full flex justify-center -top-[250px]">
          <img src={logo} alt="IOU Logo" className="w-100 h-auto" />
        </div>

        <div className="bg-white shadow-lg rounded-md pt-32 pb-16 px-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Display error message */}
            {error && (
              <div className="text-red-500 text-center text-lg">{error}</div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middle-blue text-lg"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middle-blue text-lg"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middle-blue text-lg"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-middle-blue text-white py-4 px-10 rounded-md hover:bg-darker-blue transition-colors w-full text-xl"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
