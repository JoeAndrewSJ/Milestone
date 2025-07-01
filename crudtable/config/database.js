const mysql = require('mysql2/promise');
require('dotenv').config();


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});


async function testConnection() {
  try {
    await db.execute('SELECT 1');
    console.log('db connected');
  } catch (error) {
    console.error('db conn failed:', error.message);
  }
}

module.exports = { db, testConnection };