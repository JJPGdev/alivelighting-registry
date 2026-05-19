"use client";

import { useState, useEffect } from "react";

interface PhotoGalleryProps {
  photos: string[];
  alt?: string;
}

export default function PhotoGallery({ photos, alt = "Produs AliveLighting" }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  if (photos.length === 0) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {photos.map((photo, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <img
            src={photo}
            alt={`${alt} — ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
      {photos.length > 1 && (
        <div style={{ position: "absolute", bottom: "16px", left: "50%",
          transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ width: i === current ? "20px" : "6px", height: "1px",
                background: i === current ? "#c9a96e" : "rgba(201,169,110,0.4)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.4s ease, background 0.4s ease" }}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}