'use client';
import { FunctionComponent } from 'react';
import { useHover } from 'utils/hooks';
import classNames from 'classnames';
import Image from 'next/image';

const Header: FunctionComponent = () => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div className="flex flex-col items-center justify-center py-16">
            {/* @ts-ignore */}
            <div ref={hoverRef}>
                <Image
                    src="/dd.jpeg"
                    alt="Daniel Dayton"
                    width={250}
                    height={300}
                    className="rounded-full shadow-2xl hover:scale-105 transition-all duration-500"
                />
            </div>

            <h1
                className={classNames({
                    'text-6xl mt-12 transition-all duration-500 font-ubuntuBold':
                        true,
                    'animate-bounce': isHovered,
                })}
            >
                Daniel Dayton
            </h1>
            <p className="text-2xl mt-4">Software Developer</p>
        </div>
    );
};
export default Header;
