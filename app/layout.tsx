
import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import { Toaster } from 'sonner';
import { SessionProvider } from 'next-auth/react';
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider";
import { auth } from '@/next-auth';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'قلم',
  description: 'بوابة المعرفة',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const session = await auth();

  return (
    <html lang="en">
      <body className={tajawal.className}>
      <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="qalam-theme"
          >
            <Toaster theme="light" position="bottom-center" />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>

  )
}
