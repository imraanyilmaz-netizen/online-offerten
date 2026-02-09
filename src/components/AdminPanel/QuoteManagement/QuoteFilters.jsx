import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const QuoteFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleStatusChange = (value) => {
    onFilterChange(prev => ({ ...prev, status: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Teklif ara (isim, email, hizmet türü...)"
            value={filters.searchTerm}
            onChange={handleInputChange}
            className="pl-10"
          />
        </div>
      </div>
      <div className="w-full md:w-48">
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Durum filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="pending">Beklemede</SelectItem>
            <SelectItem value="approved">Onaylandı</SelectItem>
            <SelectItem value="rejected">Reddedildi</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuoteFilters;