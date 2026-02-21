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
      {
        name: 'Boston',
        image:
          'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'city',
        filterValue: 'boston',
      },
    ],
  },
  {
    title: 'County Clash',
    data: [
      {
        name: 'Suffolk County',
        image:
          'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'county',
        filterValue: 'suffolk county',
      },
      {
        name: 'Middlesex County',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'county',
        filterValue: 'middlesex county',
      },
      {
        name: 'Norfolk County',
        image:
          'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'county',
        filterValue: 'norfolk county',
      },
      {
        name: 'Providence County',
        image:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'county',
        filterValue: 'providence county',
      },
      {
        name: 'Hampshire County',
        image:
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'county',
        filterValue: 'hampshire county',
      },
    ],
  },
  {
    title: 'Campus Name Challenge',
    data: [
      {
        name: 'State University Showdown',
        image:
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'namePattern',
        filterValue: 'state-university',
      },
      {
        name: 'University of ...',
        image:
          'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'namePattern',
        filterValue: 'university-of',
      },
      {
        name: 'College Crew',
        image:
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'namePattern',
        filterValue: 'college',
      },
      {
        name: 'Tech Trail',
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'namePattern',
        filterValue: 'tech',
      },
    ],
  },
  {
    title: 'Latitude Ladder',
    data: [
      {
        name: 'Northern Arc',
        image:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'latitudeBand',
        filterValue: 'northern-arc',
      },
      {
        name: 'Mid-Latitude Mix',
        image:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'latitudeBand',
        filterValue: 'mid-latitude',
      },
      {
        name: 'Sunbelt Sprint',
        image:
          'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'latitudeBand',
        filterValue: 'sunbelt-sprint',
      },
    ],
  },
  {
    title: 'Longitude Leagues',
    data: [
      {
        name: 'Atlantic Corridor',
        image:
          'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'longitudeBand',
        filterValue: 'atlantic-corridor',
      },
      {
        name: 'Central Corridor',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'longitudeBand',
        filterValue: 'central-corridor',
      },
      {
        name: 'Pacific Expedition',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'longitudeBand',
        filterValue: 'pacific-expedition',
      },
    ],
  },
  {
    title: 'Chaos Mode',
    data: [
      {
        name: 'Everything Everywhere',
        image:
          'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        filterId: 'all',
        filterValue: 'all',
      },
    ],
  },
];

export async function getModes(): Promise<Mode[]> {
  return modes;
}

function matchesNamePattern(campusName: string, filterValueDecode: string): boolean {
  switch (filterValueDecode) {
    case 'state-university':
      return campusName.includes('state university');
    case 'university-of':
      return campusName.startsWith('university of ');
    case 'college':
      return campusName.includes('college');
    case 'tech':
      return (
        campusName.includes('technology') ||
        campusName.includes('tech') ||
        campusName.includes('polytechnic')
      );
    default:
      return false;
  }
}

function matchesLatitudeBand(latitude: unknown, filterValueDecode: string): boolean {
  if (typeof latitude !== 'number') return false;

  switch (filterValueDecode) {
    case 'northern-arc':
      return latitude >= 42;
    case 'mid-latitude':
      return latitude >= 37 && latitude < 42;
    case 'sunbelt-sprint':
      return latitude < 37;
    default:
      return false;
  }
}

function matchesLongitudeBand(
  longitude: unknown,
  filterValueDecode: string
): boolean {
  if (typeof longitude !== 'number') return false;

  switch (filterValueDecode) {
    case 'atlantic-corridor':
      return longitude > -80;
    case 'central-corridor':
      return longitude <= -80 && longitude > -100;
    case 'pacific-expedition':
      return longitude <= -100;
    default:
      return false;
  }
}

export async function filterCampus(
  filterId: string,
  filterValue: string
): Promise<Campus[]> {
  const filterIdDecode = decodeURI(filterId).toLowerCase();
  const filterValueDecode = decodeURI(filterValue).toLowerCase();

  if (filterIdDecode === 'all') {
    return campuses as Campus[];
  }

  const results: Campus[] = [];

  campuses.forEach((campus: any) => {
    if (
      filterIdDecode === 'namepattern' &&
      matchesNamePattern(campus.name.toLowerCase(), filterValueDecode)
    ) {
      results.push(campus);
      return;
    }

    if (
      filterIdDecode === 'latitudeband' &&
      matchesLatitudeBand(campus?.location?.latitude, filterValueDecode)
    ) {
      results.push(campus);
      return;
    }

    if (
      filterIdDecode === 'longitudeband' &&
      matchesLongitudeBand(campus?.location?.longitude, filterValueDecode)
    ) {
      results.push(campus);
      return;
    }

    const locationFieldValue = campus?.location?.[filterIdDecode];
    if (
      typeof locationFieldValue === 'string' &&
      locationFieldValue.toLowerCase() === filterValueDecode
    ) {
      results.push(campus);
    }
  });

  return results;
}
