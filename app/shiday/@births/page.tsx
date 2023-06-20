import SignOut from '@/@components/SignOut';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import prisma from '@/utils/prisma';
import { User, Birth } from '@prisma/client';
import Link from 'next/link';
import BirthForm from '@/@components/BirthForm';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import { Hydrate } from '@tanstack/react-query';
import Births from '@/@components/Births';
import Name from '@/@components/Name';
import NextAuthSessionProvider from '@/app/providers/sessionProvider';

export type UserWithBirths = User & {
    Births: Birth[];
};

async function fetchDbUser(): Promise<UserWithBirths | null> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    const { email, name } = session.user;
    if (!email) return null;
    return prisma.user
        .findUnique({
            where: {
                email: email,
            },
            include: {
                Births: true,
            },
        })
        .then((user) => {
            if (!user) {
                prisma.user
                    .create({
                        data: {
                            email: email,
                            name: name,
                        },
                    })
                    .then((user) => {
                        return user;
                    })
                    .catch((err) => {
                        console.log(err);
                        return err;
                    });
            }
            return user;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const BirthsPage = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['me'], () => fetchDbUser());
    const dehydratedState = dehydrate(queryClient);
    return (
        <Hydrate state={dehydratedState}>
            <NextAuthSessionProvider>
                <main>
                    <section className="bg-tertiary shadow-b-2xl px-4 lg:px-0">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 gap-12 py-12">
                                <div className="flex justify-between items-center">
                                    <Name />
                                    <SignOut />
                                </div>
                                <p>
                                    This is a simple app to play music during
                                    contractions. Select a playlist for during
                                    contractions and between.
                                </p>
                                <BirthForm />
                                <Births />
                            </div>
                        </div>
                    </section>
                </main>
            </NextAuthSessionProvider>
        </Hydrate>
    );
};

export default BirthsPage;
