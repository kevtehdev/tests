import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Next.js 14 Learning Platform',
  description: 'Learn Next.js 14 through interactive lessons and tests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Navigation />
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
