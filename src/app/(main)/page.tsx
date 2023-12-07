import React from 'react';
import { Container, Grid } from '@mui/material';
import PlayBox from '@/components/PlayBox';
// import {
//   // USASmall,
//   BostonSmall,
//   PhiladelphiaSmall,
//   NewYorkSmall,
//   MassachusettsSmall,
// } from '@/assets/images';

const games: {
  name: string;
  description: string;
  image: string;
  filterId: string;
  filterText: string;
}[] = [
  {
    name: 'USA',
    description: 'Take a tour of universities all across the United States',
    image:
      'https://campusguessr.com/static/media/usa-small.5539698b9a09a3e23541.jpg',
    filterId: 'country',
    filterText: 'United States',
  },
  {
    name: 'Massachusetts',
    description:
      'Travel to the state of Massachusetts and walk through at its universities',
    image:
      'https://campusguessr.com/static/media/massachusetts-small.73da9d20f1bc7aecf8b2.jpg',
    filterId: 'state',
    filterText: 'Massachusetts',
  },
  {
    name: 'Boston',
    description:
      'Travel to the iconic city of Boston and take a guess at some of its most famous univerisities',
    image:
      'https://campusguessr.com/static/media/boston-small.b098213c09adace30b8e.jpg',
    filterId: 'city',
    filterText: 'Boston',
  },
  {
    name: 'Philadelphia',
    description: 'Take a tour of universities in the Philadelphia area',
    image:
      'https://campusguessr.com/static/media/philadelphia-small.8ea1b937b439c7e921a0.jpg',
    filterId: 'city',
    filterText: 'Philadelphia',
  },
  {
    name: 'New York',
    description: 'Explore universities all throughout New York State',
    image:
      'https://campusguessr.com/static/media/new-york-small.187963b0671b93422454.jpg',
    filterId: 'state',
    filterText: 'New York',
  },
];

export default function HomePage() {
  return (
    <Container>
      {/* <Typography variant="h3" sx={{ mt: 10, mb: 2 }}>
        Featured
      </Typography> */}
      <Grid container justifyContent="center" spacing={4} sx={{ mt: 4 }}>
        {games.map((game) => (
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            lg={3}
            key={game.name}
            sx={{
              display: 'flex',
            }}
          >
            <PlayBox
              name={game.name}
              description={game.description}
              image={game.image}
              filterId={game.filterId}
              filterValue={game.filterText}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
