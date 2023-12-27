'use server';

import campuses from '@/data/campuses.json';

// TODO: implement proper return types, including "results"
export async function filterCampus(
  filterId: string,
  filterValue: string
): Promise<{}[]> {
  const filterIdDecode = decodeURI(filterId).toLowerCase();
  const filterValueDecode = decodeURI(filterValue).toLowerCase();

  const results: {
    name: string;
    location: { latitude: number; longitude: number };
  }[] = [];

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
