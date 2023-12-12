import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HttpHandler = (request: Request) => void;

interface RouteHandlerParams {
    GET?: HttpHandler;
    POST?: HttpHandler;
    PUT?: HttpHandler;
    DELETE?: HttpHandler;
}

export const checkSessionForRoute = async () => {
    // Check session for route
    const session = await getServerSession();
    // If no session, return 401
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }
    // If session, return session
    return session;
};

const RouteHandler = (handlers: RouteHandlerParams) => {
    return async (request: Request) => {
        const method = request.method as HttpMethod;
        const handler = handlers[method];

        if (!handler) {
            return NextResponse.json('Method not allowed');
        }

        return handler(request);
    };
};

export default RouteHandler;
