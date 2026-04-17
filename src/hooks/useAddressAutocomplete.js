/* global google */
import { useState, useCallback, useRef } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMapsLoader';

const hasGoogleMapsKey = Boolean(
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
);

function parseGoogleAddressComponents(components) {
  let route = '';
  let street_number = '';
  let postal_code = '';
  let locality = '';
  let sublocality = '';
  let postal_town = '';

  if (!components?.length) {
    return { street: '', housenumber: '', postcode: '', city: '' };
  }

  for (const c of components) {
    const types = c.types;
    if (types.includes('street_number')) street_number = c.long_name;
    if (types.includes('route')) route = c.long_name;
    if (types.includes('postal_code')) postal_code = c.long_name;
    if (types.includes('locality')) locality = c.long_name;
    if (types.includes('postal_town')) postal_town = c.long_name;
    if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
      sublocality = c.long_name;
    }
  }

  const city = locality || postal_town || sublocality || '';

  return {
    street: route,
    housenumber: street_number,
    postcode: postal_code,
    city,
  };
}

function getGooglePredictions(input, countryCode) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.AutocompleteService();
    const opts = {
      input,
      types: ['address'],
    };
    if (countryCode) {
      opts.componentRestrictions = { country: String(countryCode).toLowerCase() };
    }
    service.getPlacePredictions(opts, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
        return;
      }
      if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
        reject(new Error(String(status)));
        return;
      }
      const formatted = predictions.map((p) => ({
        id: p.place_id,
        source: 'google',
        place_id: p.place_id,
        main_text: p.structured_formatting?.main_text || p.description,
        secondary_text: p.structured_formatting?.secondary_text || '',
      }));
      resolve(formatted);
    });
  });
}

function getGooglePlaceDetails(placeId) {
  return new Promise((resolve, reject) => {
    const svc = new google.maps.places.PlacesService(document.createElement('div'));
    svc.getDetails(
      {
        placeId,
        fields: ['address_components', 'formatted_address'],
      },
      (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
          reject(new Error(String(status)));
          return;
        }
        const parsed = parseGoogleAddressComponents(place.address_components);
        resolve({
          ...parsed,
          display_name: place.formatted_address,
        });
      },
    );
  });
}

async function fetchNominatimSuggestions(searchQuery, countryCode) {
  const params = new URLSearchParams({
    q: searchQuery,
    format: 'json',
    addressdetails: 1,
    limit: 15,
  });
  if (countryCode) {
    params.append('countrycodes', String(countryCode).toLowerCase());
  }

  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  const formatted = data
    .map((place) => {
      const street = place.address?.road || '';
      const housenumber = place.address?.house_number || '';
      const postcode = place.address?.postcode || '';
      const city =
        place.address?.city ||
        place.address?.town ||
        place.address?.village ||
        place.address?.hamlet ||
        '';

      if (street && postcode && city) {
        return {
          id: place.place_id,
          source: 'nominatim',
          display_name: place.display_name,
          street,
          housenumber,
          postcode,
          city,
          county: place.address?.county || '',
          suburb: place.address?.suburb || '',
          village: place.address?.village || '',
          hamlet: place.address?.hamlet || '',
          full_address_object: place.address,
        };
      }
      return null;
    })
    .filter((s) => s !== null && s.street);

  if (/\d/.test(searchQuery)) {
    formatted.sort((a, b) => {
      const aHasNumber = !!a.housenumber;
      const bHasNumber = !!b.housenumber;
      if (aHasNumber && !bHasNumber) return -1;
      if (!aHasNumber && bHasNumber) return 1;
      return 0;
    });
  }

  return formatted;
}

const useAddressAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchSuggestions = useCallback(async (searchQuery, countryCode) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const myId = ++requestIdRef.current;
    setLoading(true);

    if (hasGoogleMapsKey) {
      try {
        await loadGoogleMapsScript();
        if (requestIdRef.current !== myId) return;
        const googleSuggestions = await getGooglePredictions(searchQuery.trim(), countryCode);
        if (requestIdRef.current !== myId) return;
        setSuggestions(googleSuggestions);
        setLoading(false);
        return;
      } catch (e) {
        console.warn('Google Places Autocomplete failed, using OpenStreetMap Nominatim', e);
      }
    }

    try {
      const formatted = await fetchNominatimSuggestions(searchQuery, countryCode);
      if (requestIdRef.current !== myId) return;
      setSuggestions(formatted);
    } catch (error) {
      console.error('Failed to fetch address suggestions:', error);
      setSuggestions([]);
    } finally {
      if (requestIdRef.current === myId) {
        setLoading(false);
      }
    }
  }, []);

  const getSuggestions = useCallback(
    (query, countryCode) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(query, countryCode);
      }, 350);
    },
    [fetchSuggestions],
  );

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  const resolveSuggestion = useCallback(async (suggestion) => {
    if (suggestion?.source === 'google' && suggestion.place_id) {
      await loadGoogleMapsScript();
      const details = await getGooglePlaceDetails(suggestion.place_id);
      return {
        street: details.street,
        housenumber: details.housenumber,
        postcode: details.postcode,
        city: details.city,
      };
    }
    return {
      street: suggestion.street,
      housenumber: suggestion.housenumber,
      postcode: suggestion.postcode,
      city: suggestion.city,
    };
  }, []);

  return {
    loading,
    suggestions,
    getSuggestions,
    clearSuggestions,
    resolveSuggestion,
  };
};

export default useAddressAutocomplete;
