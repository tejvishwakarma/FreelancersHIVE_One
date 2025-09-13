import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import prisma from './config/database.config';
import routes from './routes';



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'FreelancersHIVE Backend API is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// API routes
app.use('/api', routes);

// Database health check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({ 
      status: 'OK',
      service: 'FreelancersHIVE API',
      database: 'Connected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR', 
      database: 'Disconnected',
      error: 'Database connection failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`🗄️ Database: PostgreSQL connected`);
});
