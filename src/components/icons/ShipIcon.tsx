export default function ShipIcon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg
      width="320"
      height="280"
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hull */}
      <path
        d="M20 180 L40 220 L280 220 L300 180 Z"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Main deck */}
      <rect x="60" y="140" width="200" height="40" rx="2" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Bridge / cabin */}
      <rect x="90" y="90" width="100" height="50" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Upper bridge */}
      <rect x="110" y="55" width="60" height="35" rx="3" stroke={color} strokeWidth="2" fill="none" />
      {/* Windows on cabin */}
      <rect x="100" y="100" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="120" y="100" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="140" y="100" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="160" y="100" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Mast */}
      <line x1="160" y1="20" x2="160" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="130" y1="32" x2="160" y2="20" stroke={color} strokeWidth="1.5" />
      <line x1="190" y1="32" x2="160" y2="20" stroke={color} strokeWidth="1.5" />
      {/* Radar/antenna */}
      <circle cx="160" cy="18" r="5" stroke={color} strokeWidth="2" fill="none" />
      {/* Containers on deck */}
      <rect x="65" y="148" width="24" height="16" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="92" y="148" width="24" height="16" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="204" y="148" width="24" height="16" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="231" y="148" width="24" height="16" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Water waves */}
      <path d="M10 235 Q40 228 70 235 Q100 242 130 235 Q160 228 190 235 Q220 242 250 235 Q280 228 310 235" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 250 Q55 243 90 250 Q125 257 160 250 Q195 243 230 250 Q265 257 300 250" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Bow wave / anchor */}
      <path d="M40 195 Q30 205 40 210" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}