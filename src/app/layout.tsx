import type { Metadata } from 'next'
import { Inter, Montserrat, EB_Garamond } from 'next/font/google'
import './globals.scss'
import React from 'react'
import { Providers } from '@/app/providers'
import { Theme } from '@radix-ui/themes'
import { UserProvider } from './context/userContext'
import { MeetProvider } from './context/meetContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-eb-garamond',
})

export const metadata: Metadata = {
  title: 'Понятная практика',
  description: 'Best Project Ever',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} ${ebGaramond.variable} antialiased`}>
        <Providers>
          <Theme>
            <UserProvider>
              <MeetProvider>
                {children}
                <ToastContainer
                  position="top-right"
                  closeOnClick
                  autoClose={3000}
                  hideProgressBar
                  draggable
                  theme="light"
                  limit={10}
                />
              </MeetProvider>
            </UserProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
