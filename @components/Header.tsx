'use client';
import { FunctionComponent } from 'react';
import { useHover } from 'utils/hooks';
import classNames from 'classnames';
import Image from 'next/image';
import Contact from '@components/Contact';

const Header: FunctionComponent = () => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div className="grid lg:grid-cols-3 gap-4 pt-24 lg:py-24 justify-center">
            <div
                //  @ts-ignore
                ref={hoverRef}
                className="relative w-48 h-48 rounded-full bg-primary shadow-2xl"
            >
                <Image
                    src="/dd.jpeg"
                    alt="Daniel Dayton"
                    fill={true}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
            </div>
            <div className="lg:col-span-2">
                <h1
                    className={classNames({
                        'text-8xl transition-all duration-500 font-ubuntuBold':
                            true,
                        'animate-bounce': isHovered,
                    })}
                >
                    Daniel Dayton
                </h1>
                <p className="text-2xl mt-4 pl-2">Software Developer</p>
            </div>
            <div className="lg:col-span-3">
                <Contact />
            </div>
        </div>
    );
};
export default Header;
