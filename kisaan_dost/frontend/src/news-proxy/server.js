// news-proxy/server.js
import express from "express";
import Parser from "rss-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const parser = new Parser();
app.use(cors());
app.use(express.json());

// Simple /api/rss?url=<encoded-rss-url>
app.get("/api/rss", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "url required" });

  try {
    const decoded = decodeURIComponent(url);
    // fetch raw RSS (node-fetch)
    const r = await fetch(decoded, { timeout: 10000 });
    const text = await r.text();
 
    const parsed = await parser.parseString(text);
    return res.json(parsed);
  } catch (err) {
    console.error("RSS fetch/parse error:", err);
    return res.status(500).json({ error: "failed to fetch/parse rss", details: String(err) });
  }
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`RSS proxy running at http://localhost:${port}`));
