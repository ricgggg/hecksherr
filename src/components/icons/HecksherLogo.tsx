import React from "react";

interface HecksherLogoProps {
  color?: string;
  size?: number;
}

export default function HecksherLogo({ color = "#1B3A6B", size = 44 }: HecksherLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wave 1 — top */}
      <path
        d="M4 12 C8 8, 14 8, 18 12 C22 16, 28 16, 32 12 C36 8, 40 10, 42 12"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wave 2 — middle */}
      <path
        d="M4 20 C8 16, 14 16, 18 20 C22 24, 28 24, 32 20 C36 16, 40 18, 42 20"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wave 3 — bottom */}
      <path
        d="M4 28 C8 24, 14 24, 18 28 C22 32, 28 32, 32 28 C36 24, 40 26, 42 28"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}