'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, useEffect, useState } from 'react';
import { X } from 'react-feather';
import classNames from 'classnames';

const Modal = ({
    children,
    triggerTitle = 'Open',
    passedOpen = false,
    extraClasses = '',
    buttonClasses = 'btn btn-primary',
}: {
    children: ReactNode;
    triggerTitle?: string;
    passedOpen?: boolean;
    extraClasses?: string;
    buttonClasses?: string;
}) => {
    const [isOpen, setIsOpen] = useState(passedOpen);
    useEffect(() => {
        setIsOpen(passedOpen);
    }, [passedOpen]);
    return (
        <Dialog.Root open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
            <Dialog.Trigger className={buttonClasses}>
                {triggerTitle}
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content
                className={classNames({
                    'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg':
                        true,
                    [extraClasses]: extraClasses,
                })}
            >
                {children}
                <Dialog.Close>
                    <button className="absolute top-2 right-2">
                        <X />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Modal;
