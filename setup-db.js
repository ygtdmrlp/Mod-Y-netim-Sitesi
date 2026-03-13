const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database '${process.env.DB_NAME}' created or already exists.`);
        
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);
        
        const fs = require('fs');
        const sql = fs.readFileSync('db.sql', 'utf8');
        
        // Split SQL script into individual queries
        const queries = sql.split(';').map(q => q.trim()).filter(q => q.length > 0);
        
        for (let q of queries) {
            await connection.query(q);
        }
        
        console.log('Tables and data seeded successfully.');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        await connection.end();
    }
}

createDb();
