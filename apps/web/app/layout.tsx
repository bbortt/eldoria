import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import RouterTransition from '@/layout/router-transition';

import { Providers } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Chronicles of Eldoria',
  description: 'The Shadowed Realm',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <RouterTransition>
            <main className="main text-foreground bg-background"> {children}</main>
          </RouterTransition>
        </Providers>
      </body>
    </html>
  );
}
