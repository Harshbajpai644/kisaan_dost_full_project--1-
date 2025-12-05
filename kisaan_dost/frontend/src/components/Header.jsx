import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const email = localStorage.getItem("userEmail");
  const isAdmin = email === "harsh.bajpaics@gmail.com";

  return (
    <header className="bg-green-700 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-xl font-bold">KisaanDost</span>
        </Link>

        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/mandi">Mandi Rates</Link>
          <Link to="/pesticides">Pesticides</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/drplant">Dr.Plant</Link>

          {isAdmin && (
            <Link to="/admin" className="text-yellow-300 font-bold">
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
