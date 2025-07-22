require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const focusSessionRoutes = require('./routes/focusSession');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/focusTracker');
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/focus-session', focusSessionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Focus Session Tracker API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Focus Session Tracker API',
    version: '2.0.0',
    features: ['FFmpeg Processing', 'AWS S3 Simulation', 'API Key Auth', 'Rate Limiting'],
    endpoints: {
      health: 'GET /api/health (public)',
      createSession: 'POST /api/focus-session (protected)',
      getSessions: 'GET /api/focus-session (protected)',
      getSession: 'GET /api/focus-session/:id (protected)',
      getSessionLogs: 'GET /api/focus-session/:id/logs (protected)'
    },
    authentication: {
      method: 'API Key',
      header: 'x-api-key',
      demoKey: 'hackathon-demo-key-2024'
    },
    documentation: 'Use Postman with API key or the frontend demo to test'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📝 Create Session: POST http://localhost:${PORT}/api/focus-session`);
    console.log(`📊 View Sessions: GET http://localhost:${PORT}/api/focus-session`);
  });
};

startServer().catch(console.error); 