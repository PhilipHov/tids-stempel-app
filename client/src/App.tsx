import React, { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MilitaryMapShell from './components/MilitaryMapShell';
import { MilitarySidebar } from './components/military-sidebar';
import { queryClient } from "./lib/queryClient";

interface FilterOptions {
  unitType: string;
}

function App() {
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
            <MilitaryMapShell />
          </div>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;