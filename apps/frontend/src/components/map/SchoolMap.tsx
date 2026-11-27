'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { School } from '@/lib/types';

// Marker images are served from /public (copied from leaflet 1.9.4), not from a CDN (NFR-054).
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface SchoolMapProps {
  filteredSchools: School[];
}

export default function SchoolMap({ filteredSchools }: SchoolMapProps) {
  const center: [number, number] = [21.0285, 105.8542];

  return (
    <MapContainer center={center} zoom={12} style={{ width: '100%', height: '100%' }} scrollWheelZoom>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {filteredSchools.map(school => school.latitude && school.longitude && (
        <Marker key={school.id} position={[school.latitude, school.longitude]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-sm">{school.name}</h3>
              <p className="text-xs text-gray-500">{school.address}</p>
              {school.district && <p className="text-xs text-gray-400">{school.district}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
