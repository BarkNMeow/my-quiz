import './globals.css'
import Link from 'next/link';
import { Noto_Sans_KR } from 'next/font/google'
import DarkModeToggle from '@/components/DarkModeToggle';

const notosans = Noto_Sans_KR({
    weight: ['400', '500', '700'],
    subsets: ['latin']
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="w-dvw h-dvh">
            <body className={`overflow-y-auto overflow-x-hidden w-full max-w-4xl h-full mx-auto bg-white dark:bg-stone-900 text-black dark:text-stone-300 transition-colors duration-500 ${notosans.className}`}>
                <nav className="flex justify-start px-6 py-4 items-center">
                    <NavLink href="/solve">Solve</NavLink>
                    <div className="w-6"></div>
                    <NavLink href="/add">Add</NavLink>
                    <div className="mr-auto"></div>
                    <DarkModeToggle />
                </nav>
                <main className="px-6 py-4">
                    {children}
                </main>
            </body>
        </html>
    );
}

function NavLink(props: {
    href: string
    children?: Readonly<React.ReactNode>
}) {
    const { href, children } = props
    return (
        <Link href={href}>
            <div className="text-lg">
                {children}
            </div>
        </Link>
    )
}