import { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

export type Props = {
  coordinates: [number, number];
};

export default function Map({ coordinates }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const ref = mapRef.current;

      import('leaflet').then((L) => {
        const map = L.map(ref).setView(coordinates, 20);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const hqMarker = L.marker(coordinates).addTo(map);
        hqMarker
          .bindPopup(
            '<strong>Stichting Watershed</strong><br/>Pand P<br/>Leenderweg 65, <br/>5614 HL Eindhoven',
          )
          .openPopup();
      });
    }
  }, [coordinates]);

  return (
    <div className="w-full aspect-video bg-gray-200">
      <div ref={mapRef} id="map" className="w-full h-full"></div>
    </div>
  );
}
