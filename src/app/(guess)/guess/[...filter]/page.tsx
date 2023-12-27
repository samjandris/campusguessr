'use client';

import dynamic from 'next/dynamic';
import '@/styles/guess.css';
import { useEffect, useState } from 'react';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

export default function Guess({ params }: { params: { filter: string[] } }) {
  const [data, setData] = useState([
    { location: { latitude: 23, longitude: 24 } },
    { location: { latitude: 27, longitude: 28 } },
    { location: { latitude: 31, longitude: 35 } },
  ]);
  const [loaded, setLoaded] = useState(false);

  const bounds: [number, number][] = [];
  Object.values(data).forEach((point) => {
    bounds.push([point.location.latitude, point.location.longitude]);
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div>
      <h1>Guess</h1>
      <h4>{params.filter[0]}</h4>
      <h4>{params.filter[1]}</h4>

      <div className="h-screen">
        {loaded && (
          <LeafletMap
            locations={data}
            bounds={bounds}
            onClick={() => {
              console.log('clicked on map');
            }}
          />
        )}
      </div>
    </div>
  );
}
