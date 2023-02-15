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
    'Sequelize',
    'PHP',
    'Laravel',
    'MySQL',
    'HTML',
    'CSS',
    'JavaScript',
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
];
