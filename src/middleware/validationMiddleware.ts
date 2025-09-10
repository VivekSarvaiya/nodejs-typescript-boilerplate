import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendValidationError } from '../utils/validationErrorHandler';

/**
 * Middleware factory that creates validation middleware for request body
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error, 400);
      }
      next(error);
    }
  };
};

/**
 * Middleware factory that creates validation middleware for request query parameters
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error, 400);
      }
      next(error);
    }
  };
};

/**
 * Middleware factory that creates validation middleware for request parameters
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error, 400);
      }
      next(error);
    }
  };
};

/**
 * Generic validation middleware that can validate any part of the request
 */
export const validate = (schema: ZodSchema, target: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = target === 'body' ? req.body : target === 'query' ? req.query : req.params;
      const validatedData = schema.parse(data);
      
      if (target === 'body') {
        req.body = validatedData as any;
      } else if (target === 'query') {
        req.query = validatedData as any;
      } else {
        req.params = validatedData as any;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error, 400);
      }
      next(error);
    }
  };
};
