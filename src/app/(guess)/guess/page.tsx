import { Suspense } from 'react';
import GuessPage from './Guess';

export default function GuessServer() {
  return (
    <Suspense>
      <GuessPage />
    </Suspense>
  );
}
