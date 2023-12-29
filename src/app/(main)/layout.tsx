import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CampusGuessr',
  description: 'Guess the campus!',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
