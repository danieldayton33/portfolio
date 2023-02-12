import './globals.css';
import { ubuntuNormal, ubuntuBold } from '@/utils/fonts';
import Nav from '@components/Nav';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body
                className={`${ubuntuBold.variable} ${ubuntuNormal.variable} ${ubuntuNormal.className} `}
            >
                <Nav />
                {children}
                <footer>
                    <Nav />
                </footer>
            </body>
        </html>
    );
}
