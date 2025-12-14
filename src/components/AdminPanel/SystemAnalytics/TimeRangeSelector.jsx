import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TimeRangeSelector = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Zeitraum auswählen" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Letzte 7 Tage</SelectItem>
        <SelectItem value="30">Letzte 30 Tage</SelectItem>
        <SelectItem value="90">Letzte 90 Tage</SelectItem>
        <SelectItem value="365">Letztes Jahr</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeRangeSelector;