import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter } from 'lucide-react';

const PartnerFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredCount }) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-lg font-bold text-gray-900">Partner filtern</span>
          </div>
          <span className="text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
            {filteredCount} {filteredCount === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Partner suchen (Firmenname, E-Mail...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="w-full md:w-52">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="pending">Ausstehend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerFilters;