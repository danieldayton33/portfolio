import prisma from '@/utils/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import RouteHandler from '@/utils/route-handler';

const createUser = async (email: string) => {
    return await prisma.user.create({
        data: {
            email: email,
        },
    });
};

const handler = RouteHandler({
    GET: async () => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' });
        }
        const email = session.user.email;
        if (!email) NextResponse.json({ error: 'Bad Request' });
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
                    createUser(email)
                        .then((user) => {
                            return NextResponse.json(user);
                        })
                        .catch((err) => {
                            console.log(err);
                            return NextResponse.json(err);
                        });
                }
                return NextResponse.json(user);
            })
            .catch((err) => {
                return NextResponse.json(err);
            });
    },
    PUT: async (req) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' });
        }
        const reqBody = await req.json();
        console.log(reqBody);
        const { id, name } = reqBody;
        if (!id) {
            return NextResponse.json({ error: 'Bad Request' });
        }
        return prisma.user
            .update({
                where: {
                    id: +id,
                },
                data: {
                    name: name,
                },
            })
            .then((user) => {
                return NextResponse.json(user);
            })
            .catch((err) => {
                return NextResponse.json(err);
            });
    },
});

export { handler as GET, handler as PUT };
