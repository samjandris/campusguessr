import { ReactNode } from 'react';

export const metadata = {
  title: 'CampusGuessr - Guess',
  description: 'Guess the campus from the video',
};

export default function GuessLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
