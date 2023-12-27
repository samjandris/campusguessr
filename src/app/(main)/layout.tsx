import { Metadata } from 'next';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'CampusGuessr',
  description: 'Guess the campus!',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <NavBar /> */}
      {children}
    </div>
  );
}
