import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

 
  const API_KEY = "d39f2e0b469efc6d95fd34d7646a83c5";

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      console.log("Weather error:", err);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const weatherIcon = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : null;


  const features = [
    {
      title: "Mandi Rates",
      desc: "Check mandi prices",
      icon: "🌾",
      link: "/mandi",
      color: "bg-red-50"
    },
    {
      title: "Weather Alerts",
      desc: "Live rain updates",
      icon: "⛈️",
      link: "/weather",
      color: "bg-blue-50"
    },
    {
      title: "Plant Disease ID",
      desc: "Upload → detect disease",
      icon: "🌱",
      link: "/drplant",
      color: "bg-green-50"
    },
    {
      title: "Pesticide Guide",
      desc: "Use, dosage, safety",
      icon: "🧪",
      link: "/pesticides",
      color: "bg-purple-50"
    },
    {
      title: "Kisaan News",
      desc: "Daily agri news",
      icon: "📰",
      link: "/news",
      color: "bg-yellow-50"
    },
    {
      title: "Govt Schemes",
      desc: "Farmer yojnas",
      icon: "🏛️",
      link: "/schemes",
      color: "bg-orange-50"
    }
  ];

  const filtered = features.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">

      
      <section className="bg-green-50 border p-8 rounded-2xl shadow mb-10">
        <h2 className="text-4xl font-bold text-green-900 text-center">
          Welcome to KisaanDost 🌾
        </h2>
        <p className="mt-3 text-gray-700 text-lg text-center">
          Smart agriculture tools — mandi rates, weather, pesticides, plant ID & news.
        </p>
      </section>

      
      <section className="bg-white p-6 rounded-2xl shadow border mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">🔍 Search Anything</h3>

        <input
          type="text"
          placeholder="Search Mandi, Weather, News, Pesticides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow focus:ring-2 focus:ring-green-600 outline-none"
        />
      </section>

     
      <h2 className="text-3xl font-bold text-center mb-6">✨ Smart Tools</h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((box, index) => (
          <div
            key={index}
            className={`${box.color} p-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer`}
          >
            <h3 className="text-3xl font-bold flex items-center gap-3 mb-2">
              {box.icon} {box.title}
            </h3>

            <p className="text-gray-700 mb-4">{box.desc}</p>

            <Link to={box.link}>
              <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
                Open
              </button>
            </Link>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-lg col-span-3 text-center">No results found.</p>
        )}
      </section>

      
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        
        <div className="bg-white p-8 rounded-2xl border shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">🌤 Today’s Weather</h3>

          {weather ? (
            <div className="flex items-center gap-4">
              <img src={weatherIcon} alt="weather" className="w-20 h-20" />
              <p className="text-gray-700 text-lg">
                {weather.main.temp}°C • {weather.weather[0].main}
                <br />
                Wind: {weather.wind.speed} km/h  
                <br />
                Humidity: {weather.main.humidity}%
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Loading weather…</p>
          )}
        </div>

        
        <div className="bg-white p-8 rounded-2xl border shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">📊 Top Mandi Prices</h3>
          <ul className="space-y-2 text-gray-700">
            <li>🌾 Wheat — ₹2450/q</li>
            <li>🌽 Maize — ₹1950/q</li>
            <li>🫘 Arhar — ₹7800/q</li>
          </ul>
        </div>

      </section>
    </div>
  );
}
