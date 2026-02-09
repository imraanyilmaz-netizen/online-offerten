import React, { useState, useEffect, useRef } from 'react';
import useAddressAutocomplete from '@/hooks/useAddressAutocomplete';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const AddressInput = ({ value, onChange, onSelect, countryCode = 'CH' }) => {
    const [inputValue, setInputValue] = useState(value);
    const { loading, suggestions, getSuggestions, clearSuggestions } = useAddressAutocomplete();
    const wrapperRef = useRef(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                clearSuggestions();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, clearSuggestions]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(e);
        if (newValue.length > 2) {
            getSuggestions(newValue, countryCode);
        } else {
            clearSuggestions();
        }
    };

    const handleSelect = (suggestion) => {
        const street = `${suggestion.street}${suggestion.housenumber ? ' ' + suggestion.housenumber : ''}`;
        setInputValue(street);
        onSelect({
            street: street,
            postcode: suggestion.postcode,
            city: suggestion.city,
        });
        clearSuggestions();
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <Input
                    id="address_street"
                    value={inputValue}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {loading && <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />}
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="px-4 py-2 cursor-pointer hover:bg-slate-100"
                            onClick={() => handleSelect(suggestion)}
                        >
                            <p className="font-medium text-sm">{suggestion.street} {suggestion.housenumber}</p>
                            <p className="text-xs text-slate-500">{suggestion.postcode} {suggestion.city}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressInput;