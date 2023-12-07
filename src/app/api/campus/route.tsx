import Campuses from '@/data/campuses.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.has('filterId') && searchParams.has('filterValue')) {
    const filterId = searchParams.get('filterId');
    const filterValue = searchParams.get('filterValue');

    const filteredCampuses = Campuses.filter((campus) => {
      return (
        campus.location[filterId as keyof typeof campus.location] ===
        filterValue
      );
    });

    return Response.json({ campuses: filteredCampuses });
  }

  return Response.json({ campuses: Campuses });
}
