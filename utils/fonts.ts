import { Ubuntu } from '@next/font/google';

const ubuntuNormal = Ubuntu({
    weight: '400',
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-ubuntu-normal',
});

const ubuntuBold = Ubuntu({
    weight: '700',
    style: 'normal',
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-ubuntu-bold',
});

export { ubuntuNormal, ubuntuBold };
