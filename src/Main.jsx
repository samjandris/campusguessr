import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const campuses = require('./campuses.json');

const bostonCampus = [];
const philadelphiaCampus = [];

Object.values(campuses).forEach((campus) => {
  if (campus.location.city === 'Boston') {
    bostonCampus.push(campus);
  }

  if (campus.location.city === 'Philadelphia') {
    philadelphiaCampus.push(campus);
  }
});

function Main() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Container>
        <br />
        <Typography>6/27/22</Typography>
        <br />
        <Button
          variant="contained"
          component={Link}
          to="/guess"
          state={{ data: campuses }}
        >
          Start Guessing for All Campuses
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          component={Link}
          to="/guess"
          state={{ data: bostonCampus }}
        >
          Start Guessing for All Campuses in Boston
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          component={Link}
          to="/guess"
          state={{ data: philadelphiaCampus }}
        >
          Start Guessing for All Campuses in Philadelphia
        </Button>
      </Container>
    </motion.div>
  );
}

export default Main;
