import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  selectedService,
  setSelectedService,
  sortBy,
  setSortBy,
  filteredCount,
  totalCount,
  clearFilters
}) => {
  // Vollständige Schweizer Kantone mit korrekten Namen
  const regions = [
    'Zürich', 'Bern', 'Luzern', 'Aargau', 'Solothurn', 'Basel-Stadt', 'Basel-Landschaft',
    'St. Gallen', 'Thurgau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Glarus',
    'Schaffhausen', 'Genf', 'Waadt', 'Wallis', 'Neuenburg', 'Freiburg', 'Jura', 'Zug',
    'Schwyz', 'Nidwalden', 'Obwalden', 'Uri', 'Tessin', 'Graubünden'
  ];

  // Hauptkategorien für die Partner-Suche
  const services = [
    'Umzugsfirma',
    'Reinigungfirma',
    'Malerfirma'
  ];

  return (
    <Card className="mb-8 shadow-lg border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Filter size={20} />
          Filter & Suche
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="search" className="text-gray-800">Suche</Label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <Input
                id="search"
                placeholder="Firmenname oder Stadt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="region" className="text-gray-800">Region</Label>
            <Select value={selectedRegion || "all"} onValueChange={(value) => setSelectedRegion(value === "all" ? "" : value)}>
              <SelectTrigger className="border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Alle Regionen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Regionen</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service" className="text-gray-800">Service</Label>
            <Select value={selectedService || "all"} onValueChange={(value) => setSelectedService(value === "all" ? "" : value)}>
              <SelectTrigger className="border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Alle Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Services</SelectItem>
                {services.map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sort" className="text-gray-800">Sortierung</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-gray-200 focus:border-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating_desc">Beste Bewertung</SelectItem>
                <SelectItem value="reviews_desc">Meiste Bewertungen</SelectItem>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredCount} von {totalCount} Partnern gefunden
          </p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Filter zurücksetzen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;