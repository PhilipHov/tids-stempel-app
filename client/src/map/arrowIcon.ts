// src/map/arrowIcon.ts
import L from "leaflet";

export const blueArrowIcon = (size = 24) =>
  L.divIcon({
    className: "arrow-pin", // css nedenfor
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 L20 18 H4 Z" />
      </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],   // spidsen peger på koordinatet
    popupAnchor: [0, -size],
  });
