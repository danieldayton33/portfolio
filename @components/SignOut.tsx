'use client';

import { signOut } from 'next-auth/react';
const SignOut = () => {
    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() =>
                    signOut({
                        callbackUrl: '/shiday',
                    })
                }
            >
                Sign Out
            </button>
        </div>
    );
};

export default SignOut;
