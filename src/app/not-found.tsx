import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6">
          Oops! The page you are looking for does not exist.
        </Typography>
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          It might have been moved or deleted.
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
