import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MandiRates from "./pages/MandiRates";
import Pesticides from "./pages/Pesticides";
import Weather from "./pages/Weather";
import DrPlant from "./pages/DrPlant";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import KisaanNews from "./pages/KisaanNews";

export default function App() {
  const email = localStorage.getItem("userEmail");

  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔐 NOT LOGGED IN -> ONLY LOGIN PAGE */}
      {!email && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

      {/* ✅ LOGGED-IN USER */}
      {email && (
        <>
          <Header />

          <main className="flex-1 container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Tools */}
              <Route path="/mandi" element={<MandiRates />} />
              <Route path="/pesticides" element={<Pesticides />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/drplant" element={<DrPlant />} />

              {/* 🔥 NEW: KISAAN NEWS PAGE */}
              <Route path="/news" element={<KisaanNews />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminPanel />} />

              {/* Invalid Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </>
      )}

    </div>
  );
}
