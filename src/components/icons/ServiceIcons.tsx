export function ShipIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M6 34h36l-4 8H10l-4-8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 34V16h8v-6h12v6h8v18"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 40c4 2 8 2 12 0s8-2 12 0 8 2 12 0" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function PlaneIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M6 26l36-14-14 36-4-14-14-4 -4-4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="14" width="24" height="18" stroke={color} strokeWidth="2" />
      <path
        d="M28 20h8l6 6v6h-14V20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="34" r="3" stroke={color} strokeWidth="2" />
      <circle cx="34" cy="34" r="3" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function ProjectIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="2" />
      <rect x="26" y="26" width="14" height="14" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function WarehouseIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M4 20 24 8l20 12v18H4V20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 38V24h16v14" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 20h40" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function ValueAddedIcon({ size = 40, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="16" y="10" width="16" height="16" stroke={color} strokeWidth="2" />
      <path
        d="M8 34c4-6 10-8 16-8s12 2 16 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}