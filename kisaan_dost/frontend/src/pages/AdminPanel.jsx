import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail") || "");
  }, []);

  if (userEmail !== "harsh.bajpaics@gmail.com") {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Access Denied ❌<br />
        Only Harsh can access Admin Panel.
      </div>
    );
  }

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome Harsh! You alone can manage this panel.</p>
    </div>
  );
}
