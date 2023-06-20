import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import SignOut from '@/@components/SignOut';
import PlayLists from '@/@components/Playlists';
import { Birth, Contraction, User } from '@prisma/client';
import NextAuthSessionProvider from '@/app/providers/sessionProvider';
import Script from 'next/script';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import { Hydrate } from '@tanstack/react-query';
import Link from 'next/link';
import { ChevronLeft } from 'react-feather';
import Contractions from '@/@components/Contractions';

export type BirthWithUser = Birth & {
    user: User;
    contractions: Contraction[];
};

async function fetchBirth(id: string): Promise<BirthWithUser | null> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    const { email } = session.user;
    if (!email) return null;
    return prisma.birth
        .findUnique({
            where: {
                id: +id,
            },
            include: {
                user: true,
                contractions: true,
            },
        })
        .then((birth) => {
            if (!birth) {
                return null;
            }
            if (birth.user.email !== email) {
                return null;
            }
            return birth;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}
const SingleBirthPage = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery([`birth`, params.id], () =>
        fetchBirth(params.id),
    );
    const dehydratedState = dehydrate(queryClient);
    const birth = await fetchBirth(params.id);
    if (!birth) return NextResponse.redirect('/shiday');
    const { title, date } = birth;
    const dateObj = new Date(date);
    return (
        <Hydrate state={dehydratedState}>
            <NextAuthSessionProvider>
                <Script
                    src="https://open.spotify.com/embed-podcast/iframe-api/v1"
                    title="Spotify"
                    async={true}
                />
                <main>
                    <section className="bg-tertiary shadow-b-2xl px-4 lg:px-0">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 gap-12 py-12">
                                <Link
                                    className="flex font-ubuntuBold"
                                    href="/shiday"
                                >
                                    <ChevronLeft /> Back
                                </Link>
                                <div className="flex justify-between items-center">
                                    <h1 className="text-5xl font-ubuntuBold">
                                        {title}
                                    </h1>
                                    <SignOut />
                                </div>
                                <p className="text-2xl">
                                    {dateObj.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <Contractions
                            contractions={birth.contractions}
                            birthId={birth.id}
                        />
                        <PlayLists />
                    </section>
                </main>
            </NextAuthSessionProvider>
        </Hydrate>
    );
};

export default SingleBirthPage;
