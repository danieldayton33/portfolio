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
        <div className="flex flex-col py-16">
            <div>
                <h2 className="text-4xl mb-6 font-ubuntuBold">About</h2>
                <p className="mb-4">
                    I&apos;m a software engineer with a passion for building
                    great web applications. I&apos;m currently working at{' '}
                    <a
                        href="https://carimus.com"
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        Carimus
                    </a>
                    . Carimus is an amazing company to work for. We have an
                    extremely talented team of designers and developers. We are
                    always learning and growing as a team. I&apos;m very excited
                    to be a part of such a great team.
                </p>
                <p>
                    I trasitioned into software development after working as a
                    farmer over 10 years. For many, this transition may seem
                    pretty drastic, but I&apos;ve found a passion for software
                    development that I never knew I had. I love the problem
                    solving aspect of software development. I also love the fact
                    that there is always something new to learn. I&apos;m always
                    excited to learn new technologies and improve my skills.
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
