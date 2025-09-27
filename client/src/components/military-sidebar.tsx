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
  activityType: string;
  unitType: string;
  location: string;
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
    const clearedFilters = { activityType: '', unitType: '', location: '' };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activityTypes = [
    'Skydebane',
    'Øvelsesterræn',
    'Treningslejr',
    'Specialoperation',
    'Hovedkvarter'
  ];

  const unitTypes = [
    'Infanteri',
    'Artilleri',
    'Ingeniør',
    'Signaler',
    'Logistik',
    'Sanitet',
    'Luftvåben'
  ];

  const locations = [
    'Nordjylland',
    'Midtjylland',
    'Sydjylland',
    'Fyn',
    'Sjælland',
    'København',
    'Bornholm'
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
            Søg Kaserner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Søg efter kaserne eller regiment..."
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

      {/* Activity Type */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">AKTIVITETSTYPE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activityTypes.map((type) => (
            <Button
              key={type}
              variant={localFilters.activityType === type ? "default" : "ghost"}
              size="sm"
              className={`w-full justify-start ${
                localFilters.activityType === type 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange('activityType', 
                localFilters.activityType === type ? '' : type
              )}
            >
              {type}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Unit Type */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">ENHEDSTYPE</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={localFilters.unitType} 
            onValueChange={(value) => handleFilterChange('unitType', value)}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Vælg enhedstype" />
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

      {/* Calendar */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Kalender
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateSelect(date)}
            className="bg-gray-700 rounded-md"
            classNames={{
              day: "text-white hover:bg-blue-600",
              day_selected: "bg-blue-600 text-white",
              day_today: "bg-gray-600 text-white",
              head_cell: "text-gray-300",
              row: "border-gray-600",
            }}
          />
        </CardContent>
      </Card>

      {/* Directive Input */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">DIREKTIV</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
            + Indsæt direktiv
          </Button>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">STED</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={localFilters.location} 
            onValueChange={(value) => handleFilterChange('location', value)}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Vælg sted" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {locations.map((location) => (
                <SelectItem key={location} value={location} className="text-white">
                  {location}
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
            <span>Totale Kaserner:</span>
            <span className="text-blue-400">24</span>
          </div>
          <div className="flex justify-between">
            <span>Mangler Personel:</span>
            <span className="text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              8
            </span>
          </div>
          <div className="flex justify-between">
            <span>Optimalt Bemandet:</span>
            <span className="text-green-400 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              16
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
