import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      localStorage.setItem("userEmail", email);

      navigate("/");
    } catch (err) {
      console.log("Login Error:", err);
      alert("Google Login failed. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        
        <h1 className="text-3xl font-bold text-green-700 mb-6">Kisaan Dost</h1>
        <p className="text-gray-700 mb-6">Login to continue</p>

        <button
          onClick={loginGoogle}
          className="bg-green-600 text-white px-6 py-3 rounded-xl w-full hover:bg-green-700 transition"
        >
          Sign in with Google
        </button>

      </div>
    </div>
  );
}
