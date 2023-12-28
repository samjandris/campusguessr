'use server';

import { Campus } from '@/lib/types';

import campuses from '@/data/campuses.json';

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
