import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ReactNode } from 'react';
import ReactQueryProvider from '@/app/providers/queryProvider';
import { Toaster } from 'react-hot-toast';

const Layout = async ({
    login,
    births,
}: {
    login: ReactNode;
    births: ReactNode;
}) => {
    const session = await getServerSession(authOptions);
    const view = session?.user ? births : login;
    return (
        <main>
            {session?.user ? (
                <ReactQueryProvider>
                    <Toaster />
                    {view}
                </ReactQueryProvider>
            ) : (
                login
            )}
        </main>
    );
};

export default Layout;
