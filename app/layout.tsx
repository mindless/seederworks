import type { Metadata } from 'next'
import { montserrat, inter } from '@/lib/fonts'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'SeederWorks - AI Venture Studio & Fund',
  description:
    'SeederWorks is an AI Venture Studio & Fund. We seed, build, and scale high-potential companies across Southeast Asia—faster, smarter, founder-first.',
  keywords: ['venture studio', 'ai', 'startup', 'funding', 'southeast asia', 'founders'],
  authors: [{ name: 'SeederWorks' }],
  openGraph: {
    title: 'SeederWorks - AI Venture Studio & Fund',
    description:
      'SeederWorks is an AI Venture Studio & Fund. We seed, build, and scale high-potential companies across Southeast Asia—faster, smarter, founder-first.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeederWorks - AI Venture Studio & Fund',
    description:
      'SeederWorks is an AI Venture Studio & Fund. We seed, build, and scale high-potential companies across Southeast Asia—faster, smarter, founder-first.',
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
