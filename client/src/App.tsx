import React, { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MilitaryResourceMap } from './components/military-resource-map';
import { MilitarySidebar } from './components/military-sidebar';
import { BarracksDetailModal } from './components/barracks-detail-modal';
import { RegimentDetailModal } from './components/regiment-detail-modal';
import { ResourceAllocation } from './components/resource-allocation';
import { DeploymentPlanning } from './components/deployment-planning';
import { allBarracks } from './data/barracks-data';
import { allPersonnel } from './data/personnel-data';
import { queryClient } from "./lib/queryClient";

// Use real barracks data
const mockBarracks = allBarracks.map(barracks => ({
  ...barracks,
  personnelCount: barracks.currentPersonnel,
}));

const mockPersonnel = [
  {
    id: '1',
    name: 'Lars Andersen',
    rank: 'SSG' as const,
    barracksId: '1',
    specialization: 'Infanteri',
    experience: 8,
    status: 'Active' as const,
    nextTraining: new Date('2025-10-15'),
    nextDeployment: new Date('2025-12-01'),
    dropoutRisk: 25,
    currentQualifications: ['Grundlæggende Våbenhåndtering', 'Grundlæggende Medicin'],
    deploymentDate: new Date('2025-12-01'),
    deploymentLocation: 'Afghanistan',
  },
  {
    id: '2',
    name: 'Maria Nielsen',
    rank: 'Officer' as const,
    barracksId: '1',
    specialization: 'Føring',
    experience: 12,
    status: 'Training' as const,
    nextTraining: new Date('2025-11-20'),
    dropoutRisk: 15,
    currentQualifications: ['Officer Rang', 'Grundlæggende Medicin'],
    deploymentDate: new Date('2026-02-15'),
    deploymentLocation: 'Mali',
  },
];

// Mock available resources for allocation
const mockAvailableResources = [
  {
    barracksId: '2',
    barracksName: 'Aarhus Kaserne',
    location: 'Aarhus',
    excess: {
      SSG: 5,
      Befalingsmaend: 3,
      Officerer: 2,
    },
    distance: 120,
    transferTime: 2,
  },
  {
    barracksId: '3',
    barracksName: 'København Kaserne',
    location: 'København',
    excess: {
      SSG: 8,
      Befalingsmaend: 4,
      Officerer: 1,
    },
    distance: 250,
    transferTime: 4,
  },
];

interface FilterOptions {
  unitType: string;
}

function App() {
  const [selectedBarracks, setSelectedBarracks] = useState<typeof mockBarracks[0] | null>(null);
  const [selectedRegiment, setSelectedRegiment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState<FilterOptions>({
    unitType: '',
  });
  const [showResourceAllocation, setShowResourceAllocation] = useState(false);
  const [showDeploymentPlanning, setShowDeploymentPlanning] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<typeof mockPersonnel[0] | null>(null);

  const handleBarracksSelect = (barracks: typeof mockBarracks[0]) => {
    // When a barracks is selected, open the regiment detail modal for its regiment
    setSelectedRegiment(barracks.regiment);
    setSelectedBarracks(barracks); // Keep selectedBarracks for potential future use
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleResourceAllocation = () => {
    setShowResourceAllocation(true);
  };

  const handleDeploymentPlanning = (personnel: typeof mockPersonnel[0]) => {
    setSelectedPersonnel(personnel);
    setShowDeploymentPlanning(true);
  };

  // Calculate shortage for Aalborg Kaserne (example)
  const getShortageForBarracks = (barracks: typeof mockBarracks[0]) => {
    if (!barracks.resources) return { SSG: 0, Befalingsmaend: 0, Officerer: 0 };
    
    return {
      SSG: Math.max(0, barracks.resources.requiredSSG - barracks.resources.currentSSG),
      Befalingsmaend: Math.max(0, barracks.resources.requiredBefalingsmaend - barracks.resources.currentBefalingsmaend),
      Officerer: Math.max(0, barracks.resources.requiredOfficerer - barracks.resources.currentOfficerer),
    };
  };

  // Group barracks and personnel by regiment for RegimentDetailModal
  const getRegimentData = (regimentName: string) => {
    const barracksInRegiment = allBarracks.filter(b => b.regiment === regimentName);
    const personnelInRegiment = allPersonnel.filter(p => p.regiment === regimentName);

    const totalPersonnel = personnelInRegiment.length;
    const totalBarracks = barracksInRegiment.length;
    const totalCapacity = barracksInRegiment.reduce((sum, b) => sum + (b.capacity || 0), 0);

    const totalSSG = personnelInRegiment.filter(p => p.rank === 'SSG').length;
    const totalBefalingsmaend = personnelInRegiment.filter(p => p.rank === 'Befalingsmand').length;
    const totalOfficerer = personnelInRegiment.filter(p => p.rank === 'Officer').length;

    const requiredSSG = barracksInRegiment.reduce((sum, b) => sum + (b.resources?.requiredSSG || 0), 0);
    const requiredBefalingsmaend = barracksInRegiment.reduce((sum, b) => sum + (b.resources?.requiredBefalingsmaend || 0), 0);
    const requiredOfficerer = barracksInRegiment.reduce((sum, b) => sum + (b.resources?.requiredOfficerer || 0), 0);

    const averageExperience = personnelInRegiment.length > 0 
      ? personnelInRegiment.reduce((sum, p) => sum + p.experience, 0) / personnelInRegiment.length
      : 0;

    return {
      name: regimentName,
      totalBarracks,
      totalPersonnel,
      totalCapacity,
      barracks: barracksInRegiment,
      personnel: personnelInRegiment,
      statistics: {
        totalSSG,
        totalBefalingsmaend,
        totalOfficerer,
        requiredSSG,
        requiredBefalingsmaend,
        requiredOfficerer,
        averageExperience,
      },
      // Add mock data for Materiel, Uddannelse, Andet
      materiel: [
        { name: 'Kampvogn Leopard 2', quantity: 15, status: 'Operational', barracks: 'Holstebro Kaserne' },
        { name: 'Panserinfanterikøretøj CV90', quantity: 20, status: 'Maintenance', barracks: 'Slagelse Kaserne' },
        { name: 'Artilleri M109', quantity: 8, status: 'Operational', barracks: 'Varde Kaserne' },
      ],
      uddannelse: [
        { name: 'Føringskursus I', startDate: new Date('2025-10-01'), endDate: new Date('2025-10-30'), participants: 10, location: 'Karup' },
        { name: 'Skydebane Øvelse', startDate: new Date('2025-11-10'), endDate: new Date('2025-11-12'), participants: 50, location: 'Oksbøl' },
      ],
      andet: [
        { title: 'Næste inspektion', date: new Date('2026-01-15'), details: 'Årlig inspektion af materiel' },
        { title: 'Budget status', details: '85% brugt af årligt budget' },
      ]
    };
  };

  const currentRegimentData = selectedRegiment ? getRegimentData(selectedRegiment) : null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-100 flex">
          <MilitarySidebar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            filters={filters}
          />
          <div className="flex-1">
            {!selectedBarracks && !selectedRegiment && !showResourceAllocation && !showDeploymentPlanning && (
              <MilitaryResourceMap
                barracks={mockBarracks}
                onBarracksSelect={handleBarracksSelect}
              />
            )}
          </div>
          <BarracksDetailModal
            barracks={selectedBarracks}
            resources={selectedBarracks?.resources || null}
            personnel={mockPersonnel.filter(p => p.barracksId === selectedBarracks?.id)}
            isOpen={!!selectedBarracks}
            onClose={() => setSelectedBarracks(null)}
            onResourceAllocation={handleResourceAllocation}
            onDeploymentPlanning={handleDeploymentPlanning}
          />
          
          {currentRegimentData && (
            <RegimentDetailModal
              regimentData={currentRegimentData}
              isOpen={!!selectedRegiment}
              onClose={() => setSelectedRegiment(null)}
              onBarracksSelect={(barracksId) => {
                const barracks = allBarracks.find(b => b.id === barracksId);
                if (barracks) {
                  setSelectedBarracks(barracks);
                }
              }}
            />
          )}
          
          <ResourceAllocation
            isOpen={showResourceAllocation}
            onClose={() => setShowResourceAllocation(false)}
            requestingBarracks={{
              id: selectedBarracks?.id || '',
              name: selectedBarracks?.name || '',
              location: selectedBarracks?.location || '',
              regiment: selectedBarracks?.regiment || '',
              shortage: getShortageForBarracks(selectedBarracks || mockBarracks[0])
            }}
            availableResources={mockAvailableResources}
          />
          
          <DeploymentPlanning
            isOpen={showDeploymentPlanning}
            onClose={() => setShowDeploymentPlanning(false)}
            personnel={selectedPersonnel || mockPersonnel[0]}
          />
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
