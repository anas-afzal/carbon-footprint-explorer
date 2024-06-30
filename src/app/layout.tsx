import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carbon Footprint Explorer',
  description: 'Generated by create next app',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>): JSX.Element => {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;