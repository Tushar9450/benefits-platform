import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import dealRoutes from './routes/dealRoutes'; 

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/benefits-platform');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1); 
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes); 

// Health Check - Changed 'req' to '_req' to fix unused parameter error
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'active', message: 'Server is running smoothly' });
});

// Global Error Handler - Changed 'req' and 'next' to '_req' and '_next'
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});