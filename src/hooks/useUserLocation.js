import { useState, useEffect } from 'react';

// İsviçre'nin büyük şehirleri listesi
const MAJOR_CITIES = [
  'Zürich', 'Zurich', 'Zuerich',
  'Bern', 'Berne',
  'Basel', 'Basle',
  'Genève', 'Geneva', 'Genf',
  'Lausanne',
  'Luzern', 'Lucerne',
  'St. Gallen', 'St Gallen', 'Sankt Gallen',
  'Winterthur',
  'Biel', 'Bienne',
  'Thun',
  'Köniz',
  'La Chaux-de-Fonds',
  'Schaffhausen',
  'Fribourg', 'Freiburg',
  'Chur',
  'Neuchâtel', 'Neuenburg',
  'Vernier',
  'Uster',
  'Sitten', 'Sion'
];

export const useUserLocation = () => {
  const [location, setLocation] = useState({ city: null, loading: true });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Önce localStorage'dan kontrol et (cache)
        const cachedLocation = localStorage.getItem('userLocation');
        if (cachedLocation) {
          const parsed = JSON.parse(cachedLocation);
          // Cache 24 saat geçerli
          if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
            setLocation({ city: parsed.city, loading: false });
            return;
          }
        }

        // IP-based geolocation (ücretsiz API) - timeout ile
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye timeout
        
        try {
          const response = await fetch('https://ipapi.co/json/', {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            }
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            
            // Sadece İsviçre'den gelen istekler için işle
            if (data.country_code === 'CH' || data.country_name === 'Switzerland') {
              const city = data.city || null;
              
              if (city) {
                // Cache'e kaydet
                localStorage.setItem('userLocation', JSON.stringify({
                  city,
                  timestamp: Date.now()
                }));
                setLocation({ city, loading: false });
                return;
              }
            }
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          // Fetch hatası sessizce yok sayılır, fallback olarak null döner
          if (fetchError.name !== 'AbortError') {
            console.warn('Location detection failed:', fetchError.message);
          }
        }
        
        // Hata durumunda veya İsviçre dışından gelen istekler için
        setLocation({ city: null, loading: false });
      } catch (error) {
        // Genel hata durumu
        console.error('Error in location detection:', error);
        setLocation({ city: null, loading: false });
      }
    };

    detectLocation();
  }, []);

  return location;
};

