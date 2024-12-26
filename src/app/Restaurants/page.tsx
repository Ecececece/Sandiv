'use client';
import { useEffect, useRef } from "react";
import Head from "next/head";

export default function Restaurant() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const center = { lat: 39.0, lng: 35.0 };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 6,
        center: center,
      });

      const locations = [
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
      
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<h3>${location.name}</h3>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    };

    const loadMapScript = () => {
      if (window.google) {
        initMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (window.google) {
            initMap();
          } else {
            console.error("Google Maps API could not be loaded.");
          }
        };
        document.body.appendChild(script);
      }
    };

    loadMapScript();
  }, []);

  return (
    <div className="bosluk">
      <div className="restaurantsMainTextDiv-Shadow">
        <div className="restaurantsMainTextDiv">
            <div className="restaurantsMainText">Sandiv Restorantları</div>
        </div>
      </div>
      <div ref={mapRef} className="h-homeBanner w-auto"/>
    </div>
  );
}
