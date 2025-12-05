// news-proxy/server.js
import express from "express";
import fetch from "node-fetch";
import Parser from "rss-parser";
import cors from "cors";

const app = express();
const parser = new Parser();
app.use(cors());

app.get("/api/rss", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "url required" });

  try {
    const decoded = decodeURIComponent(url);
    // fetch raw RSS
    const response = await fetch(decoded, { timeout: 10000 });
    const text = await response.text();
    // parse it
    const parsed = await parser.parseString(text);
    // return as JSON
    res.json(parsed);
  } catch (err) {
    console.error("rss proxy error", err);
    res.status(500).json({ error: "failed to fetch" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("RSS proxy running on", PORT));
