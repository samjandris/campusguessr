'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

export default function LeafletMap({
  locations,
  bounds,
  onClick,
}: {
  locations: any[];
  bounds: [number, number][];
  onClick: (uniName: string) => void;
}) {
  function MapClickComponent() {
    useMapEvents({
      click: () => {
        onClick('');
      },
    });

    return null;
  }

  return (
    <MapContainer
      bounds={bounds}
      scrollWheelZoom
      style={{ height: '100%', width: '100%', zIndex: 99 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(
        (uni: {
          name: string;
          location: { latitude: number; longitude: number };
        }) => (
          <div key={uni.name}>
            <Marker
              position={[uni.location.latitude, uni.location.longitude]}
              eventHandlers={{
                click: () => {
                  onClick(uni.name);
                },
              }}
            >
              <Tooltip
                direction="right"
                offset={[0, 0]}
                opacity={0.65}
                permanent
              >
                {uni.name}
              </Tooltip>
            </Marker>
            <MapClickComponent />
          </div>
        )
      )}
    </MapContainer>
  );
}
