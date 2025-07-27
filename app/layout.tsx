import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: 'Will Green - %s',
    default: 'Will Green - Product Designer',
  },
  description: 'Product Designer based in Bristol, UK. Currently at Ravelin building fraud prevention software.',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#a3e635',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Favicon and Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#a3e635" />
      </head>
      <body className="font-inter">
                 <ThemeProvider
           attribute="class"
           defaultTheme="light"
           enableSystem={false}
           disableTransitionOnChange
         >
           {children}
         </ThemeProvider>
         <Analytics />
       </body>
    </html>
  )
}
