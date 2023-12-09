import { GeistSans } from 'geist/font'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '@/utils/AuthContext';
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Keep',
  description: 'Keep yourself together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
            <AuthProvider>
              {children}
            </AuthProvider>
        </main>
      </body>
    </html>
  )
}
