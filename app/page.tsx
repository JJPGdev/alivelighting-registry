"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegistryPage() {
  const router = useRouter();
  const [serial, setSerial] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!serial.trim()) return;
    setLoading(true);
    setError(null);
    const normalized = serial.trim().toUpperCase();
    const { data, error: dbError } = await supabase
      .from("products")
      .select("serial_number")
      .eq("serial_number", normalized)
      .single();
    if (dbError || !data) {
      setError("Acest numar nu exista in registru.");
      setLoading(false);
      return;
    }
    router.push(`/registry/${normalized}`);
  }

  return (
    <main
      style={{ minHeight: "100svh", background: "#0a0a0a", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "24px", position: "relative" }}
    >
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 65%, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />

      {[
        { top: "18%", left: "22%", delay: "0s", dur: "18s", size: "2px" },
        { top: "72%", left: "78%", delay: "3s", dur: "22s", size: "1px" },
        { top: "40%", left: "85%", delay: "6s", dur: "16s", size: "2px" },
        { top: "85%", left: "15%", delay: "9s", dur: "24s", size: "1px" },
        { top: "55%", left: "50%", delay: "12s", dur: "20s", size: "2px" },
        { top: "25%", left: "60%", delay: "1.5s", dur: "19s", size: "1px" },
      ].map((p, i) => (
        <span key={i} aria-hidden="true" style={{ position: "fixed", top: p.top, left: p.left,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(201,169,110,0.35)",
          animation: `dust-float ${p.dur} ease-in-out ${p.delay} infinite alternate` }} />
      ))}

      <div className="animate-fade-in" style={{ marginBottom: "48px", zIndex: 1 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="AliveLighting">
          <circle cx="18" cy="18" r="17" stroke="#f0ede8" strokeWidth="0.8" />
          <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="0.8" />
          <line x1="6" y1="18" x2="30" y2="18" stroke="#c9a96e" strokeWidth="0.8" />
          <circle cx="18" cy="18" r="3" fill="#c9a96e" />
        </svg>
      </div>

      <div className="animate-fade-in-delay" style={{ textAlign: "center", marginBottom: "40px", zIndex: 1 }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300,
          fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#f0ede8",
          letterSpacing: "0.03em", marginBottom: "12px" }}>
          Registrul Exemplarelor
        </h1>
        <p style={{ color: "#9a9590", fontFamily: "var(--font-cormorant)",
          fontStyle: "italic", fontSize: "1.1rem" }}>
          Fiecare obiect are o poveste. Gaseste-o pe a ta.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="animate-fade-in-delay-2"
        style={{ width: "100%", maxWidth: "360px", zIndex: 1 }} noValidate>
        <input type="text" value={serial}
          onChange={(e) => { setSerial(e.target.value); if (error) setError(null); }}
          placeholder="Numarul tau de serie — ex: AL-0023"
          autoComplete="off" spellCheck={false} disabled={loading}
          style={{ width: "100%", background: "transparent", color: "#f0ede8",
            border: "1px solid #c9a96e", borderRadius: 0, padding: "12px 16px",
            fontFamily: "var(--font-inter)", fontSize: "0.75rem",
            letterSpacing: "0.12em", textTransform: "uppercase", outline: "none" }}
        />
        <div style={{ overflow: "hidden", maxHeight: error ? "40px" : "0px",
          transition: "max-height 0.4s ease" }}>
          <p style={{ color: "#9a9590", fontFamily: "var(--font-cormorant)",
            fontStyle: "italic", fontSize: "0.9rem", padding: "8px 4px 0" }}>
            {error}
          </p>
        </div>
        <button type="submit" disabled={loading || !serial.trim()}
          style={{ width: "100%", padding: "12px", marginTop: "12px",
            background: loading || !serial.trim() ? "rgba(201,169,110,0.5)" : "#c9a96e",
            color: "#0a0a0a", border: "none", borderRadius: 0, cursor: loading || !serial.trim() ? "not-allowed" : "pointer",
            fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.2em",
            textTransform: "uppercase", fontWeight: 500 }}>
          {loading ? "Se cauta..." : "Descopera"}
        </button>
      </form>

      <p style={{ position: "fixed", bottom: "32px", color: "#2a2a2a",
        fontSize: "0.6rem", letterSpacing: "0.3em", fontFamily: "var(--font-inter)" }}>
        ATELIERUL LUMINII
      </p>

      <style>{`
        @keyframes dust-float {
          0%   { transform: translate(0,0) scale(1); opacity: 0.2; }
          33%  { transform: translate(8px,-12px) scale(1.3); opacity: 0.5; }
          66%  { transform: translate(-6px,8px) scale(0.8); opacity: 0.3; }
          100% { transform: translate(4px,-4px) scale(1.1); opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}