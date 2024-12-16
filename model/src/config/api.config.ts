import 'dotenv/config';

export const CORS_OPTIONS = {
    origin: '',
    methods: ['GET', 'POST'],
    allowedHeaders: ['X-API-KEY'],
};
export const SERVER_PORT = process.env.PORT || 3333;
export const API_KEY = process.env.API_KEY;