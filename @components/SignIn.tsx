'use client';

import { FunctionComponent } from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { signIn } from 'next-auth/react';

const SignIn: FunctionComponent = () => {
    const { providers } = authOptions;
    return (
        <div>
            {providers &&
                providers?.length > 0 &&
                providers.map((provider) => {
                    return (
                        <div key={provider.name}>
                            <button
                                className={'btn btn-primary'}
                                onClick={() =>
                                    signIn(provider.id, {
                                        callbackUrl: '/shiday',
                                    })
                                }
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default SignIn;
