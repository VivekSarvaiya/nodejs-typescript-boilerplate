import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validationMiddleware';
import { registerSchema, loginSchema } from '../validators/authValidator';

const router = express.Router();

router.post('/register', authLimiter, validateBody(registerSchema), registerUser);
router.post('/login', authLimiter, validateBody(loginSchema), loginUser);
router.get('/me', protect, getUser);

export default router;
