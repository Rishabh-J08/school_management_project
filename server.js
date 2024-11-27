const express = require('express');
const { initializeDatabase } = require('./config/database.js');
const schoolRoutes = require('./route/schoolRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to School Management API",
    endpoints: {
      addSchool: "/api/addSchool (POST)",
      listSchools: "/api/listSchool?latitude=40.7128&longitude=-74.0060 (GET) {can change the longitude and latitude in query param}"
    },
    version: "1.0.0",
    status: "Active"
  });
});

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