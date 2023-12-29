'use server';

import { Mode, Campus } from '@/lib/types';

import campuses from '@/data/campuses.json';

const modes: Mode[] = [
  {
    title: 'Countries & Cities',
    data: [
      {
        name: 'United States',
        image:
          'https://images.unsplash.com/photo-1511055882449-bef7ffcedac0?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'country',
        filterValue: 'united states',
      },
      {
        name: 'New York',
        image:
          'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'state',
        filterValue: 'new york',
      },
      {
        name: 'Massachusetts',
        image:
          'https://images.unsplash.com/photo-1602099263268-e8e2df14acfa?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'state',
        filterValue: 'massachusetts',
      },
      {
        name: 'Philadelphia',
        image:
          'https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'city',
        filterValue: 'philadelphia',
      },
    ],
  },
  // {
  //   title: 'Specialty Schools',
  //   data: [
  //     {
  //       name: 'Liberal Arts',
  //       image:
  //         'https://images.unsplash.com/photo-1596567181723-ba7d15eacefb?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       filterId: 'type',
  //       filterValue: 'liberalArts',
  //     },
  //     {
  //       name: 'Medical',
  //       image:
  //         'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       filterId: 'type',
  //       filterValue: 'medical',
  //     },
  //     {
  //       name: 'Law',
  //       image:
  //         'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       filterId: 'type',
  //       filterValue: 'law',
  //     },
  //     {
  //       name: 'Ivy League',
  //       image:
  //         'https://images.unsplash.com/photo-1623631484725-fef26b75b402?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       filterId: 'type',
  //       filterValue: 'ivyLeague',
  //     },
  //   ],
  // },
];

export async function getModes(): Promise<Mode[]> {
  return modes;
}

export async function filterCampus(
  filterId: string,
  filterValue: string
): Promise<Campus[]> {
  const filterIdDecode = decodeURI(filterId).toLowerCase();
  const filterValueDecode = decodeURI(filterValue).toLowerCase();

  const results: Campus[] = [];

  campuses.forEach((campus: any) => {
    if (filterIdDecode === 'type') {
      // TODO: implement type filter
      console.error('type filter not implemented yet');
    } else if (
      campus &&
      campus.location &&
      campus.location[filterIdDecode] &&
      campus.location[filterIdDecode].toLowerCase() === filterValueDecode
    ) {
      results.push(campus);
    }
  });

  return results;
}
