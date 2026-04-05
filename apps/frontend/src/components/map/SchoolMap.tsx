'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { School } from '@/lib/types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface SchoolMapProps {
  filteredSchools: School[];
}

export default function SchoolMap({ filteredSchools }: SchoolMapProps) {
  const center: [number, number] = [21.0285, 105.8542];

  return (
    <MapContainer center={center} zoom={12} style={{ width: '100%', height: '100%' }} scrollWheelZoom>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
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
