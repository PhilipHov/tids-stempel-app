import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { allBarracks } from '../data/barracks-data';

// Simple blue arrow icon for military barracks
const arrowIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#3b82f6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `),
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
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
      style={{ height: "100vh", width: "100%" }}
      maxBounds={[[53.0, 7.0], [58.0, 16.0]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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