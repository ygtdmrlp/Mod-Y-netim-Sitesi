const db = require('./db');
const slugify = require('slugify');

class Category {
    static async getAll() {
        return db.query('SELECT * FROM categories ORDER BY name ASC');
    }

    static async findById(id) {
        const sql = 'SELECT * FROM categories WHERE id = ?';
        const results = await db.query(sql, [id]);
        return results[0];
    }

    static async findBySlug(slug) {
        const sql = 'SELECT * FROM categories WHERE slug = ?';
        const results = await db.query(sql, [slug]);
        return results[0];
    }

    static async create(name) {
        const slug = slugify(name, { lower: true });
        const sql = 'INSERT INTO categories (name, slug) VALUES (?, ?)';
        return db.query(sql, [name, slug]);
    }

    static async update(id, name) {
        const slug = slugify(name, { lower: true });
        const sql = 'UPDATE categories SET name = ?, slug = ? WHERE id = ?';
        return db.query(sql, [name, slug, id]);
    }

    static async delete(id) {
        return db.query('DELETE FROM categories WHERE id = ?', [id]);
    }
}

module.exports = Category;
