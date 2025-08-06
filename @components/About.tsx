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
        <div className="flex flex-col pb-24 lg:py-24 text-white">
            <div>
                <h2 className="text-4xl mb-4 font-ubuntuBold banner light">
                    About
                </h2>
                <p className="mb-4">
                    I&apos;ma full-stack software engineer who transformed a 10-year career in farming into a passion-driven path in web development. Since entering tech in 2018, I&apos;ve grown from front-end specialization into full ownership of architecture and delivery across the stack.
                </p>
                   <p className="mb-4">
I build performant, responsive web experiences using React, TypeScript, Next.js, Sass, GraphQL, Node.js, and Express. On the backend, I work with relational and document databases (PostgreSQL, MongoDB), containerization (Docker), CI/CD pipelines, and cloud deployments using AWS.
                </p>
                <p className="mb-4">
                    Currently I&apos;m the lead engineer on the re-platform of a large-scale, multi-tenant SaaS platform. I&apos;ve been loving the product ownership and technical leadership aspects of this role, where I&apos;m responsible for the architecture, design, and implementation of new features.
                    </p>
                <p className="mb-8">
                  Across both professional and personal projects, I focus on craftsmanship, scalability, and thoughtful design. I approach engineering with a problem-solving mindset grounded in real-world resilience — and I bring a steady focus on collaboration, quality, and iteration. I&apos;m now looking to step into leadership, help shape product direction, mentor others, and drive technical excellence.
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
