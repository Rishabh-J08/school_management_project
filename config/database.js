const mysql = require('mysql2/promise');
require('dotenv').config();

// Creating connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'schoolMgmt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initializing database and create schools table
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

module.exports = {
  pool,
  initializeDatabase
};