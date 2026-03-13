const db = require('./db');
const bcrypt = require('bcrypt');

class User {
    static async create(userData) {
        const { username, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        return db.query(sql, [username, email, hashedPassword]);
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const results = await db.query(sql, [email]);
        return results[0];
    }

    static async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const results = await db.query(sql, [id]);
        return results[0];
    }

    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

    static async getAll() {
        return db.query('SELECT * FROM users ORDER BY created_at DESC');
    }

    static async delete(id) {
        return db.query('DELETE FROM users WHERE id = ?', [id]);
    }

    static async updateProfileImage(id, imageUrl) {
        return db.query('UPDATE users SET profile_image = ? WHERE id = ?', [imageUrl, id]);
    }

    static async updateProfile(id, username) {
        return db.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);
    }

    static async updatePassword(id, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
    }

    static async getStats() {
        const result = await db.query('SELECT COUNT(*) as count FROM users');
        return result[0].count;
    }
}

module.exports = User;
