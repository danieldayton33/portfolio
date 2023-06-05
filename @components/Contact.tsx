import { FunctionComponent } from 'react';

const Contact: FunctionComponent = () => {
    return (
        <div className="flex flex-col w-full relative">
            <h3 className="text-3xl mt-12 mb-4 font-ubuntuBold banner light">
                Contact
            </h3>
            <p className="my-8 max-w-md">
                Intrested in getting in touch? Drop me a line! I&apos;d love to
                hear from you.
            </p>
            <div>
                <a
                    href="mailto:danieldayton33@gmail.com"
                    className="mb-4 btn btn-primary"
                >
                    Hit Me Up
                </a>
            </div>
        </div>
    );
};

export default Contact;
