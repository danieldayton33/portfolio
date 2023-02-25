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
    'Laravel',
    'MySQL',
    'DevOps',
    'Git',
    'CI/CD',
];

export const PROJECTS: Project[] = [
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
