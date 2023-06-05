import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HttpHandler = (request: Request) => void;

interface RouteHandlerParams {
    GET?: HttpHandler;
    POST?: HttpHandler;
    PUT?: HttpHandler;
    DELETE?: HttpHandler;
}

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
