import RouteHandler from '@/utils/route-handler';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

const addNewBirth = async (userId: number, title: string, date: string) => {
    console.log(userId, title, date);
    const dateObj = new Date(date);
    return await prisma.birth.create({
        data: {
            title: title,
            date: date,
            userId: userId,
        },
    });
};

const handler = RouteHandler({
    GET: async (request) => {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' });
        }
        const email = session.user.email;
        if (!email) NextResponse.json({ error: 'Bad Request' });
        if (!id) {
            return NextResponse.json({ error: 'Bad Request' });
        }
        return prisma.birth
            .findUnique({
                where: {
                    id: +id,
                },
                include: {
                    user: true,
                },
            })
            .then((birth) => {
                if (!birth) {
                    return NextResponse.json({ error: 'Birth not found' });
                }
                if (birth.user.email !== email) {
                    return NextResponse.json({ error: 'Unauthorized' });
                }
                return NextResponse.json(birth);
            })
            .catch((err) => {
                return NextResponse.json({ error: err });
            });
    },
    POST: async (request) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' });
        }
        const res = await request.json();
        const { title, date } = res;

        const email = session.user.email;
        return await prisma.user
            .findUnique({
                where: {
                    email: email,
                },
            })
            .then((user) => {
                const errors = [];
                if (!user) {
                    errors.push('User not found');
                }
                if (!title) {
                    errors.push('Missing title');
                }
                if (!date) {
                    errors.push('Missing date');
                }
                if (errors.length > 0 || !user) {
                    return NextResponse.json({ error: errors });
                }
                // Format date into DateTime
                const dateObj = new Date(date);
                return prisma.birth
                    .create({
                        data: {
                            title: title,
                            date: dateObj,
                            userId: user.id,
                        },
                    })
                    .then((birth) => {
                        return NextResponse.json(birth);
                    })
                    .catch((err) => {
                        return NextResponse.json({
                            error: err,
                        });
                    });
            })
            .catch((err) => {
                return NextResponse.json({
                    error: err,
                });
            });
    },
    PUT: async (request) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' });
        }
        const res = await request.json();
        console.log(res);
        const { id, key, playlist } = res;
        const dataToUpdate = {
            [key]: playlist,
        };
        console.log(dataToUpdate);
        return prisma.birth
            .update({
                where: {
                    id: id,
                },
                data: {
                    [key]: playlist,
                },
            })
            .then((birth) => {
                console.log(birth);
                return NextResponse.json(birth);
            })
            .catch((err) => {
                return NextResponse.json({
                    error: err,
                });
            });
    },
});

export { handler as GET, handler as POST, handler as PUT };
