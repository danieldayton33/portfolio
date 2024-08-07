'use client';
import { Project } from 'dd-types';
import { useState } from 'react';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Link from 'next/link';
const StyledCard = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    h2 {
        font-size: clamp(1.5rem, 5vw, 2rem);
        margin: 2rem 0 2rem 2rem;
        color: #ffffff;
        position: relative;
        z-index: 1;
        width: fit-content;
        margin-bottom: 3rem;
    }
    h3 {
        text-transform: uppercase;
        font-size: clamp(1rem, 5vw, 1.25rem);
        letter-spacing: 0.2rem;
    }
    border-radius: 0.5rem;
    .button-wrap {
        position: relative;
        z-index: 1;
    }
    .show-details {
        opacity: 0;
        transition: 0.25s;
        position: relative;
        z-index: 1;
    }
    .details {
        background: var(--color-quaternary);
        color: var(--color-quinary);
        padding: 2rem 4rem;
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        top: 0;
        right: -100%;
        transition: 0.5s;
        z-index: 1;
    
    }

    &:hover, &:focus {
        transition: 0.25s;
        .show-details {
            opacity: 1;
            transition: 0.25s;
            transition-delay: 0.25s;
        }
        .details {
            right: 0;
            transition: 0.5s;
        }
    }
    @keyframes wobble {
        0% {
            transform: translateX(0%);
        }
        25% {
            transform: translateX(-3%) rotate(-2deg);
        }
        75% {
            transform: translateX(-2%) rotate(2deg);
        }
        100% {
            transform: translateX(-0.5%) rotate(-1deg);
        }
    }
`;

const Card: FunctionComponent<Project> = ({
    name,
    description,
    url,
    categories,
    technologies,
    image,
    contribution,
    openInNewTab = true,
}) => {
    return (
        <StyledCard className="shadow-2xl bg-tertiary text-quinary" tabIndex={0}>
            <div className="relative h-64 w-full">
                {image && (
                    <Image
                        src={image}
                        alt={name}
                        fill={true}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'top center',
                        }}
                    />
                )}
            </div>
            <h2 className="font-ubuntuBold banner">{name}</h2>
            <p>{description}</p>
            <div
                className={classNames({
                    details: true,
                 
                })}
            >
                {contribution && (
                    <>
                        <h3 className={'font-ubuntuBold mt-4'}>
                            My Contribution
                        </h3>
                        <p className="mt-2">{contribution}</p>
                    </>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                    {categories && categories.length > 0 && (
                        <div>
                            <h3 className={'font-ubuntuBold mt-4'}>
                                Categories
                            </h3>
                            <dl>
                                {categories.map((category, i) => (
                                    <dd key={`category-${i}`}>{category}</dd>
                                ))}
                            </dl>
                        </div>
                    )}
                    {technologies && technologies.length > 0 && (
                        <div>
                            <h3 className={'font-ubuntuBold mt-4'}>
                                Technologies
                            </h3>
                            <dl>
                                {technologies.map((tech, i) => (
                                    <dd key={`tech-${i}`}>{tech}</dd>
                                ))}
                            </dl>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 lg:mt-8 flex justify-between button-wrap flex-col md:flex-row">
                {openInNewTab ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary text-center mt-2"
                        title={`View ${name} in a new tab`}
                    >
                        See Project
                    </a>
                ) : (
                    <Link
                        href={url}
                        title={`View ${name} in a new tab`}
                        className="btn btn-primary text-center mt-2"
                    >
                        See Project
                    </Link>
                )}
            </div>
        </StyledCard>
    );
};

export default Card;
