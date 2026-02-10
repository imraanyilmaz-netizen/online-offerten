import React from 'react';
import { Check, X } from 'lucide-react';

const DetailItem = ({ label, value }) => {
    if (value === null || value === undefined || value === '') return null;

    let displayValue;
    if (typeof value === 'boolean') {
        displayValue = value ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />;
    } else {
        displayValue = <span className="font-medium text-gray-800 text-right">{String(value)}</span>;
    }

    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-500">{label}</span>
            {displayValue}
        </div>
    );
};

const PaintingDetails = ({ details }) => {
    if (!details || !details.services_detail1) return null;

    const renderedDetails = details.services_detail1
        .split('\n')
        .map(line => {
            const parts = line.split(':');
            if (parts.length < 2) return null;
            const label = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            return { label, value };
        })
        .filter(Boolean);

    if (renderedDetails.length === 0) return <p className="text-sm text-gray-500">Keine spezifischen Malerdetails angegeben.</p>;

    return (
        <div className="mt-4 border-t pt-4">
             <div className="space-y-1">
                {renderedDetails.map(({ label, value }) => (
                    <DetailItem key={label} label={label} value={value} />
                ))}
             </div>
        </div>
    );
};

export default PaintingDetails;