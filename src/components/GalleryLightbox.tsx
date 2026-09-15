"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const slides = [
  { src: "/images/gallery-1.jpg" },
  { src: "/images/gallery-2.jpg" },
  { src: "/images/gallery-3.jpg" },
];

export default function GalleryLightbox() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt=""
          onClick={() => {
            setIndex(i);
            setOpen(true);
          }}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: "6px",
            border: "2px solid #1B3A6B",
          }}
        />
      ))}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(27, 58, 107, 0.9)" }, // navy overlay
        }}
      />
    </div>
  );
}