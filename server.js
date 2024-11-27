const express = require('express');
const { initializeDatabase } = require('./config/database.js');
const schoolRoutes = require('./route/schoolRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize routes
app.use('/api', schoolRoutes);

// Database initialization
initializeDatabase();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});