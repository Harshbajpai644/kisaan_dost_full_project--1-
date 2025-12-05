// src/pages/AdminNewsPanel.jsx
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";

export default function AdminNewsPanel() {
  const email = localStorage.getItem("userEmail") || "";
  const isAdmin = email.toLowerCase() === "harsh.bajpaics@gmail.com";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Agriculture");
  const [source, setSource] = useState("Admin");
  const [video, setVideo] = useState(""); // optional youtube url
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // default testing image from your uploaded container (path given)
  const defaultImageUrl = "/mnt/data/3548aebd-ecd3-4eab-8696-30c9c3578af6.png";

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h2 className="text-xl text-red-600">Access denied — Admin only</h2>
      </div>
    );
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = defaultImageUrl;

      if (file) {
        // upload to Firebase Storage
        const storageRef = ref(storage, `news_images/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
          },
          (err) => {
            console.error("upload error", err);
            setMessage("Upload failed");
            setLoading(false);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

            // save news doc
            await addDoc(collection(db, "news"), {
              title,
              description: desc,
              category,
              source,
              video: video || "",
              image: imageUrl,
              published: true,
              createdAt: serverTimestamp(),
            });

            setMessage("News uploaded & published.");
            setTitle(""); setDesc(""); setFile(null); setVideo(""); setProgress(0);
            setLoading(false);
          }
        );
      } else {
        // no file selected, directly create doc with default image (local path)
        await addDoc(collection(db, "news"), {
          title,
          description: desc,
          category,
          source,
          video: video || "",
          image: imageUrl,
          published: true,
          createdAt: serverTimestamp(),
        });

        setMessage("News published using default image.");
        setTitle(""); setDesc(""); setVideo("");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving news.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Upload News</h1>

      <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded mb-3" required />

        <label className="block mb-2">Description</label>
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full p-2 border rounded mb-3" rows={4} required />

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block mb-2">Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-2 border rounded">
              <option>Agriculture</option>
              <option>Government Scheme</option>
              <option>Mandi</option>
              <option>Weather</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Source</label>
            <input value={source} onChange={e=>setSource(e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>

        <label className="block mb-2">YouTube video (optional)</label>
        <input value={video} onChange={e=>setVideo(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="https://www.youtube.com/..." />

        <label className="block mb-2">Image (optional)</label>
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className="mb-3" />

        {progress > 0 && <div className="mb-3">Upload {progress}%</div>}

        <div className="flex gap-3">
          <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
            {loading ? "Uploading..." : "Publish News"}
          </button>
        </div>

        {message && <div className="mt-4 text-green-700">{message}</div>}
      </form>
    </div>
  );
}
