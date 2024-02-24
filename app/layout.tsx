import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Providers from './providers';

export const switzer = localFont({
  src: '../styles/fonts/Switzer-Variable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Core Web Vitals Monitor | Lighthouse Metrics',
  description:
    'Never let your users experience a slow website. Get alerts when the core web vitals score fails.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={switzer.className}>{children}</body>
      </Providers>
    </html>
  );
}
