import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for school
const schoolIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom icon for current position
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const SchoolMap = ({ filteredSchools = [] }) => {
    const hanoiCenter = [21.0285, 105.8542];
    
    // Schools are passed from parent component (MapPage)
    // No need to fetch here - data comes from props
    
    return (
        <MapContainer 
            center={hanoiCenter} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Display schools */}
            {filteredSchools.map((school) => (
                <Marker 
                    key={school.id} 
                    position={[school.latitude, school.longitude]}
                    icon={schoolIcon}
                >
                    <Popup>
                        <div style={{ minWidth: '200px' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
                                {school.name}
                            </h3>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>
                                <strong>Quận/Huyện:</strong> {school.district}
                            </p>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>
                                <strong>Địa chỉ:</strong> {school.address}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            
        </MapContainer>
    );
};

export default SchoolMap;