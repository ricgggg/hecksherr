export default function MultiIcon({ color = "#2D6A4F" }: { color?: string }) {
  return (
    <svg
      width="180"
      height="80"
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Truck */}
      <rect x="2" y="30" width="44" height="28" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
      <rect x="38" y="38" width="18" height="20" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="14" cy="60" r="6" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="44" cy="60" r="6" stroke={color} strokeWidth="2" fill="none" />

      {/* Ship */}
      <path d="M68 50 Q90 38 112 50" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M72 50 L108 50 L104 65 L76 65 Z" stroke={color} strokeWidth="2" fill="none" />
      <line x1="90" y1="35" x2="90" y2="50" stroke={color} strokeWidth="2" />
      <path d="M90 35 L104 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Water waves */}
      <path d="M64 70 Q74 66 84 70 Q94 74 104 70 Q114 66 124 70" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Airplane */}
      <path d="M128 40 L168 35 L165 42 L148 44 L140 60 L135 60 L140 44 L128 46 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}