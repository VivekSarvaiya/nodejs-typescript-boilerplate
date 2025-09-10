import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import bcrypt from 'bcryptjs';
import { loginSchema, registerSchema } from '../validators/authValidator';
import { sendSuccess, sendError } from '../utils/validationErrorHandler';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 'User already exists', 400, 'client_error', 'USER_EXISTS');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });

    if (user) {
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      };
      return sendSuccess(res, userData, 'User registered successfully', 201);
    } else {
      return sendError(res, 'User creation failed', 500, 'server_error', 'USER_CREATION_FAILED');
    }
  } catch (error: any) {
    console.error('Register Error:', error.message);
    return sendError(res, 'Server Error', 500, 'server_error', 'INTERNAL_ERROR');
  }
};


/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      };
      return sendSuccess(res, userData, 'Login successful');
    } else {
      return sendError(res, 'Invalid email or password', 401, 'client_error', 'INVALID_CREDENTIALS');
    }
  } catch (error: any) {
    console.error('Login Error:', error.message);
    return sendError(res, 'Server Error', 500, 'server_error', 'INTERNAL_ERROR');
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 */
export const getUser = async (req: Request, res: Response) => {
  return sendSuccess(res, req.user, 'User data retrieved successfully');
};