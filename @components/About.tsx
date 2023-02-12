'use client';

import { FunctionComponent } from 'react';
import { filterAtom } from '@/utils/atoms';
import { TECHNOLOGIES as technologies } from '@/utils/constants';
import { useAtom } from 'jotai';
import classNames from 'classnames';

const About: FunctionComponent = () => {
    const [filter, setFilter] = useAtom(filterAtom);
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({
            behavior: 'smooth',
        });
    };
    const handleClick = (tech: string) => {
        if (filter === tech) return setFilter('');
        setFilter(tech);
        scrollToProjects();
    };
    return (
        <div className="flex flex-col py-24">
            <div>
                <h2 className="text-4xl mb-6 font-ubuntuBold">About</h2>
                <p className="mb-4">
                    I&apos;m a software engineer with a passion for building
                    great web applications. I&apos;m currently working at{' '}
                    <a
                        href="https://carimus.com"
                        target={'_blank'}
                        rel="noreferrer"
                        className="font-ubuntuBold text-quinary hover:text-primary"
                    >
                        Carimus
                    </a>
                    . This is a small portfolio site and playground for me to
                    try out new tech. For this project I&apos;ve used:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        Next.js deployed to Vercel - I&apos;m trying out the{' '}
                        <span className="font-bold font-mono">app</span>{' '}
                        directory and React Server Components
                    </li>
                    <li>Tailwind and Styled Components for Styles</li>
                    <li>Joitai for light state management</li>
                    <li>
                        And a few other packages: radix-ui, react-hook-form,
                        classnames, etc. You can check out the source code{' '}
                        <a
                            href="https://github.com/danieldayton33/portfolio"
                            target={'_blank'}
                            rel="noreferrer"
                            className="font-ubuntuBold text-quinary hover:text-primary"
                        >
                            Here
                        </a>{' '}
                    </li>
                </ul>
                <p className="mb-4">
                    I trasitioned into software developmen in 2018 after working
                    as a farmer for over 10 years. For many, this transition may
                    seem pretty drastic, but I&apos;ve found a profession that
                    keeps me engaged every day. I was foucsed predominatly on
                    frontend development during the first few years of my
                    career, but have been working on full stack projects for the
                    last few years.
                </p>
                <p>
                    A lot of the projects on this site are part of my work at{' '}
                    <a
                        href="https://carimus.com"
                        target={'_blank'}
                        rel="noreferrer"
                        className="font-ubuntuBold text-quinary hover:text-primary"
                    >
                        Carimus
                    </a>
                    , where I work with a extremely talented team of designers
                    and developers. I&apos;ve categorized those projects as
                    &quot;Work&quot; and the others as &quot;Personal&quot;, and
                    indicated my role on the project. As part of my role
                    I&apos;m a team lead and manage a team of 3 developers.
                </p>
                <h2 className="text-4xl my-6 font-ubuntuBold">Skills</h2>
                <ul className="grid grid-cols-2 gap-x-6">
                    {technologies.map((tech, i) => (
                        <li key={`tech-${i}`}>
                            <button
                                onClick={() => {
                                    handleClick(tech);
                                }}
                                className={classNames({
                                    'hover:translate-x-3 transition-all duration-500 uppercase tracking-widest':
                                        true,
                                    'text-primary font-ubuntuBold':
                                        filter === tech,
                                })}
                            >
                                {tech}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default About;
