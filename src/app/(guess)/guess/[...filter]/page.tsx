'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

import '@/styles/guess.css';

import { filterCampus } from '@/lib/game';

export default function Guess({ params }: { params: { filter: string[] } }) {
  const [data, setData] = useState<{}[]>([]);
  const [bounds, setBounds] = useState<[number, number][]>([]);

  useEffect(() => {
    if (params.filter.length !== 2) return;
    filterCampus(params.filter[0], params.filter[1]).then((resData) => {
      const newBounds: [number, number][] = [];
      Object.values(resData).forEach((point: any) => {
        newBounds.push([point.location.latitude, point.location.longitude]);
      });

      setData(resData);
      setBounds(newBounds);
    });
  }, [params.filter]);

  return (
    <div>
      <h1>Guess</h1>
      <h4>{params.filter[0]}</h4>
      <h4>{params.filter[1]}</h4>

      <div className="h-full">
        {data.length > 0 && (
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
