'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import './style.css';
import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { GitHub, Linkedin } from 'react-feather';

const Nav: FunctionComponent = () => {
    return (
        <nav className="bg-primary">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white font-ubuntuBold leading-loose hover:text-quaternary"
                        >
                            DD
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="https://www.linkedin.com/in/daniel-dayton-58a97121/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="text-white hover:text-secondary mr-4"
                        >
                            <Linkedin />
                        </a>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="text-white hover:text-secondary focus:outline-quaternary p-1">
                                <GitHub />
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content className="bg-quinary py-2 px-4 flex flex-col rounded mt-2">
                                    <DropdownMenu.Label />
                                    <DropdownMenu.Item>
                                        <a
                                            className="nav-link"
                                            href="https://github.com/danieldayton33"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Personal
                                        </a>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="nav-link"
                                            href="https://github.com/danieldcarimus"
                                        >
                                            Work
                                        </a>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Nav;
