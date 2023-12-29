import type { Metadata } from 'next';
import { Providers } from '@/components/ui/UIProvider';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/typography.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Oops! The page you are looking for does not exist.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
