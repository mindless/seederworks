import type { Metadata } from 'next'
import { montserrat, inter } from '@/lib/fonts'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invstor X - Framer Template',
  description:
    'Introducing Invstor X, a cutting-edge investor Framer Template designed for venture capital firms and angel investors seeking a stunning website.',
  keywords: ['investment', 'venture capital', 'startup', 'funding', 'investors'],
  authors: [{ name: 'Invstor X' }],
  openGraph: {
    title: 'Invstor X - Framer Template',
    description:
      'Introducing Invstor X, a cutting-edge investor Framer Template designed for venture capital firms and angel investors seeking a stunning website.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invstor X - Framer Template',
    description:
      'Introducing Invstor X, a cutting-edge investor Framer Template designed for venture capital firms and angel investors seeking a stunning website.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
