const db = require('./db');

class Mod {
    static async create(modData) {
        const { title, game_name, description, version, file_path, image_path, file_size, user_id, category_id } = modData;
        const sql = `INSERT INTO mods (title, game_name, description, version, file_path, image_path, file_size, user_id, category_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return db.query(sql, [title, game_name, description, version, file_path, image_path, file_size, user_id, category_id]);
    }

    static async findById(id) {
        const sql = `
            SELECT m.*, u.username as uploader_name, c.name as category_name 
            FROM mods m 
            LEFT JOIN users u ON m.user_id = u.id 
            LEFT JOIN categories c ON m.category_id = c.id 
            WHERE m.id = ?
        `;
        const results = await db.query(sql, [id]);
        return results[0];
    }

    static async getAll(options = {}) {
        let sql = `
            SELECT m.*, u.username as uploader_name, c.name as category_name 
            FROM mods m 
            LEFT JOIN users u ON m.user_id = u.id 
            LEFT JOIN categories c ON m.category_id = c.id 
            WHERE m.status = 'approved'
        `;
        const params = [];

        if (options.category_id) {
            sql += ' AND m.category_id = ?';
            params.push(options.category_id);
        }

        if (options.search) {
            sql += ' AND (m.title LIKE ? OR m.game_name LIKE ?)';
            params.push(`%${options.search}%`, `%${options.search}%`);
        }

        if (options.sort === 'download_count') {
            sql += ' ORDER BY m.download_count DESC';
        } else if (options.sort === 'view_count') {
            sql += ' ORDER BY m.view_count DESC';
        } else {
            sql += ' ORDER BY m.created_at DESC';
        }

        if (options.limit) {
            sql += ' LIMIT ?';
            params.push(parseInt(options.limit));
        }

        return db.query(sql, params);
    }

    static async getRecent(limit = 10) {
        return this.getAll({ limit });
    }

    static async getMostDownloaded(limit = 10) {
        return this.getAll({ sort: 'download_count', limit });
    }

    static async getPopular(limit = 10) {
        return this.getAll({ sort: 'view_count', limit });
    }

    static async getByCategory(categoryId, limit = 10) {
        return this.getAll({ category_id: categoryId, limit });
    }

    static async search(term, limit = 20) {
        return this.getAll({ search: term, limit });
    }

    static async incrementDownload(id) {
        return db.query('UPDATE mods SET download_count = download_count + 1 WHERE id = ?', [id]);
    }

    static async incrementView(id) {
        return db.query('UPDATE mods SET view_count = view_count + 1 WHERE id = ?', [id]);
    }

    static async updateStatus(id, status) {
        return db.query('UPDATE mods SET status = ? WHERE id = ?', [status, id]);
    }

    static async delete(id) {
        return db.query('DELETE FROM mods WHERE id = ?', [id]);
    }

    static async getStats() {
        const total = await db.query('SELECT COUNT(*) as count FROM mods');
        const downloads = await db.query('SELECT SUM(download_count) as count FROM mods');
        return {
            total: total[0].count,
            downloads: downloads[0].count || 0
        };
    }

    static async getSimilar(id, category_id, limit = 4) {
        const sql = `
            SELECT m.*, u.username as uploader_name 
            FROM mods m 
            LEFT JOIN users u ON m.user_id = u.id 
            WHERE m.category_id = ? AND m.id != ? AND m.status = 'approved' 
            ORDER BY m.created_at DESC LIMIT ?
        `;
        return db.query(sql, [category_id, id, limit]);
    }

    static async getByUser(userId) {
        const sql = `
            SELECT m.*, c.name as category_name 
            FROM mods m 
            LEFT JOIN categories c ON m.category_id = c.id 
            WHERE m.user_id = ? 
            ORDER BY m.created_at DESC
        `;
        return db.query(sql, [userId]);
    }

    static async getAllForAdmin() {
        const sql = `
            SELECT m.*, u.username as uploader_name, c.name as category_name 
            FROM mods m 
            LEFT JOIN users u ON m.user_id = u.id 
            LEFT JOIN categories c ON m.category_id = c.id 
            ORDER BY m.created_at DESC
        `;
        return db.query(sql);
    }
}

module.exports = Mod;
