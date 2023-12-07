'use server';

import campuses from '@/data/campuses.json';

export async function getCampuses(
  filterId: string | null = null,
  filterValue: string | null = null
) {
  let filteredCampuses = campuses;

  if (filterId && filterValue) {
    filteredCampuses = campuses.filter((campus) => {
      return (
        campus.location[filterId as keyof typeof campus.location] ===
        filterValue
      );
    });
  }

  return filteredCampuses;
}
