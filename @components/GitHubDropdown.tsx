'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GitHub } from 'react-feather';

const GitHubDropdown = () => {
    return (
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
    );
};

export default GitHubDropdown;
