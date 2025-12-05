import React, { useEffect, useState } from "react";
import axios from "axios";



export default function Weather() {
  const [city, setCity] = useState("Lucknow");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

const API_KEY = "d39f2e0b469efc6d95fd34d7646a83c5";

  const getWeather = async (q = city) => {
    if (!API_KEY) {
      setData({ error: "OpenWeather API key not set (VITE_OPENWEATHER_KEY)." });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${API_KEY}`
      );
      setData(res.data);
    } catch (err) {
      setData({ error: "City not found or API error." });
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather();
   
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">⛈ Live Weather</h1>

      <div className="bg-white p-6 rounded-2xl shadow border mb-6">
        <div className="flex gap-3">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border rounded-xl"
            placeholder="Enter city (e.g. Lucknow)"
          />
          <button onClick={()=>getWeather()} className="px-4 py-2 bg-green-600 text-white rounded-xl">Search</button>
        </div>
      </div>

      {loading ? <div className="text-gray-600">Loading...</div> : null}

      {data?.error ? (
        <div className="bg-red-50 p-4 rounded-xl border text-red-700">{data.error}</div>
      ) : data ? (
        <div className="bg-green-50 p-6 rounded-2xl border shadow">
          <div className="flex items-center gap-6">
            <img
              alt="icon"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              className="w-20 h-20"
            />
            <div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <div className="text-lg">{data.main.temp}°C • {data.weather[0].description}</div>
              <div className="text-sm text-gray-700">Humidity: {data.main.humidity}% • Wind: {data.wind.speed} km/h</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-600">Search a city to see live weather.</div>
      )}
    </div>
  );
}
