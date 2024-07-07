import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import QueryProvider from '@/lib/QueryProvider'
import { AuthProvider } from '@/lib/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Zylo',
	description: 'Zylo is a task management application',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<AuthProvider>
						<QueryProvider>{children}</QueryProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
