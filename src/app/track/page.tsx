"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// ─── Types ─────────────────────────────────────────────────────────────────
type ShipmentStatus =
  | "Order Placed" | "Picked Up" | "In Transit"
  | "On Hold" | "Customs Hold" | "Pending Customs Clearance"
  | "Customs Documentation Required" | "Duty Payment Required"
  | "Customs Cleared" | "Released from Customs" | "Seized by Customs"
  | "Out for Delivery" | "Delivered" | "Exception";

interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  description: string;
  eventDate: string;
  eventTime: string;
}

interface Shipment {
  trackingNumber: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  packageDescription: string;
  weight: string;
  estimatedDelivery: string;
  estimatedDeliveryTime: string;
  currentStatus: ShipmentStatus;
  events: TrackingEvent[];
  createdAt: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────
const CUSTOMS_STATUSES = new Set([
  "On Hold", "Customs Hold", "Pending Customs Clearance",
  "Customs Documentation Required", "Duty Payment Required", "Seized by Customs",
]);

const STATUS_CONFIG: Record<string, {
  color: string; bg: string; border: string; emoji: string;
}> = {
  "Order Placed":                   { color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE", emoji: "📦" },
  "Picked Up":                      { color: "#92400E", bg: "#FEFCE8", border: "#FDE68A", emoji: "🚚" },
  "In Transit":                     { color: "#C2410C", bg: "#FFF7ED", border: "#FED7AA", emoji: "✈️" },
  "Out for Delivery":               { color: "#6D28D9", bg: "#F5F3FF", border: "#DDD6FE", emoji: "🚛" },
  "Delivered":                      { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0", emoji: "✅" },
  "Exception":                      { color: "#B91C1C", bg: "#FEF2F2", border: "#FECACA", emoji: "⚠️" },
  "On Hold":                        { color: "#9A3412", bg: "#FFF7ED", border: "#FDBA74", emoji: "🛑" },
  "Customs Hold":                   { color: "#991B1B", bg: "#FEF2F2", border: "#FCA5A5", emoji: "🛃" },
  "Pending Customs Clearance":      { color: "#92400E", bg: "#FFFBEB", border: "#FCD34D", emoji: "🛃" },
  "Customs Documentation Required": { color: "#9F1239", bg: "#FFF1F2", border: "#FECDD3", emoji: "📋" },
  "Duty Payment Required":          { color: "#7C2D12", bg: "#FFF7ED", border: "#FDBA74", emoji: "💳" },
  "Customs Cleared":                { color: "#065F46", bg: "#ECFDF5", border: "#6EE7B7", emoji: "✅" },
  "Released from Customs":          { color: "#0F766E", bg: "#F0FDFA", border: "#99F6E4", emoji: "🔓" },
  "Seized by Customs":              { color: "#7F1D1D", bg: "#FEF2F2", border: "#F87171", emoji: "🚫" },
};

const PROGRESS_STEPS = [
  "Order Placed", "Picked Up", "In Transit", "Out for Delivery", "Delivered",
];

const NAVY = "#1B3A6B";
const ACCENT = "#2196C9";

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatDateShort(d: string) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ─── Progress Bar ──────────────────────────────────────────────────────────
function ProgressBar({ status }: { status: string }) {
  const isException = status === "Exception";
  const isCustoms = CUSTOMS_STATUSES.has(status);

  let stepIdx = PROGRESS_STEPS.indexOf(status);
  if (stepIdx === -1) stepIdx = 2;

  const pct = ((stepIdx + 1) / PROGRESS_STEPS.length) * 100;
  const barColor = isException ? "#EF4444" : isCustoms ? "#F59E0B" : ACCENT;

  return (
    <div style={{ margin: "24px 0 8px" }}>
      <div style={{ position: "relative", marginBottom: 52 }}>
        <div style={{
          height: 4, backgroundColor: "#E5E7EB",
          borderRadius: 2, position: "relative",
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ height: "100%", borderRadius: 2, backgroundColor: barColor }}
          />
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          position: "absolute", top: -12, left: 0, right: 0,
        }}>
          {PROGRESS_STEPS.map((step, i) => {
            const done = !isException && i <= stepIdx;
            const current = i === stepIdx;
            const dotColor = done ? barColor : "#E5E7EB";

            return (
              <div key={step} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  backgroundColor: dotColor,
                  border: `3px solid ${dotColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: current ? `0 0 0 4px ${barColor}30` : "none",
                  transition: "all 0.3s",
                }}>
                  {done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {isException && current && (
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>!</span>
                  )}
                </div>
                <p style={{
                  fontSize: 10, fontWeight: current ? 700 : 500,
                  color: done ? barColor : "#9CA3AF",
                  textAlign: "center", maxWidth: 64,
                  lineHeight: 1.3, marginTop: 6,
                }}>
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Inner component (uses useSearchParams) ─────────────────────────────────
function TrackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
    const q = searchParams.get("q");
    if (q) {
      setQuery(q.toUpperCase());
      doSearch(q.toUpperCase());
    }
  }, []);

  const doSearch = async (trackingNum: string) => {
    const trimmed = trackingNum.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setShipment(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/shipments/${trimmed}`);
      if (res.ok) {
        const data = await res.json();
        setShipment(data.shipment);
      } else {
        setError("No shipment found with this tracking number. Please check and try again.");
      }
    } catch {
      setError("Unable to connect. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await doSearch(query);
    router.replace(`/track?q=${encodeURIComponent(query.trim().toUpperCase())}`);
  };

  const cfg = shipment
    ? (STATUS_CONFIG[shipment.currentStatus] ?? STATUS_CONFIG["In Transit"])
    : null;
  const isCustoms = shipment ? CUSTOMS_STATUSES.has(shipment.currentStatus) : false;
  const isDelivered = shipment?.currentStatus === "Delivered";
  const isException = shipment?.currentStatus === "Exception";

  return (
    <>
      <style>{`
        @keyframes hk-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes hk-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
        @media(max-width:600px){
          .hk-party-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ── HERO / SEARCH ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: ACCENT,
          padding: "120px 24px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle wave pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(21,101,160,0.95) 0%, rgba(33,150,201,0.85) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            position: "relative",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "3px",
                color: "rgba(255,255,255,0.65)",
                marginBottom: 10,
              }}
            >
              Shipment Tracking
            </p>
            <h1
              style={{
                fontSize: "clamp(30px,5vw,52px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.08,
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Track your shipment
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.80)",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              Enter your Hecksher tracking number to get real-time updates
              on your cargo.
            </p>
          </motion.div>

          {/* Search form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              display: "flex",
              maxWidth: 600,
              margin: "0 auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value.toUpperCase());
                setError("");
                setSearched(false);
              }}
              placeholder="Enter Shipment / House Bill / Direct Master Number"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                padding: "18px 20px",
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.5px",
                border: "none",
                outline: "none",
                backgroundColor: "#ffffff",
                color: "#1B3A6B",
              }}
            />
            <button
              type="submit"
              suppressHydrationWarning
              disabled={mounted ? (loading || !query.trim()) : false}
              style={{
                padding: "18px 32px",
                backgroundColor: NAVY,
                color: "#ffffff",
                border: "none",
                fontSize: 15,
                fontWeight: 800,
                cursor: mounted && (loading || !query.trim()) ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                opacity: mounted && !query.trim() ? 0.7 : 1,
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (query.trim()) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#142d54";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = NAVY;
              }}
            >
              {loading ? (
                <span
                  style={{
                    width: 18,
                    height: 18,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "hk-spin 0.75s linear infinite",
                  }}
                />
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              )}
              {loading ? "Searching…" : "Find"}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginTop: 14,
            }}
          >
          </motion.p>
        </div>
      </section>

      {/* ── RESULTS ───────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#f0f4f8",
          padding: "48px 24px 80px",
          minHeight: 400,
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 8,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#B91C1C", marginBottom: 3 }}>
                    Shipment Not Found
                  </p>
                  <p style={{ fontSize: 13, color: "#991B1B", lineHeight: 1.5 }}>
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle state */}
          {!searched && !loading && !shipment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "60px 0" }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: "rgba(33,150,201,0.10)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 40,
                }}
              >
                ✈️
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 10 }}>
                Enter your tracking number above
              </h3>
              <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
                Your tracking number was provided in your shipment confirmation.
                It starts with <strong>GC</strong>.
              </p>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {shipment && cfg && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                {/* Status card */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    padding: 28,
                    marginBottom: 18,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                    border: `2px solid ${
                      isDelivered ? "#BBF7D0"
                      : isException ? "#FECACA"
                      : isCustoms ? "#FCD34D"
                      : "#E5E7EB"
                    }`,
                  }}
                >
                  {/* Tracking number + badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          color: "#9CA3AF",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: 4,
                        }}
                      >
                        Tracking Number
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: 22,
                          fontWeight: 800,
                          color: NAVY,
                        }}
                      >
                        {shipment.trackingNumber}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        backgroundColor: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        borderRadius: 999,
                        padding: "8px 16px",
                      }}
                    >
                      <span style={{ fontSize: 15 }}>{cfg.emoji}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>
                        {shipment.currentStatus}
                      </span>
                      {isCustoms && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: cfg.color,
                            animation: "hk-pulse 2s infinite",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Customs alert */}
                  {isCustoms && (
                    <div
                      style={{
                        backgroundColor: "#FFFBEB",
                        border: "1px solid #FCD34D",
                        borderRadius: 8,
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        marginBottom: 18,
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>🛃</span>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>
                          Action Required — Customs Hold
                        </p>
                        <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>
                          Your shipment is held at customs. Please contact Hecksher with
                          your documentation to resolve this hold.{" "}
                          <Link href="/contact" style={{ color: NAVY, fontWeight: 700 }}>
                            Contact us →
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Delivered banner */}
                  {isDelivered && (
                    <div
                      style={{
                        backgroundColor: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        borderRadius: 8,
                        padding: "13px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 18,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>🎉</span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#15803D" }}>
                        Your shipment has been successfully delivered!
                      </p>
                    </div>
                  )}

                  {/* Exception banner */}
                  {isException && (
                    <div
                      style={{
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FECACA",
                        borderRadius: 8,
                        padding: "13px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 18,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>⚠️</span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#B91C1C" }}>
                        There is an exception with your shipment. Please contact us for details.
                      </p>
                    </div>
                  )}

                  {/* Progress bar */}
                  <ProgressBar status={shipment.currentStatus} />

                  {/* Estimated delivery */}
                  {shipment.estimatedDelivery && !isDelivered && (
                    <div
                      style={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: 8,
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 8,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>📅</span>
                      <div>
                        <p style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>
                          Estimated Delivery
                        </p>
                        <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>
                          {formatDate(shipment.estimatedDelivery)}
                          {shipment.estimatedDeliveryTime
                            ? ` at ${formatTime(shipment.estimatedDeliveryTime)}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sender / Receiver */}
                <div
                  className="hk-party-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 18,
                  }}
                >
                  {[
                    {
                      title: "Sender",
                      name: shipment.senderName,
                      phone: shipment.senderPhone,
                      address: shipment.senderAddress,
                    },
                    {
                      title: "Recipient",
                      name: shipment.receiverName,
                      phone: shipment.receiverPhone,
                      address: shipment.receiverAddress,
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        padding: 20,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#9CA3AF",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: 10,
                        }}
                      >
                        {p.title}
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 5 }}>
                        {p.name}
                      </p>
                      {p.phone && (
                        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
                          📞 {p.phone}
                        </p>
                      )}
                      <p style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.5 }}>
                        📍 {p.address}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Package info */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 18,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#9CA3AF",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: 14,
                    }}
                  >
                    Package Information
                  </p>
                  <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                    <div>
                      <p style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 3 }}>Description</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                        {shipment.packageDescription}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 3 }}>Weight</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                        {shipment.weight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking timeline */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    padding: "24px 22px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#111827",
                      marginBottom: 24,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    🕐 Tracking History
                  </p>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {[...shipment.events].reverse().map((ev, i, arr) => {
                      const evCfg = STATUS_CONFIG[ev.status] ?? STATUS_CONFIG["In Transit"];
                      const isLast = i === arr.length - 1;
                      const isFirst = i === 0;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          style={{ display: "flex", gap: 14 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                backgroundColor: isFirst ? evCfg.bg : "#F9FAFB",
                                border: `2px solid ${isFirst ? evCfg.border : "#E5E7EB"}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: isFirst ? 14 : 12,
                              }}
                            >
                              {isFirst ? evCfg.emoji : "📦"}
                            </div>
                            {!isLast && (
                              <div
                                style={{
                                  width: 2,
                                  flex: 1,
                                  minHeight: 24,
                                  backgroundColor: "#E5E7EB",
                                  margin: "4px 0",
                                }}
                              />
                            )}
                          </div>

                          <div style={{ flex: 1, paddingBottom: isLast ? 0 : 22 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                gap: 8,
                                flexWrap: "wrap",
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <p
                                  style={{
                                    fontSize: 13,
                                    fontWeight: isFirst ? 700 : 600,
                                    color: isFirst ? "#111827" : "#374151",
                                    marginBottom: 3,
                                  }}
                                >
                                  {ev.description}
                                </p>
                                <p style={{ fontSize: 11, color: "#6B7280" }}>
                                  📍 {ev.location}
                                </p>
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <p style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>
                                  {formatDateShort(ev.eventDate)}
                                </p>
                                {ev.eventTime && (
                                  <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>
                                    {formatTime(ev.eventTime)}
                                  </p>
                                )}
                              </div>
                            </div>

                            {isFirst && (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  marginTop: 7,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: evCfg.color,
                                  backgroundColor: evCfg.bg,
                                  border: `1px solid ${evCfg.border}`,
                                  borderRadius: 999,
                                  padding: "2px 10px",
                                }}
                              >
                                {ev.status}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Help CTA */}
                <div style={{ marginTop: 28, textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 14 }}>
                    Have questions about your shipment?
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: NAVY,
                      color: "#ffffff",
                      textDecoration: "none",
                      padding: "13px 28px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Contact Hecksher →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

// ── Default export wrapped in Suspense ─────────────────────────────────────
export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: ACCENT,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid rgba(255,255,255,0.3)",
              borderTop: "3px solid #fff",
              borderRadius: "50%",
              animation: "hk-spin 0.75s linear infinite",
            }}
          />
        </div>
      }
    >
      <TrackInner />
    </Suspense>
  );
}