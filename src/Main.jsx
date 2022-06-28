import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid } from '@mui/material';
import PlayBox from './components/PlayBox';
import {
  Campuses,
  USASmall,
  BostonSmall,
  PhiladelphiaSmall,
  NewYorkSmall,
  MassachusettsSmall,
} from './assets';

const games = [
  {
    name: 'USA',
    description:
      'Take a tour of universities all across the United States adnadsahdhjikasbdjhkasbdjhkasbd afgbahdfgjhksdfgjkbnsdfj kgnsdfgnsdfgljkn',
    image: USASmall,
    filterId: 'country',
    filterText: 'United States',
    output: [],
  },
  {
    name: 'Massachusetts',
    description: 'Take a tour of universities all across Massachusetts',
    image: MassachusettsSmall,
    filterId: 'state',
    filterText: 'Massachusetts',
    output: [],
  },
  {
    name: 'Boston',
    description: 'Take a tour of universities in the Boston area',
    image: BostonSmall,
    filterId: 'city',
    filterText: 'Boston',
    output: [],
  },
  {
    name: 'Philadelphia',
    description: 'Take a tour of universities in the Philadelphia area',
    image: PhiladelphiaSmall,
    filterId: 'city',
    filterText: 'Philadelphia',
    output: [],
  },
  {
    name: 'New York',
    description: 'Take a tour of universities in the Boston area',
    image: NewYorkSmall,
    filterId: 'state',
    filterText: 'New York',
    output: [],
  },
];

Object.values(Campuses).forEach((campus) => {
  Object.values(games).forEach((game) => {
    if (game.filterText === campus.location[game.filterId]) {
      game.output.push(campus);
    }
  });
});

function Main() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Container justifyContent="center" sx={{ backgroundColor: 'lightGray' }}>
        <br />
        <Grid container justifyContent="center" spacing={4}>
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
                campuses={game.output}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}

export default Main;
