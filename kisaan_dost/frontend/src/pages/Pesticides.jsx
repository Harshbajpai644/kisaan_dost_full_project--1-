import React, { useState } from "react";

/**
 * Pesticides.jsx
 * - Soil types list
 * - When a soil type is selected, shows crops suitable for that soil and suggested pesticide companies.
 * - Company cards include external link + small details.
 */

const soilTypes = [
  { id: "alluvial", name: "Alluvial Soil" },
  { id: "black", name: "Black (Regur) Soil" },
  { id: "red", name: "Red Soil" },
  { id: "laterite", name: "Laterite Soil" },
  { id: "mountain", name: "Mountain Soil" },
  { id: "desert", name: "Desert Soil" },
  { id: "marshy", name: "Marshy Soil" }
];

const soilCropMap = {
  alluvial: ["Wheat","Rice","Sugarcane","Maize","Pulses"],
  black: ["Cotton","Maize","Chickpea","Millets"],
  red: ["Cotton","Tobacco","Pulses","Groundnut"],
  laterite: ["Cashew","Coffee","Rubber (in suitable climates)"],
  mountain: ["Tea","Spices","Fruits"],
  desert: ["Pearl millet (Bajra)","Castor"],
  marshy: ["Paddy","Jute"]
};

const companies = [
  {
    name: "UPL",
    url: "https://www.upl-ltd.com/",
    notes: "Large agri-input company — insecticides, fungicides, seed treatments."
  },
  {
    name: "Bayer Crop Science",
    url: "https://www.cropscience.bayer.in/",
    notes: "Seeds, crop protection solutions, advisory services."
  },
  {
    name: "Syngenta India",
    url: "https://www.syngenta.co.in/",
    notes: "Crop protection, seeds, digital agri solutions."
  },
  {
    name: "BASF India",
    url: "https://agriculture.basf.in/",
    notes: "Crop protection, fungicides and herbicides."
  },
  {
    name: "Rallis India",
    url: "https://www.rallis.co.in/",
    notes: "Agri-inputs, crop protection, biopesticides."
  }
];

export default function Pesticides() {
  const [selectedSoil, setSelectedSoil] = useState(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧪 Pesticide & Soil Guide</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {soilTypes.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSoil(s.id)}
            className={`p-4 rounded-xl border shadow hover:shadow-lg transition text-left ${selectedSoil===s.id ? "bg-green-50 border-green-300" : "bg-white"}`}
          >
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-gray-500">Tap to view crops</div>
          </button>
        ))}
      </section>

      <section>
        {selectedSoil ? (
          <div className="bg-white p-6 rounded-2xl border shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{soilTypes.find(s=>s.id===selectedSoil).name}</h2>
              <button onClick={()=>setSelectedSoil(null)} className="text-sm text-green-600 hover:underline">Back</button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Suitable Crops</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {soilCropMap[selectedSoil].map(c => (
                  <li key={c} className="p-3 border rounded-xl bg-gray-50">{c}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Top Pesticide Companies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.map((co) => (
                  <div key={co.name} className="p-4 border rounded-xl bg-white shadow hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold">{co.name}</div>
                        <div className="text-sm text-gray-600">{co.notes}</div>
                      </div>
                      <a
                        href={co.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1 bg-green-600 text-white rounded-xl hover:bg-green-700"
                      >
                        Visit
                      </a>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      <strong>Details:</strong> Company provides multiple products — use label instructions. For exact pesticide selection, always follow extension officer advice.
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-gray-600">Select a soil type to see suitable crops and pesticide company info.</div>
        )}
      </section>
    </div>
  );
}
