'use client';

import dynamic from 'next/dynamic';
import '@/styles/guess.css';
import { useEffect, useState } from 'react';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

export default function Guess({ params }: { params: { filter: string[] } }) {
  const [data, setData] = useState([
    { name: 'test1', location: { latitude: 23, longitude: 24 } },
    { name: 'test2', location: { latitude: 27, longitude: 28 } },
    { name: 'test3', location: { latitude: 31, longitude: 35 } },
  ]);
  const [mounted, setMounted] = useState(false);

  const bounds: [number, number][] = [];
  Object.values(data).forEach((point) => {
    bounds.push([point.location.latitude, point.location.longitude]);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <h1>Guess</h1>
      <h4>{params.filter[0]}</h4>
      <h4>{params.filter[1]}</h4>

      <div className="h-full">
        {mounted && (
          <div className="absolute right-5 bottom-5 w-[250px] h-[200px] opacity-50 hover:w-[600px] hover:h-[500px] hover:opacity-100 transition-all overflow-hidden">
            <LeafletMap
              locations={data}
              bounds={bounds}
              onClick={() => {
                console.log('clicked on map');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
