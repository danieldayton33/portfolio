import { Project } from 'dd-types';

export const CATEGORIES = [
    'Work',
    'Personal',
    'Open Source,',
    'Headless WordPress',
    'WordPress',
];

export const TECHNOLOGIES = [
    'React',
    'TypeScript',
    'WordPress',
    'GraphQL',
    'Next.js',
    'Sass',
    'Node.js',
    'Express',
    'MongoDB',
    'Mongoose',
    'Docker',
    'AWS',
    'PostgreSQL',
    'PHP',
    'MySQL',
    'DevOps',
    'Git',
    'CI/CD',
];

export const PROJECTS: Project[] = [
    {
        name: "Shiloh's Birthday",
        description:
            'A simple app to time contractions while selecting Spotify playlists for during qnd between contractions.',
        url: '/shiday',
        categories: ['Personal'],
        technologies: ['React', 'TypeScript', 'Next.js'],
        image: '/shidays-birthday.png',
        contribution:
            'WIP: Simple App that authenticates with Spotify, allows the user to select a playlist, and time contractions. Built for my daughter.',
        openInNewTab: false,
    },
    {
        name: 'Wild For All',
        description:
            'A website for a non-profit organization that helps people connect with nature.',
        url: 'https://wildforall.org',
        categories: ['Work', 'Headless WordPress'],
        technologies: [
            'React',
            'TypeScript',
            'WordPress',
            'GraphQL',
            'Next.js',
            'Sass',
            'PHP',
            'MySQL',
        ],
        image: '/wild-for-all.png',
        contribution: 'Lead Developer working with a outside design team.',
    },
    {
        name: 'Quanta Services Website',
        description: 'A website for a Fortune 500 energy company.',
        url: 'https://quantaservices.com',
        categories: ['Work', 'Headless WordPress'],
        technologies: [
            'React',
            'TypeScript',
            'WordPress',
            'GraphQL',
            'Next.js',
            'PHP',
            'MySQL',
        ],
        image: '/quantaservices.png',
        contribution:
            'Lead Developer. This project was a lot of fun. We pushed on animations leveraging GSAP and React Spring.',
    },
    {
        name: 'Jillian Bondarchuk Website',
        description: 'A website for a fantasy writer.',
        url: 'https://bondarchuk-frontend.vercel.app/',
        categories: ['Personal', 'Headless WordPress'],
        technologies: [
            'React',
            'TypeScript',
            'WordPress',
            'GraphQL',
            'Next.js',
            'Express',
        ],
        image: '/jillian-bondarchuk-website.png',
        contribution:
            'Built for a friend. Site has not been fully launched yet.',
    },
    {
        name: 'MCC Website',
        description: 'A multi-lang website for a Fortune 500 label company.',
        url: 'https://www.mcclabel.com/en',
        categories: ['Work', 'Headless WordPress'],
        technologies: [
            'React',
            'TypeScript',
            'WordPress',
            'GraphQL',
            'Next.js',
            'Express',
        ],
        image: '/mcc-image.png',
        contribution:
            'This as a migration from Drupal. Another team member at Carimus handled the migration. I build out the frontend. This project leveraged tailwind.',
    },
    {
        name: 'Carimus Website',
        description: 'A website for a software development company.',
        url: 'https://carimus.com',
        categories: ['Work', 'Headless WordPress'],
        technologies: [
            'React',
            'TypeScript',
            'WordPress',
            'GraphQL',
            'Next.js',
        ],
        image: '/carimus-website.png',
        contribution:
            'About 50% of the code on this one. This was our first Headless WordPress site. I did the rocket animation /what-we-do.',
    },
    {
        name: 'Carimus Portal',
        description:
            'A portal for a software development company. At this point it is for internal use only. Current functionality includes: synching deals with Pipedrive, user managment, quarter revenue estimation.',
        url: 'https://carimus-dashboard.vercel.app/',
        categories: ['Work'],
        technologies: [
            'React',
            'TypeScript',
            'Node.js',
            'Express',
            'PostgreSQL',
            'Docker',
            'Next.js',
        ],
        image: '/carimus-portal.png',
        contribution:
            'Lead Developer. Leveraged next-auth for authentication, prisma for ORM, react-able for tables, and tailwind for styles.',
    },
];
