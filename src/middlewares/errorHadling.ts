import { Request, Response, NextFunction } from 'express';
import { ValidationErrorItem } from 'joi';

interface CustomError extends Error {
    statusCode?: number;
    name: string;
    error?: {
        isJoi?: boolean;
        details?: ValidationErrorItem[];
    };
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): Response<any, Record<string, any>> | void => {
    switch (true) {
        case err?.error?.isJoi:
            const joiMessage = err.error.details?.[0]?.message || 'Validation error';
            return res.status(400).json({ message: joiMessage });

        case !!err.statusCode:
            return res.status(err.statusCode).json({ message: err.message });

        case err.name === 'CastError':
            return res.status(400).json({ message: 'Invalid ID format' });

        case err.name === 'TokenExpiredError':
            return res.status(401).json({ message: 'Unauthorized: Your token has expired. Login again.' });

        case err.name === 'JsonWebTokenError':
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });

        case err.message === 'email already exist':
            return res.status(401).json({ message: 'Admin already exists' });

        default:
            return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

export default errorHandler;
