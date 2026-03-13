const User = require('./models/User');
const db = require('./models/db');
const bcrypt = require('bcrypt');

async function seedAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const sql = "INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@modmerkezi.com', ?, 'admin')";
        await db.query(sql, [hashedPassword]);
        console.log('Admin user created: admin@modmerkezi.com / admin123');
        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err.message);
        process.exit(1);
    }
}

seedAdmin();
