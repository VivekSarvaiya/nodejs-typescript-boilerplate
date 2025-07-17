import express, { type Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config({ quiet: true });
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.get('/health', (_, res) => res.send('OK'));

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Database connection
connectDB();

// Start server
const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
