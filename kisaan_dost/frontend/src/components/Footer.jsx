import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white p-4 mt-8">
      <div className="text-center">
        © {new Date().getFullYear()} KisaanDost — Empowering Farmers with Smart Tools
      </div>
    </footer>
  );
}


