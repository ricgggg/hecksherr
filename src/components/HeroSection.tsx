"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#2196C9";
const NAVY = "#1B3A6B";

// ── Free public MP4 videos from Pexels CDN ─────────────────────────────────
// These are direct .mp4 links — no iframe, no embedding restrictions
const VIDEO_SLIDES = [
  {
    // Aerial cargo ship on ocean
    src: "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    label: "Ocean",
  },
  {
    // Aerial port with containers
    src: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    label: "Port",
  },
  {
    // Plane taking off
    src: "https://videos.pexels.com/video-files/2941555/2941555-hd_1920_1080_30fps.mp4",
    label: "Air",
  },
  {
    // People walking in office
    src: "https://videos.pexels.com/video-files/3205898/3205898-hd_1920_1080_25fps.mp4",
    label: "Team",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trackingInput, setTrackingInput] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance slides every 9 seconds
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeSlide((prev: number) => (prev + 1) % VIDEO_SLIDES.length);
    }, 9000);
  };

  const changeSlide = (getNext: (prev: number) => number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => {
        const next = getNext(prev);
        return next;
      });
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reload video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentSlide]);

  const goToSlide = (i: number) => {
    if (i === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(i);
      setIsTransitioning(false);
    }, 600);
    startInterval();
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingInput.trim();
    if (trimmed) {
      router.push(`/track?q=${encodeURIComponent(trimmed.toUpperCase())}`);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        minHeight: "100vh",
        overflow: "hidden",
        marginTop: "-84px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Video background — fills full width ───────────────────── */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <video
            ref={videoRef}
            key={VIDEO_SLIDES[currentSlide].src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          >
            <source
              src={VIDEO_SLIDES[currentSlide].src}
              type="video/mp4"
            />
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Fallback background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundColor: NAVY,
          backgroundImage: "url('/images/img2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(10,30,60,0.52) 0%, rgba(10,30,60,0.28) 45%, rgba(10,30,60,0.62) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "160px 40px 100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "48px",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left: headline ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          style={{ maxWidth: "620px", flex: "1 1 320px" }}
        >
          <h1
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.03,
              textTransform: "uppercase",
              marginBottom: "22px",
              letterSpacing: "-0.5px",
            }}
          >
            Ready to optimize your logistics?
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.88)",
              marginBottom: "28px",
              lineHeight: 1.65,
              maxWidth: "440px",
            }}
          >
            Bringing personal service to the shipping industry since 1797.
          </p>
          <Link
            href="/about"
            style={{
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Get to know us better &rsaquo;
          </Link>
        </motion.div>

        {/* ── Right: tracking widget ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          style={{
            flex: "0 0 420px",
            maxWidth: "440px",
            width: "100%",
            backgroundColor: ACCENT,
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Track cargo block */}
          <div style={{ padding: "28px 28px 22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "#ffffff",
                }}
              >
                Track your cargo
              </p>
            </div>

            <form
              onSubmit={handleTrack}
              style={{ display: "flex", gap: "0" }}
            >
              <input
                type="text"
                value={trackingInput}
                onChange={(e) =>
                  setTrackingInput(e.target.value.toUpperCase())
                }
                placeholder="Enter Shipment/House Bill/Direct Master Number"
                style={{
                  flex: 1,
                  padding: "14px 14px",
                  fontSize: "13px",
                  border: "none",
                  borderRadius: "2px 0 0 2px",
                  outline: "none",
                  backgroundColor: "#ffffff",
                  color: "#1B3A6B",
                  fontWeight: 500,
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#1565a0",
                  color: "#ffffff",
                  border: "none",
                  padding: "0 22px",
                  borderRadius: "0 2px 2px 0",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#0d47a1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#1565a0")
                }
              >
                Find
              </button>
            </form>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.22)",
              margin: "0 28px",
            }}
          />

          {/* Online services block */}
          <div style={{ padding: "20px 28px 28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "#ffffff",
                }}
              >
                Online services
              </p>
            </div>

            <Link
              href="/contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(255,255,255,0.16)",
                color: "#ffffff",
                padding: "14px 18px",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.28)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.26)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.16)")
              }
            >
              All our online services in one place
              <span style={{ fontSize: "18px" }}>›</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Slide indicators ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {VIDEO_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            title={slide.label}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            style={{
              width: i === currentSlide ? "32px" : "9px",
              height: "9px",
              borderRadius: "5px",
              backgroundColor:
                i === currentSlide
                  ? "#ffffff"
                  : "rgba(255,255,255,0.38)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* ── Slide label (bottom left) ──────────────────────────────── */}
      <motion.div
        key={`label-${currentSlide}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "34px",
          left: "40px",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: ACCENT,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {VIDEO_SLIDES[currentSlide].label}
        </span>
      </motion.div>

      <style>{`
        @media (max-width: 960px) {
          section > div:nth-child(4) {
            flex-direction: column !important;
            padding: 140px 24px 80px !important;
            align-items: flex-start !important;
          }
          section > div:nth-child(4) > div:last-child {
            flex: 0 0 auto !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}