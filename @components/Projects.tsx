'use client';
import { FunctionComponent, useState, useEffect } from 'react';
import {
    PROJECTS as projects,
    TECHNOLOGIES as technologies,
} from '@/utils/constants';
import styled from 'styled-components';
import Card from './Card';
import { useAtom } from 'jotai';
import { filterAtom } from '@/utils/atoms';
import classNames from 'classnames';

const Projects: FunctionComponent = () => {
    const [filter, setFilter] = useAtom(filterAtom);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    console.log('filter', filter);

    useEffect(() => {
        if (!filter) return setFilteredProjects(projects);
        const filtered = projects.filter((project) => {
            return project.technologies.some((tect) => tect === filter);
        });
        setFilteredProjects(filtered);
    }, [filter]);
    const handleClick = (tech: string) => {
        if (filter === tech) return setFilter('');
        setFilter(tech);
    };

    return (
        <div className="py-32">
            <h2 className="text-4xl mb-4 font-ubuntuBold">Projects</h2>
            <div className="grid lg:grid-cols-10 gap-12">
                <StyledFilters className="lg:col-span-2  relative flex flex-col">
                    <h3 className="font-ubuntuBold text-2xl mb-4">
                        Filter by:
                    </h3>

                    {technologies.map((tech, i) => {
                        const isActive = filter === tech;
                        return (
                            <button
                                className={classNames({
                                    ['active']: isActive,
                                    'hover:translate-x-3 transition-all duration-500 text-quinary uppercase tracking-widest':
                                        true,
                                })}
                                key={`tech-${i}`}
                                onClick={() => {
                                    handleClick(tech);
                                }}
                            >
                                {tech}
                            </button>
                        );
                    })}
                </StyledFilters>
                <div className="lg:col-span-8">
                    <div
                        className={classNames({
                            'grid grid-cols-1 h-full': true,
                            'lg:grid-cols-2  gap-12':
                                filteredProjects.length > 0,
                        })}
                    >
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, i) => (
                                <Card
                                    key={JSON.stringify(project)}
                                    {...project}
                                />
                            ))
                        ) : (
                            <div className="mx-0 flex flex-col items-center justify-center w-full h-full">
                                <h3 className="font-ubuntuBold text-3xl mb-8 text-center max-w-2xl">
                                    Nothing here yet. I assure you I've worked
                                    with this stack before. I'm still adding
                                    projects to this site.
                                </h3>
                                <button
                                    className="btn text-center"
                                    onClick={() => setFilter('')}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledFilters = styled.div`
    button {
        transform: translateX(0%);
        transition: all 0.5s ease-in-out;
        text-align: left;
        &.active {
            transform: translateX(50%);
            transition: all 0.5s ease-in-out;
        }
    }
`;

export default Projects;
