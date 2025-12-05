import React, { useState } from "react";



const states = [
  "Uttar Pradesh","Madhya Pradesh","Punjab","Haryana","Rajasthan","Bihar",
  "Maharashtra","Gujarat","Karnataka","Tamil Nadu","Andhra Pradesh","Telangana",
  "Assam","Odisha","West Bengal","Jharkhand","Chhattisgarh","Kerala","Uttarakhand",
  "Himachal Pradesh","Goa","Tripura","Manipur","Meghalaya","Nagaland","Arunachal Pradesh",
  "Sikkim","Jammu & Kashmir","Ladakh"
];

const cropBank = {
  "Uttar Pradesh": ["Wheat","Rice","Sugarcane","Maize","Pulses","Mustard"],
  "Madhya Pradesh": ["Soybean","Wheat","Pulses","Cotton","Maize"],
  "Punjab": ["Wheat","Rice","Cotton","Maize"],
  "Haryana": ["Wheat","Rice","Cotton","Sugarcane"],
  "Rajasthan": ["Wheat","Bajra","Mustard","Cotton"],
  "Bihar": ["Rice","Wheat","Maize","Lentils"],
  "Maharashtra": ["Cotton","Sugarcane","Soybean","Jowar","Maize"],
  "Gujarat": ["Cotton","Groundnut","Wheat","Vegetables"],

  default: ["Wheat","Rice","Maize","Pulses"]
};

export default function MandiRates() {
  const [selectedState, setSelectedState] = useState(null);

  const cropsFor = (s) => cropBank[s] || cropBank.default;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🌾 Mandi Rates — States</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedState(s)}
            className="text-left p-4 bg-white rounded-2xl border shadow hover:shadow-lg transition flex items-center justify-between"
          >
            <span className="font-semibold">{s}</span>
            <span className="text-sm text-gray-500">See crops →</span>
          </button>
        ))}
      </section>

      <section>
        {selectedState ? (
          <div className="bg-white p-6 rounded-2xl border shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedState} — Crops</h2>
              <button
                onClick={() => setSelectedState(null)}
                className="text-sm text-green-600 hover:underline"
              >
                Back to states
              </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {cropsFor(selectedState).map((c) => (
                <li key={c} className="p-3 border rounded-xl bg-green-50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c}</span>
                    <span className="text-sm text-gray-600">List</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-600">Select any state above to view its common crops.</div>
        )}
      </section>
    </div>
  );
}
