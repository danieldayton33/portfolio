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
        <div className="flex flex-col pb-24 lg:py-24">
            <div>
                <h2 className="text-4xl mb-4 font-ubuntuBold banner light">
                    About
                </h2>
                <p className="mb-4">
                    I&apos;m a software engineer with a passion for building
                    great web applications.
                </p>
                <p className="mb-4">
                    I transitioned into software development in 2018 after
                    working as a farmer for over 10 years. For many, this
                    transition may seem pretty drastic, but I&apos;ve found a
                    profession that keeps me engaged every day. I was focused
                    predominately on frontend development during the first few
                    years of my career, but have been working on full stack
                    projects for the last few years.
                </p>
                <p className="mb-8">
                    I&apos;ve included both work and personal projects on this site.
                    I&apos;ve categorized work
                    projects as &quot;Work&quot;,and indicated my role on the
                    project, and the others as &quot;Personal&quot;.
                </p>
                <h2 className="text-4xl my-4 font-ubuntuBold banner light">
                    Skills
                </h2>
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
