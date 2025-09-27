// MilitaryMapShell.tsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { blueArrowIcon } from "../map/arrowIcon";
import RegimentDetail from "./RegimentDetail";
import { RegimentData } from "./RegimentPopup";
import { positions, regiments } from "../data/mock-regiments";

function useZoomSize() {
  const [size, setSize] = useState(24);
  useMapEvents({
    zoomend(e) {
      const z = e.target.getZoom();
      setSize(Math.max(18, Math.min(32, 18 + (z - 6) * 2)));
    },
  });
  return size;
}

function MapContent({ onMarkerClick }: { onMarkerClick: (r: RegimentData) => void }) {
  const size = useZoomSize();
  
  return (
    <>
      {regiments.map((r) => (
        <Marker
          key={r.id}
          position={positions[r.id]}
          icon={blueArrowIcon(size)}
          eventHandlers={{ click: () => onMarkerClick(r) }}
        />
      ))}
    </>
  );
}

export default function MilitaryMapShell() {
  const [selected, setSelected] = useState<RegimentData | null>(null);

  // Når valgt → vis fuldskærms-detalje og skjul kort
  if (selected) {
    return <RegimentDetail data={selected} onBack={() => setSelected(null)} />;
  }

  // Ellers vis kortet (som dit "Sådan her"-layout)
  return (
    <MapContainer
      center={[56.1, 10.1]}
      zoom={7}
      style={{ height: "100vh", width: "100%" }}
      preferCanvas
      maxBounds={[[53.0, 7.0], [58.0, 16.0]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapContent onMarkerClick={setSelected} />
    </MapContainer>
  );
}
