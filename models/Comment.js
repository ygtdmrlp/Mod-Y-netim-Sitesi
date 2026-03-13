const db = require('./db');

class Comment {
    static async create(commentData) {
        const { mod_id, user_id, comment } = commentData;
        const sql = 'INSERT INTO comments (mod_id, user_id, comment) VALUES (?, ?, ?)';
        return db.query(sql, [mod_id, user_id, comment]);
    }

    static async getByModId(modId) {
        const sql = `
            SELECT c.*, u.username as user_name, u.profile_image as user_image 
            FROM comments c 
            LEFT JOIN users u ON c.user_id = u.id 
            WHERE c.mod_id = ? AND c.status = 'approved' 
            ORDER BY c.created_at DESC
        `;
        return db.query(sql, [modId]);
    }

    static async getAllForAdmin() {
        const sql = `
            SELECT c.*, u.username as user_name, m.title as mod_title 
            FROM comments c 
            LEFT JOIN users u ON c.user_id = u.id 
            LEFT JOIN mods m ON c.mod_id = m.id 
            ORDER BY c.created_at DESC
        `;
        return db.query(sql);
    }

    static async updateStatus(id, status) {
        const sql = 'UPDATE comments SET status = ? WHERE id = ?';
        return db.query(sql, [status, id]);
    }

    static async delete(id) {
        return db.query('DELETE FROM comments WHERE id = ?', [id]);
    }

    static async getStats() {
        const result = await db.query('SELECT COUNT(*) as count FROM comments');
        return result[0].count;
    }
}

module.exports = Comment;
