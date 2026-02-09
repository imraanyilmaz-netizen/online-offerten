import React from 'react';
import { QuoteDetail } from '@/components/common/QuoteDetail';

const ServiceDetails = ({ details }) => {
    if (!details) {
        return null;
    }

    // If details is a string in "Label: Value" format (like cleaning details)
    if (typeof details === 'string') {
        // Try to parse as JSON first
        try {
            const parsed = JSON.parse(details);
            if (typeof parsed === 'object') {
                // It's valid JSON, process as object
                const renderDetails = (data) => {
                    if (Array.isArray(data)) {
                        return data.map((item, index) => {
                            if (typeof item === 'object' && item.label && item.value) {
                                return <QuoteDetail key={index} label={item.label} value={item.value} />;
                            }
                            return null;
                        });
                    } else if (typeof data === 'object' && data !== null) {
                        return Object.entries(data).map(([key, value], index) => {
                             if (key && value && typeof value !== 'object') {
                                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                return <QuoteDetail key={index} label={formattedKey} value={String(value)} />;
                             }
                             return null;
                        });
                    }
                    return null;
                };
                const content = renderDetails(parsed);
                return content ? <div className="space-y-2">{content}</div> : null;
            }
        } catch (error) {
            // Not JSON, try to parse as "Label: Value" format
            const lines = details.split('\n').filter(line => line.trim());
            const parsedDetails = lines.map(line => {
                const parts = line.split(':');
                if (parts.length < 2) return null;
                const label = parts[0].trim() + ':'; // Add colon back to label
                const value = parts.slice(1).join(':').trim();
                return { label, value };
            }).filter(Boolean);

            if (parsedDetails.length > 0) {
                return (
                    <div className="space-y-2">
                        {parsedDetails.map(({ label, value }, index) => (
                            <QuoteDetail key={index} label={label} value={value} />
                        ))}
                    </div>
                );
            }
        }
    } else if (typeof details === 'object') {
        const renderDetails = (data) => {
            if (Array.isArray(data)) {
                return data.map((item, index) => {
                    if (typeof item === 'object' && item.label && item.value) {
                        return <QuoteDetail key={index} label={item.label} value={item.value} />;
                    }
                    return null;
                });
            } else if (typeof data === 'object' && data !== null) {
                return Object.entries(data).map(([key, value], index) => {
                     if (key && value && typeof value !== 'object') {
                        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return <QuoteDetail key={index} label={formattedKey} value={String(value)} />;
                     }
                     return null;
                });
            }
            return null;
        };
        const content = renderDetails(details);
        return content ? <div className="space-y-2">{content}</div> : null;
    }

    return null;
};

export default ServiceDetails;