import { notFound } from "next/navigation";
import { getProductBySerial, type Product } from "@/lib/supabase";
import ModelViewer from "@/components/ModelViewer";
import PhotoGallery from "@/components/PhotoGallery";
import type { Metadata } from "next";

interface Props { params: { serial: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySerial(params.serial);
  if (!product) return { title: "Exemplar negasit — AliveLighting" };
  return {
    title: `${product.serial_number} — AliveLighting`,
    description: `Exemplarul ${product.edition_number} din ${product.edition_total} · Creat de ${product.artisan_name}`,
  };
}

function formatDateLiterary(dateStr: string): string {
  const months = ["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie",
    "Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];
  const d = new Date(dateStr + "T12:00:00");
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function warrantyProgress(createdAt: string, warrantyMonths: number, expiresAt: string | null) {
  const start = new Date(createdAt + "T00:00:00").getTime();
  const end = expiresAt
    ? new Date(expiresAt + "T00:00:00").getTime()
    : start + warrantyMonths * 30.44 * 24 * 3600 * 1000;
  const now = Date.now();
  const totalMs = end - start;
  const elapsed = Math.min(now - start, totalMs);
  const pct = Math.round((elapsed / totalMs) * 100);
  const remaining = Math.round(Math.max(end - now, 0) / (30.44 * 24 * 3600 * 1000));
  return { pct, remaining, expired: now > end };
}

function parseList(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export default async function ProductPage({ params }: Props) {
  const product: Product | null = await getProductBySerial(params.serial);
  if (!product) notFound();

  const photos = parseList(product.product_photos);
  const materials = parseList(product.materials);
  const { pct, remaining, expired } = warrantyProgress(
    product.created_at, product.warranty_months, product.warranty_expires_at
  );
  const serialNum = product.serial_number.replace("AL-", "");
  const has3D = !!(product.model_3d_url && product.model_3d_url.trim().length > 0);

  const sectionStyle = { padding: "80px 24px", maxWidth: "900px", margin: "0 auto" };
  const titleStyle = {
    fontFamily: "var(--font-cormorant)", fontWeight: 300 as const,
    fontSize: "clamp(1.4rem,4vw,2rem)", color: "#f0ede8",
    marginBottom: "48px", letterSpacing: "0.05em"
  };

  return (
    <div style={{ background: "#0a0a0a", color: "#f0ede8", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ minHeight: "100svh", position: "relative", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 64px" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />
        <p style={{ color: "#c9a96e", letterSpacing: "0.3em", fontSize: "0.7rem",
          textTransform: "uppercase", marginBottom: "16px", fontFamily: "var(--font-inter)", zIndex: 1 }}>
          Exemplarul #{serialNum.padStart(4, "0")}
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300,
          fontSize: "clamp(1.8rem,6vw,3.2rem)", textAlign: "center", color: "#f0ede8",
          lineHeight: 1.2, marginBottom: "10px", zIndex: 1 }}>
          AliveLighting — Pendul Botanical
        </h1>
        <p style={{ color: "#9a9590", fontSize: "0.8rem", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: "48px", zIndex: 1, fontFamily: "var(--font-inter)" }}>
          Din seria limitata &nbsp;·&nbsp; {product.edition_number} din {product.edition_total}
        </p>
        <div style={{ width: "100%", maxWidth: "480px", aspectRatio: "1/1", position: "relative", zIndex: 1 }}>
          {has3D ? (
            <ModelViewer src={product.model_3d_url!} />
          ) : photos.length > 0 ? (
            <PhotoGallery photos={photos} alt="Pendul Botanical AliveLighting" />
          ) : (
            <div className="skeleton" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
        <div className="scroll-indicator" style={{ position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)", width: "40px", height: "1px",
          background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />
      </section>

      {/* IDENTITATE */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Identitatea obiectului</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "24px" }}>
          <div style={{ background: "#111111", padding: "32px 28px", borderTop: "1px solid #2a2a2a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              {product.artisan_photo_url ? (
                <img src={product.artisan_photo_url} alt={product.artisan_name}
                  style={{ width: "56px", height: "56px", borderRadius: "50%",
                    border: "1px solid #c9a96e", objectFit: "cover", flexShrink: 0 }} />
              ) : (
                <div style={{ width: "56px", height: "56px", borderRadius: "50%",
                  border: "1px solid #c9a96e", background: "#1a1a1a", flexShrink: 0 }} />
              )}
              <div>
                <p style={{ fontSize: "0.65rem", color: "#9a9590", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: "4px", fontFamily: "var(--font-inter)" }}>
                  Creat de
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "#f0ede8" }}>
                  {product.artisan_name}
                </p>
              </div>
            </div>
            <p style={{ fontSize: "0.65rem", color: "#9a9590", letterSpacing: "0.2em",
              textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Data creatiei</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#c9a96e", marginTop: "4px" }}>
              {formatDateLiterary(product.created_at)}
            </p>
          </div>
          <div style={{ background: "#111111", padding: "32px 28px", borderTop: "1px solid #2a2a2a" }}>
            <p style={{ fontSize: "0.65rem", color: "#9a9590", letterSpacing: "0.2em",
              textTransform: "uppercase", marginBottom: "20px", fontFamily: "var(--font-inter)" }}>Garantie</p>
            {expired ? (
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#9a9590", fontStyle: "italic" }}>
                Garantia a expirat
              </p>
            ) : (
              <>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", color: "#c9a96e", marginBottom: "20px" }}>
                  Garantie activa · {remaining} luni ramase
                </p>
                <div style={{ position: "relative", height: "2px", background: "#2a2a2a", marginBottom: "8px" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`,
                    background: "linear-gradient(90deg,#c9a96e,#e8c88a)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.6rem", color: "#4a4945", letterSpacing: "0.1em", fontFamily: "var(--font-inter)" }}>PRIMIT</span>
                  <span style={{ fontSize: "0.6rem", color: "#4a4945", letterSpacing: "0.1em", fontFamily: "var(--font-inter)" }}>{product.warranty_months} LUNI</span>
                </div>
              </>
            )}
            {product.warranty_expires_at && (
              <div style={{ marginTop: "24px", borderTop: "1px solid #1e1e1e", paddingTop: "20px" }}>
                <p style={{ fontSize: "0.65rem", color: "#9a9590", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: "4px", fontFamily: "var(--font-inter)" }}>Expira la</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#f0ede8" }}>
                  {formatDateLiterary(product.warranty_expires_at)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MATERIALE */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Din ce este facut</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {materials.map((mat, i) => (
            <li key={i} style={{ display: "flex", alignItems: "baseline", gap: "16px",
              padding: "16px 0", borderBottom: i < materials.length - 1 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ color: "#c9a96e", fontSize: "0.9rem", flexShrink: 0,
                fontFamily: "var(--font-cormorant)" }}>—</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem",
                color: "#f0ede8", fontWeight: 300 }}>{mat}</span>
            </li>
          ))}
        </ul>
        {product.flowers_type && (
          <p style={{ marginTop: "32px", fontSize: "0.7rem", color: "#9a9590",
            letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
            Flori utilizate: {product.flowers_type}
          </p>
        )}
        {product.moss_origin && (
          <p style={{ marginTop: "12px", fontSize: "0.7rem", color: "#9a9590",
            letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
            Muschi din: {product.moss_origin}
          </p>
        )}
      </section>

      {/* NOTA ARTIZANULUI */}
      {product.production_notes && (
        <section style={{ background: "#111111", padding: "80px 24px",
          borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", top: "-32px", left: "-8px",
              fontFamily: "var(--font-cormorant)", fontSize: "8rem", color: "#c9a96e",
              lineHeight: 1, opacity: 0.25, userSelect: "none", pointerEvents: "none" }}>"</span>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic",
              fontSize: "clamp(1.2rem,3vw,1.6rem)", color: "#f0ede8", lineHeight: 1.8,
              marginBottom: "32px", position: "relative", zIndex: 1 }}>
              {product.production_notes}
            </p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem",
              color: "#c9a96e", letterSpacing: "0.1em" }}>
              — {product.artisan_name}
            </p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: "48px 24px", textAlign: "center", borderTop: "1px solid #111111" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem",
          color: "#3a3935", letterSpacing: "0.2em", marginBottom: "8px" }}>
          © Atelierul Luminii {new Date().getFullYear()}
        </p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem",
          color: "#3a3935", letterSpacing: "0.15em" }}>
          alivelighting.ro
        </p>
      </footer>
    </div>
  );
}