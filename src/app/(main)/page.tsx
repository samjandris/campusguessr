'use client';

import Game from '@/components/Game';

const modes = [
  {
    name: 'New York',
    image:
      'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'state',
    filterValue: 'new york',
  },
  {
    name: 'Philadelphia',
    image:
      'https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'city',
    filterValue: 'philadelphia',
  },
  {
    name: 'Liberal Arts',
    image:
      'https://images.unsplash.com/photo-1596567181723-ba7d15eacefb?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'type',
    filterValue: 'liberalArts',
  },
  {
    name: 'Medical Schools',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'type',
    filterValue: 'medical',
  },
  {
    name: 'Law Schools',
    image:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'type',
    filterValue: 'law',
  },
  {
    name: 'Ivy League',
    image:
      'https://images.unsplash.com/photo-1623631484725-fef26b75b402?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    filterId: 'type',
    filterValue: 'ivyLeague',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-10 mb-14">CampusGuessr</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {modes.map((mode) => (
          <Game
            key={mode.name}
            data={{
              name: mode.name,
              image: mode.image,
              filterId: mode.filterId,
              filterValue: mode.filterValue,
            }}
          />
        ))}
      </div>
    </div>
  );
}
