import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

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
        <Typography>6/25/22</Typography>
        <Button component={NavLink} to="/guess">
          Start Guessing
        </Button>
      </Container>
    </motion.div>
  );
}

export default Main;
