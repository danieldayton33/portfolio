import './globals.css';
import 'styles/index.scss';
import { ubuntuNormal, ubuntuBold } from '@/utils/fonts';
import Nav from '@components/Nav';
import GoogleAnalytics from '@/@components/GoogleAnaylitics';
import { Analytics } from '@vercel/analytics/react';

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
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                    <GoogleAnalytics
                        ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
                    />
                ) : null}
                <Nav />
                {children}
                <Analytics />
                <footer>
                    <Nav />
                </footer>
            </body>
        </html>
    );
}
