import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Main from './Main';
import Guess from './Guess';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main location={location} />} />
        <Route path="/guess" element={<Guess location={location} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
