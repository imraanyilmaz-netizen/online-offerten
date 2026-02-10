import { useState, useCallback, useRef } from 'react';

const useAddressAutocomplete = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const fetchSuggestions = async (searchQuery, countryCode) => {
        if (!searchQuery || searchQuery.trim().length < 3) { 
            setSuggestions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                q: searchQuery,
                format: 'json',
                addressdetails: 1,
                limit: 15,
            });
            if (countryCode) {
              params.append('countrycodes', countryCode.toLowerCase());
            }

            const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            const formatted = data
                .map(place => {
                    const street = place.address.road || '';
                    const housenumber = place.address.house_number || '';
                    const postcode = place.address.postcode || '';
                    const city = place.address.city || place.address.town || place.address.village || place.address.hamlet || '';

                    if (street && postcode && city) {
                        return {
                            id: place.place_id,
                            display_name: place.display_name,
                            street: street,
                            housenumber: housenumber,
                            postcode: postcode,
                            city: city,
                            county: place.address.county || '', 
                            suburb: place.address.suburb || '', 
                            village: place.address.village || '', 
                            hamlet: place.address.hamlet || '',
                            full_address_object: place.address 
                        };
                    }
                    return null; 
                })
                .filter(s => s !== null && s.street);
            
            if (/\d/.test(searchQuery)) {
                formatted.sort((a, b) => {
                    const aHasNumber = !!a.housenumber;
                    const bHasNumber = !!b.housenumber;
                    if (aHasNumber && !bHasNumber) return -1;
                    if (!aHasNumber && bHasNumber) return 1;
                    return 0;
                });
            }
            
            setSuggestions(formatted);
        } catch (error) {
            console.error("Failed to fetch address suggestions:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const getSuggestions = useCallback((query, countryCode) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setLoading(true); 
        timeoutRef.current = setTimeout(() => {
            fetchSuggestions(query, countryCode);
        }, 350); 
    }, []);

    const clearSuggestions = () => {
        setSuggestions([]);
    };

    return { loading, suggestions, getSuggestions, clearSuggestions };
};

export default useAddressAutocomplete;