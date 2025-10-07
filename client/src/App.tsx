import React, { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MilitaryMapShell from './components/MilitaryMapShell';
import { MilitarySidebar } from './components/military-sidebar';
import TimeTrackingApp from './components/TimeTrackingApp';
import { queryClient } from "./lib/queryClient";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface FilterOptions {
  unitType: string;
}

type AppMode = 'logistics' | 'timer';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('logistics');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState<FilterOptions>({
    unitType: '',
  });

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

  const switchToLogistics = () => {
    setAppMode('logistics');
  };

  const switchToTimer = () => {
    setAppMode('timer');
  };

  if (appMode === 'timer') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* App Switcher Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Tidsregistrering</h1>
            <Button 
              onClick={switchToLogistics}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Militær Logistik
            </Button>
          </div>
        </div>
        <TimeTrackingApp />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-100 flex">
          <div className="w-80 bg-gray-900 text-white p-4 space-y-4 overflow-y-auto relative">
            {/* App Switcher */}
            <div className="mb-4">
              <Button 
                onClick={switchToTimer}
                variant="outline"
                className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
              >
                <Clock className="h-4 w-4" />
                Tidsregistrering
              </Button>
            </div>
            
            <MilitarySidebar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              filters={filters}
            />
          </div>
          <div className="flex-1">
            <MilitaryMapShell />
          </div>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;