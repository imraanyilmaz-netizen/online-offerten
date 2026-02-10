import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Initial check
    documentChangeHandler();

    // Listen for changes
    try {
        mediaQueryList.addEventListener('change', documentChangeHandler);
    } catch (e) {
        // Fallback for older browsers
        mediaQueryList.addListener(documentChangeHandler);
    }


    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler);
      } catch (e) {
        mediaQueryList.removeListener(documentChangeHandler);
      }
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;