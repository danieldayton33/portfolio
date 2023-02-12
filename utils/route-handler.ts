import type { NextApiRequest, NextApiResponse } from 'next';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HttpHandler = (request: NextApiRequest, response: NextApiResponse) => void;

interface RouteHandlerParams {
    GET?: HttpHandler;
    POST?: HttpHandler;
    PUT?: HttpHandler;
    DELETE?: HttpHandler;
}

const RouteHandler = (handlers: RouteHandlerParams) => {
    return async (request: NextApiRequest, response: NextApiResponse) => {
        const method = request.method as HttpMethod;
        const handler = handlers[method];

        if (!handler) {
            return response.status(405).send('Method not allowed');
        }

        return await handler!(request, response);
    };
};

export default RouteHandler;
