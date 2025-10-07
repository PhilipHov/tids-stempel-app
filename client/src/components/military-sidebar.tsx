import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface MilitarySidebarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
  filters: FilterOptions;
}

interface FilterOptions {
  unitType: string;
}

export function MilitarySidebar({ 
  onSearch, 
  onFilterChange, 
  onDateSelect, 
  selectedDate, 
  filters 
}: MilitarySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { unitType: '' };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };


  const unitTypes = [
    'Hæren',
    'Marinen',
    'Flyvevåbnet',
    'Livgarden',
    'Gardehusarregimentet',
    'Jydske Dragonregiment',
    'Ingeniørregimentet'
  ];


  return (
    <div className="w-80 bg-gray-900 text-white p-4 space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">PLANOPS</h1>
        <Badge variant="secondary" className="bg-blue-600 text-white">
          Militær Ressource Styring
        </Badge>
      </div>

      {/* Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Search className="h-4 w-4" />
            Søg Regimenter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Søg efter regiment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button onClick={handleSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            SØG
          </Button>
        </CardContent>
      </Card>


      {/* Regiment Type */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">REGIMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={localFilters.unitType} 
            onValueChange={(value) => handleFilterChange('unitType', value)}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Vælg regiment" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {unitTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>



      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Search className="h-4 w-4 mr-2" />
          SØG
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          CLEAR
        </Button>
      </div>

      {/* Quick Stats */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Oversigt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
                <span>Totale Regimenter:</span>
                <span className="text-blue-400">21</span>
          </div>
          <div className="flex justify-between">
            <span>Totalt Personel:</span>
            <span className="text-blue-400">12.350</span>
          </div>
          <div className="flex justify-between">
            <span>Hæren:</span>
                <span className="text-green-400">14 regimenter</span>
          </div>
          <div className="flex justify-between">
            <span>Marinen:</span>
            <span className="text-blue-400">3 flådestationer</span>
          </div>
          <div className="flex justify-between">
            <span>Flyvevåbnet:</span>
            <span className="text-purple-400">3 flyvestationer</span>
          </div>
          <div className="flex justify-between">
            <span>Livgarden:</span>
                <span className="text-yellow-400">1 regiment</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
