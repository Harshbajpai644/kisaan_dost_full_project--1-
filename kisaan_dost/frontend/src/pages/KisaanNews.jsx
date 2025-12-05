// src/pages/KisaanNews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function KisaanNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // RSS feeds to fetch (AajTak prioritized)
  const RSS_FEEDS = [
    "https://www.aajtak.in/rssfeeds/?id=home",
    "https://zeenews.india.com/rss/india-national-news.xml",
    "https://feeds.feedburner.com/ndtvnews-india-news"
  ];

  // If your proxy is at different host/port change this
  const API_BASE = "http://localhost:4001/api/rss?url=";

  useEffect(() => {
    let cancelled = false;

    async function loadFeeds() {
      setLoading(true);
      setError("");
      const all = [];

      for (const feed of RSS_FEEDS) {
        try {
          const url = API_BASE + encodeURIComponent(feed);
          const res = await axios.get(url, { timeout: 12000 });
          const parsed = res.data;

          // parsed.items usually contains array of entries
          const feedItems = (parsed.items || []).map(it => ({
            title: it.title || "",
            link: it.link || "",
            description: it.contentSnippet || it.content || it.description || "",
            pubDate: it.pubDate || "",
            raw: it,
            source: parsed.title || new URL(feed).hostname,
            // use helper to find image later
          }));

          all.push(...feedItems);
        } catch (err) {
          console.warn("feed failed:", feed, err?.message || err);
          // continue — try other feeds
        }
      }

      if (!cancelled) {
        // dedupe by link and sort by pubDate (newest first if available)
        const byLink = {};
        all.forEach(it => {
          if (it.link && !byLink[it.link]) byLink[it.link] = it;
        });
        const merged = Object.values(byLink);

        merged.sort((a, b) => {
          const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
          const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
          return tb - ta;
        });

        setItems(merged.slice(0, 30)); // keep top 30
        setLoading(false);
      }
    }

    loadFeeds();

    return () => { cancelled = true; };
  }, []);


  // Helper: attempt to extract an image url from RSS item raw content
  function findImage(it) {
    try {
      const raw = it.raw || {};
      // 1) enclosure
      if (raw.enclosure && raw.enclosure.url) return raw.enclosure.url;
      // 2) media:content or media:thumbnail
      if (raw["media:content"] && raw["media:content"].url) return raw["media:content"].url;
      if (raw["media:thumbnail"] && raw["media:thumbnail"].url) return raw["media:thumbnail"].url;
      // 3) common fields
      if (raw.image) {
        if (typeof raw.image === "string") return raw.image;
        if (raw.image.url) return raw.image.url;
      }
      // 4) try to parse HTML in content and find first <img src="">
      const html = raw.content || raw.description || "";
      const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (m && m[1]) return m[1];

      // 5) fallback: sometimes feed itself has no image; return null
      return null;
    } catch (e) {
      return null;
    }
  }

  const placeholder = "/logo.svg"; // public logo fallback

  // UI helpers/styles (simple inline styles so you can drop into your project)
  const containerStyle = { maxWidth: 1100, margin: "0 auto", padding: 18 };
  const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 };
  const cardStyle = { background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" };
  const heroStyle = { display: "flex", gap: 16, alignItems: "stretch", marginBottom: 16 };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: 28, color: "#1f7a3a", marginBottom: 8 }}>📰 Kisaan News — Live Headlines</h1>
      <p style={{ color: "#666", marginBottom: 18 }}>Live headlines from top Indian news channels (via RSS). Click a card to read full news on source site.</p>

      {loading && <div>Loading live headlines…</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && items.length === 0 && <div>No live headlines available right now.</div>}

      {!loading && items.length > 0 && (
        <>
          {/* Featured hero: first item */}
          <div style={heroStyle}>
            <div style={{ flex: 1, ...cardStyle }}>
              {(() => {
                const it = items[0];
                const img = findImage(it) || placeholder;
                return (
                  <>
                    <a href={it.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ height: 320, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <img src={img} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e)=>e.target.src=placeholder} />
                      </div>
                      <div style={{ padding: 14 }}>
                        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{it.title}</div>
                        <div style={{ color: "#444", marginBottom: 10 }}>{it.description ? it.description.substring(0, 200) + (it.description.length>200?"...":"") : ""}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{it.source} • {it.pubDate ? new Date(it.pubDate).toLocaleString() : ""}</div>
                      </div>
                    </a>
                  </>
                );
              })()}
            </div>

            {/* Right column: next two items stacked */}
            <div style={{ width: 360, display: "grid", gap: 14 }}>
              {[items[1], items[2]].map((it, idx) => it ? (
                <div key={idx} style={{ ...cardStyle }}>
                  <a href={it.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ height: 150, overflow: "hidden" }}>
                      <img src={findImage(it) || placeholder} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e)=>e.target.src=placeholder}/>
                    </div>
                    <div style={{ padding: 12 }}>
                      <div style={{ fontWeight: 700 }}>{it.title}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>{it.source}</div>
                    </div>
                  </a>
                </div>
              ) : null)}
            </div>
          </div>

          {/* Grid of remaining */}
          <div style={gridStyle}>
            {items.slice(3).map((it, i) => (
              <div key={i} style={cardStyle}>
                <a href={it.link} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ height: 160, overflow: "hidden" }}>
                    <img src={findImage(it) || placeholder} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e)=>e.target.src=placeholder}/>
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 700 }}>{it.title}</div>
                    <div style={{ fontSize: 13, color: "#444", marginTop: 8 }}>{it.description ? it.description.substring(0,120)+(it.description.length>120?"...":"") : ""}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 10 }}>{it.source} • {it.pubDate ? new Date(it.pubDate).toLocaleString() : ""}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
