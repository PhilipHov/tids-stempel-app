import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { allBarracks } from '../data/barracks-data';

// Blue arrow icon for military barracks
const arrowIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30" fill="#3b82f6">
      <path d="M10 0L20 20H12V30H8V20H0L10 0Z"/>
    </svg>
  `),
  iconSize: [20, 30],
  iconAnchor: [10, 30],
  popupAnchor: [0, -30],
});

interface MilitaryResourceMapProps {
  barracks: any[];
  onBarracksSelect: (barracks: any) => void;
}

export function MilitaryResourceMap({ barracks, onBarracksSelect }: MilitaryResourceMapProps) {
  const handleMarkerClick = (barracks: any) => {
    console.log('Marker clicked:', barracks.name);
    onBarracksSelect(barracks);
  };

  return (
    <MapContainer
      center={[56, 10]}
      zoom={7}
      style={{ height: "100vh", width: "100%", backgroundColor: "#f8f9fa" }}
      maxBounds={[[53.0, 7.0], [58.0, 16.0]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.3}
      />
      
      {barracks.map((barrack) => (
        <Marker 
          key={barrack.id} 
          position={[barrack.latitude, barrack.longitude]} 
          icon={arrowIcon}
          eventHandlers={{
            click: () => handleMarkerClick(barrack),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[250px]">
              <h3 className="font-bold text-lg mb-2">{barrack.name}</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Regiment:</strong> {barrack.regiment}</p>
                <p><strong>Region:</strong> {barrack.region}</p>
                <p><strong>Personel:</strong> {barrack.currentPersonnel || 0}</p>
              </div>
              <button 
                className="mt-3 w-full bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                onClick={() => handleMarkerClick(barrack)}
              >
                Se Detaljer
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}