import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CssBaseline } from '@mui/material';
import Main from './Main';
import Guess from './Guess';

const theme = createTheme({
  palette: {
    background: {
      default: '#c0c8d5',
    },
  },
});

function App() {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main location={location} />} />
          <Route path="/guess" element={<Guess location={location} />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
