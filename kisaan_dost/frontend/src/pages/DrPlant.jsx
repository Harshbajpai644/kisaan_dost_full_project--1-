import React, { useState } from "react";

export default function DrPlant() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const API_KEY = import.meta.env.VITE_OPENAI_KEY;


  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async () => {
    if (!image) return alert("Upload an image first!");

    setLoading(true);
    setResult("");

    const base64 = await toBase64(image);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Identify the plant and disease in this image." },
              {
                type: "image_url",
                image_url: `data:image/jpeg;base64,${base64}`
              }
            ]
          }
        ]
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!data?.choices) {
      setResult("⚠️ OpenAI error: " + JSON.stringify(data));
      return;
    }

    setResult(data.choices[0].message.content);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        👨‍⚕️ Dr.Plant — Smart Plant Disease Detector
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow border">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="p-3 border rounded-xl w-full mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-64 h-64 object-cover rounded-xl border mb-4"
          />
        )}

        <button
          onClick={analyzeImage}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>

        {result && (
          <div className="mt-6 p-5 bg-green-50 rounded-xl border shadow">
            <h3 className="text-xl font-bold mb-3">🟢 Result:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
