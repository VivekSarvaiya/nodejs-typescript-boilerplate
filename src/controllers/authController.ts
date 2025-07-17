import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import bcrypt from 'bcryptjs';
import { loginSchema, registerSchema } from '../validators/authValidator';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { name, email, password } = parsed.data;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      return res.status(500).json({ message: 'User creation failed' });
    }
  } catch (error: any) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};


/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { email, password } = parsed.data;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 */
export const getUser = async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};