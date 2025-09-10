import { ZodError } from 'zod';
import { Response } from 'express';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    type: 'validation_error' | 'server_error' | 'client_error';
    message: string;
    details?: ValidationError[];
    code?: string;
  };
  timestamp: string;
}

/**
 * Formats Zod validation errors into a consistent, frontend-friendly format
 */
export const formatZodError = (error: ZodError): ValidationError[] => {
  return error.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));
};

/**
 * Sends a validation error response to the client
 */
export const sendValidationError = (
  res: Response,
  error: ZodError,
  statusCode: number = 400
): void => {
  const formattedErrors = formatZodError(error);
  
  const response: ApiErrorResponse = {
    success: false,
    error: {
      type: 'validation_error',
      message: 'Validation failed',
      details: formattedErrors,
      code: 'VALIDATION_ERROR',
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

/**
 * Sends a general error response to the client
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  type: 'server_error' | 'client_error' = 'server_error',
  code?: string
): void => {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      type,
      message,
      code: code || type.toUpperCase(),
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

/**
 * Sends a success response to the client
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};
