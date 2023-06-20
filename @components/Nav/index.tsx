import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import './style.css';
import { FunctionComponent } from 'react';
import { Linkedin } from 'react-feather';
import GitHubDropdown from '@/@components/GitHubDropdown';

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
                        <GitHubDropdown />
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Nav;
