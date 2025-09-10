import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError, sendValidationError } from '../utils/validationErrorHandler';

export const notFound = (_: Request, res: Response) => {
  sendError(res, 'Route not found', 404, 'client_error', 'ROUTE_NOT_FOUND');
};

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return sendValidationError(res, err, 400);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401, 'client_error', 'INVALID_TOKEN');
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401, 'client_error', 'TOKEN_EXPIRED');
  }

  // Handle MongoDB duplicate key errors
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    return sendError(res, 'Duplicate field value', 400, 'client_error', 'DUPLICATE_FIELD');
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return sendError(res, 'Validation failed', 400, 'client_error', 'VALIDATION_ERROR');
  }

  // Handle Mongoose cast errors
  if (err.name === 'CastError') {
    return sendError(res, 'Invalid data format', 400, 'client_error', 'INVALID_FORMAT');
  }

  // Default error handling
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  sendError(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    statusCode,
    'server_error',
    'INTERNAL_ERROR'
  );

  // Log error in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }
};
