export default function FCLIcon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Full container — solid rectangle with vertical lines */}
      <rect x="8" y="20" width="90" height="55" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Vertical dividers */}
      <line x1="26" y1="20" x2="26" y2="75" stroke={color} strokeWidth="2" />
      <line x1="44" y1="20" x2="44" y2="75" stroke={color} strokeWidth="2" />
      <line x1="62" y1="20" x2="62" y2="75" stroke={color} strokeWidth="2" />
      <line x1="80" y1="20" x2="80" y2="75" stroke={color} strokeWidth="2" />
      {/* Container legs */}
      <line x1="18" y1="75" x2="18" y2="85" stroke={color} strokeWidth="2.5" />
      <line x1="88" y1="75" x2="88" y2="85" stroke={color} strokeWidth="2.5" />
      {/* Plus icon — top right */}
      <line x1="104" y1="12" x2="104" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="96" y1="20" x2="112" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Small boxes bottom right */}
      <rect x="96" y="60" width="16" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <rect x="96" y="76" width="16" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}