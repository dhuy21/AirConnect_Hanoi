import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon cho trường học
const schoolIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom icon cho vị trí hiện tại
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={userIcon}>
            <Popup>Vị trí của bạn</Popup>
        </Marker>
    );
};

const SchoolMap = () => {
    const hanoiCenter = [21.0285, 105.8542];
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch danh sách trường từ API
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/schools');
                if (!response.ok) {
                    throw new Error('Không thể tải danh sách trường học');
                }
                const data = await response.json();
                setSchools(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching schools:', err);
            }
        };

        fetchSchools();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải bản đồ...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;
    }
    
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
            
            {/* Hiển thị tất cả các trường học */}
            {schools.map((school) => (
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
                                <strong>Loại:</strong> {school.school_type}
                            </p>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>
                                <strong>Quận/Huyện:</strong> {school.district}
                            </p>
                            <p style={{ margin: '5px 0', fontSize: '13px' }}>
                                <strong>Địa chỉ:</strong> {school.address}
                            </p>
                            {school.phone && (
                                <p style={{ margin: '5px 0', fontSize: '13px' }}>
                                    <strong>Điện thoại:</strong> {school.phone}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
            
            <LocationMarker />
        </MapContainer>
    );
};

export default SchoolMap;