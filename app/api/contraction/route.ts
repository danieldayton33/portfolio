import RouteHandler from '@/utils/route-handler';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

const handler = RouteHandler({
    POST: async (request) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }
        const res = await request.json();
        const { birthId } = res;
        if (!birthId) {
            return NextResponse.json({ error: 'Bad Request', status: 400 });
        }
        return await prisma.contraction
            .create({
                data: {
                    birthId: birthId,
                    startTime: new Date(),
                    length: 0,
                    isRunning: true,
                },
            })
            .then((contraction) => {
                return NextResponse.json(contraction);
            })
            .catch((err) => {
                return NextResponse.json({ error: err, status: 500 });
            });
    },
    PUT: async (request) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }
        const res = await request.json();
        const { id } = res;
        return await prisma.contraction
            .update({
                where: {
                    id: parseInt(id),
                },
                data: res,
            })
            .then((contraction) => {
                return NextResponse.json(contraction);
            })
            .catch((err) => {
                return NextResponse.json({ error: err, status: 500 });
            });
    },
    DELETE: async (request) => {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Bad Request', status: 400 });
        }
        return await prisma.contraction
            .delete({
                where: {
                    id: parseInt(id),
                },
            })
            .then(() => {
                return NextResponse.json({ status: 200 });
            })
            .catch((err) => {
                return NextResponse.json({ error: err, status: 500 });
            });
    },
});

export { handler as POST, handler as DELETE, handler as PUT };
