'use client';
import { Project } from 'dd-types';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
const StyledCard = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    h2 {
        font-size: clamp(1.5rem, 5vw, 2rem);
        margin-top: 2rem;
        color: var(--color-quaternary);
    }
    h3 {
        text-transform: uppercase;
        font-size: clamp(1rem, 5vw, 1.25rem);
        margin: 2rem 0 1rem;
        letter-spacing: 0.2rem;
    }
    border-radius: 0.5rem;
`;

const Card: FunctionComponent<Project> = ({
    name,
    description,
    url,
    categories,
    technologies,
    image,
}) => {
    return (
        <StyledCard className="shadow-2xl bg-tertiary text-quinary">
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
            <h2 className="font-ubuntuBold">{name}</h2>
            <p>{description}</p>
            <div className="grid grid-cols-2 gap-4">
                {categories && categories.length > 0 && (
                    <div>
                        <h3 className={'font-ubuntuBold'}>Categories</h3>
                        <dl>
                            {categories.map((category, i) => (
                                <dd key={`category-${i}`}>{category}</dd>
                            ))}
                        </dl>
                    </div>
                )}
                {technologies && technologies.length > 0 && (
                    <div>
                        <h3 className={'font-ubuntuBold'}>Technologies</h3>
                        <dl>
                            {technologies.map((tech, i) => (
                                <dd key={`tech-${i}`}>{tech}</dd>
                            ))}
                        </dl>
                    </div>
                )}
            </div>
            <div className="mt-8">
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                >
                    See Project
                </a>
            </div>
        </StyledCard>
    );
};

export default Card;
