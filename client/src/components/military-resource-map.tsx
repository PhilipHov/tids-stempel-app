import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { barracks, personnel, resourceRequirements } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

// Custom icon for military barracks
const barracksIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6">
      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
      <path d="M2 17L12 22L22 17"/>
      <path d="M2 12L12 17L22 12"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface BarracksWithResources extends typeof barracks.$inferSelect {
  resources?: typeof resourceRequirements.$inferSelect;
  personnelCount?: number;
}

interface MilitaryResourceMapProps {
  barracks: BarracksWithResources[];
  onBarracksSelect: (barracks: BarracksWithResources) => void;
}

export function MilitaryResourceMap({ barracks, onBarracksSelect }: MilitaryResourceMapProps) {
  const [selectedBarracks, setSelectedBarracks] = useState<BarracksWithResources | null>(null);

  const handleMarkerClick = (barracks: BarracksWithResources) => {
    setSelectedBarracks(barracks);
    onBarracksSelect(barracks);
  };

  const getResourceStatus = (resources?: typeof resourceRequirements.$inferSelect) => {
    if (!resources) return 'unknown';
    
    const hasShortage = 
      resources.currentSSG < resources.requiredSSG ||
      resources.currentBefalingsmaend < resources.requiredBefalingsmaend ||
      resources.currentOfficerer < resources.requiredOfficerer;
    
    const hasExcess = 
      resources.currentSSG > resources.requiredSSG ||
      resources.currentBefalingsmaend > resources.requiredBefalingsmaend ||
      resources.currentOfficerer > resources.requiredOfficerer;

    if (hasShortage) return 'shortage';
    if (hasExcess) return 'excess';
    return 'optimal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortage': return 'text-red-600';
      case 'excess': return 'text-yellow-600';
      case 'optimal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortage': return <AlertTriangle className="h-4 w-4" />;
      case 'excess': return <AlertTriangle className="h-4 w-4" />;
      case 'optimal': return <CheckCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[56.2639, 9.5018]} // Denmark center
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        maxBounds={[[53.0, 7.0], [58.0, 16.0]]} // Restrict to Denmark area
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {barracks.map((barrack) => {
          const status = getResourceStatus(barrack.resources);
          const statusColor = getStatusColor(status);
          const statusIcon = getStatusIcon(status);
          
          return (
            <Marker
              key={barrack.id}
              position={[barrack.latitude, barrack.longitude]}
              icon={barracksIcon}
              eventHandlers={{
                click: () => handleMarkerClick(barrack),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-center gap-2 mb-2">
                    {statusIcon}
                    <h3 className="font-bold text-lg">{barrack.name}</h3>
                    <Badge variant={status === 'optimal' ? 'default' : status === 'shortage' ? 'destructive' : 'secondary'}>
                      {status === 'optimal' ? 'Optimal' : status === 'shortage' ? 'Mangler' : 'For mange'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <p><strong>Regiment:</strong> {barrack.regiment}</p>
                    <p><strong>Region:</strong> {barrack.region}</p>
                    <p><strong>Personel:</strong> {barrack.personnelCount || 0}</p>
                  </div>

                  {barrack.resources && (
                    <div className="mt-3 pt-2 border-t">
                      <h4 className="font-semibold mb-2">Ressourcer:</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>SSG:</span>
                          <span className={statusColor}>
                            {barrack.resources.currentSSG}/{barrack.resources.requiredSSG}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Befalingsmænd:</span>
                          <span className={statusColor}>
                            {barrack.resources.currentBefalingsmaend}/{barrack.resources.requiredBefalingsmaend}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Officerer:</span>
                          <span className={statusColor}>
                            {barrack.resources.currentOfficerer}/{barrack.resources.requiredOfficerer}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => handleMarkerClick(barrack)}
                  >
                    Se detaljer
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
