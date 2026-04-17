import React, { useState, useEffect, useRef } from 'react';
import useAddressAutocomplete from '@/hooks/useAddressAutocomplete';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const AddressInput = ({ value, onChange, onSelect, countryCode = 'CH', inputId = 'address_street' }) => {
    const [inputValue, setInputValue] = useState(value);
    const [resolving, setResolving] = useState(false);
    const { loading, suggestions, getSuggestions, clearSuggestions, resolveSuggestion } = useAddressAutocomplete();
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

    const handleSelect = async (suggestion) => {
        setResolving(true);
        try {
            const resolved = await resolveSuggestion(suggestion);
            const street = `${resolved.street || ''}${resolved.housenumber ? ' ' + resolved.housenumber : ''}`.trim();
            setInputValue(street);
            onSelect({
                street: street || resolved.street,
                postcode: resolved.postcode,
                city: resolved.city,
            });
            clearSuggestions();
        } finally {
            setResolving(false);
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <Input
                    id={inputId}
                    value={inputValue}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={resolving}
                />
                {(loading || resolving) && (
                    <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-card border border-border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="px-4 py-2 cursor-pointer hover:bg-muted"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(suggestion);
                            }}
                        >
                            {suggestion.source === 'google' ? (
                                <>
                                    <p className="font-medium text-sm">{suggestion.main_text}</p>
                                    {suggestion.secondary_text ? (
                                        <p className="text-xs text-muted-foreground">{suggestion.secondary_text}</p>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <p className="font-medium text-sm">
                                        {suggestion.street} {suggestion.housenumber && `${suggestion.housenumber}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {suggestion.postcode} {suggestion.city}
                                    </p>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressInput;
