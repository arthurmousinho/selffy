import { Request, Response, NextFunction } from 'express';
import { API_KEY } from '../config/api.config';

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        res.status(403).json({ 
            message: 'Forbidden',
            status: 403,
            error: 'Invalid API key'
        });
        return;
    }

    next();
}