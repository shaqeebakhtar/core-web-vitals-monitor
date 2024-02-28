import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import Providers from './providers';

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
        <body className={GeistSans.className}>
          {children}
          <Toaster richColors closeButton />
        </body>
      </Providers>
    </html>
  );
}
