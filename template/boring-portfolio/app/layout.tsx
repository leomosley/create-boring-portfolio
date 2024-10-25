import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Portfolio • ${process.env.GITHUB_USERNAME}`,
  description: 'Boring portfolio',
  icons: {
    icon: '/icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex flex-col p-6 mx-auto max-w-2xl'>
          <Header />
          {children}
          <Footer />
        </main>
      </body>

    </html>
  );
}
