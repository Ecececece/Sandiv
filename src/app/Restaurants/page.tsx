'use client';
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function Restaurant() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const locationsData: Location[] = [
      // İzmir
      { name: "Sandiv - İzmir - Karşıyaka", position: { lat: 38.4318, lng: 27.1364 } },
      { name: "Sandiv - İzmir - Alsancak", position: { lat: 38.4319, lng: 27.1413 } },

      // Bursa
      { name: "Sandiv - Bursa - Merkez", position: { lat: 40.1828, lng: 29.0667 } },
      { name: "Sandiv - Bursa - Osmangazi", position: { lat: 40.1917, lng: 29.0619 } },
      { name: "Sandiv - Bursa - Nilüfer", position: { lat: 40.2348, lng: 28.8687 } },

      // Ankara
      { name: "Sandiv - Ankara - Çankaya", position: { lat: 39.9334, lng: 32.8597 } },
      { name: "Sandiv - Ankara - Kızılay", position: { lat: 39.9336, lng: 32.8597 } },
      { name: "Sandiv - Ankara - Keçiören", position: { lat: 39.9837, lng: 32.9107 } },
      { name: "Sandiv - Ankara - Mamak", position: { lat: 39.9761, lng: 32.5684 } },
      { name: "Sandiv - Ankara - Etimesgut", position: { lat: 39.9365, lng: 32.7285 } },

      // İstanbul
      { name: "Sandiv - İstanbul - Kadıköy", position: { lat: 40.9923, lng: 29.0304 } },
      { name: "Sandiv - İstanbul - Beşiktaş", position: { lat: 41.0431, lng: 29.0022 } },
      { name: "Sandiv - İstanbul - Bakırköy", position: { lat: 40.9648, lng: 28.8552 } },
      { name: "Sandiv - İstanbul - Beylikdüzü", position: { lat: 41.0056, lng: 28.6643 } },

      // Diğer şehirler
      { name: "Sandiv - Antalya", position: { lat: 36.8841, lng: 30.7056 } },
      { name: "Sandiv - İzmit", position: { lat: 40.9756, lng: 29.9074 } },
      { name: "Sandiv - Eskişehir", position: { lat: 39.7762, lng: 30.5206 } },
      { name: "Sandiv - Konya", position: { lat: 37.8662, lng: 32.2273 } },
      { name: "Sandiv - Kayseri", position: { lat: 38.7359, lng: 35.4797 } },
      { name: "Sandiv - Denizli", position: { lat: 37.7768, lng: 29.0812 } },
      { name: "Sandiv - Manisa", position: { lat: 38.4625, lng: 27.4286 } },
      { name: "Sandiv - Zonguldak", position: { lat: 41.4552, lng: 31.7983 } },
      { name: "Sandiv - Mersin", position: { lat: 36.7993, lng: 34.6405 } },
      { name: "Sandiv - Diyarbakır", position: { lat: 37.9147, lng: 40.2275 } },
      { name: "Sandiv - Sakarya", position: { lat: 40.7753, lng: 30.4379 } },
      { name: "Sandiv - Gaziantep", position: { lat: 37.0662, lng: 37.3833 } },
    ];

    setLocations(locationsData);
  }, []);

  return (
    <div className="bosluk">
      <div className="restaurantsMainTextDiv-Shadow">
        <div className="restaurantsMainTextDiv">
            <div className="restaurantsMainText">Sandiv Restoranları</div>
        </div>
      </div>

      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ height: '27rem', width: '100%' }}
          center={{ lat: 39.0, lng: 35.0 }}
          zoom={6}
          onLoad={(map) => {
            // Map yüklendiğinde yapılacak işlemler
            console.log(map);
          }}
        >
          {/* Konumlar üzerinde işaretçi (marker) ekliyoruz */}
          {locations.map((location) => (
            <Marker
              key={location.name}
              position={location.position}
              onClick={() => alert(location.name)}  // Burada bir işlem yapabilirsin, örn. bilgi penceresi
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}