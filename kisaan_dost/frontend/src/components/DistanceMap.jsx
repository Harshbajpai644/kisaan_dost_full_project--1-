import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";

export default function DistanceMap() {
  const [currentPos, setCurrentPos] = useState(null);
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const apiKey = "5b3ce3597851110001cf6248f6afc4fa15cb49b48e4c9dc86e6b6d0e"; // FREE API KEY

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  const getRoute = async () => {
    if (!currentPos) return alert("Click Detect Location First!");

    const geocodeRes = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${destination}`
    );
    const geoData = await geocodeRes.json();
    const destLat = geoData.features[0].geometry.coordinates[1];
    const destLng = geoData.features[0].geometry.coordinates[0];

    
    const routeRes = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentPos[1]},${currentPos[0]}&end=${destLng},${destLat}`
    );

    const routeData = await routeRes.json();
    const coords = routeData.features[0].geometry.coordinates.map((c) => [
      c[1],
      c[0],
    ]);

    setRoute(coords);
    setDistance((routeData.features[0].properties.summary.distance / 1000).toFixed(1));
    setDuration((routeData.features[0].properties.summary.duration / 60).toFixed(0));
  };

  return (
    <div className="bg-white p-6 mt-12 rounded-2xl border shadow">
      <h2 className="text-3xl font-bold mb-4">🗺 Distance & Travel Time</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={detectLocation}
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          Detect My Location
        </button>

        <input
          type="text"
          placeholder="Enter Destination (e.g., Lucknow)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-3 border rounded-xl"
        />

        <button
          onClick={getRoute}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Go
        </button>
      </div>

      {distance && (
        <div className="text-lg font-semibold mb-4">
          📏 Distance: {distance} km &nbsp; ⏱ Time: {duration} min
        </div>
      )}

      {currentPos && (
        <MapContainer
          center={currentPos}
          zoom={13}
style={{ height: "400px", width: "100%", borderRadius: "20px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={currentPos}>
            <Popup>You are here</Popup>
          </Marker>

          {route.length > 0 && <Polyline positions={route} color="green" />}
        </MapContainer>
      )}
    </div>
  );
}
