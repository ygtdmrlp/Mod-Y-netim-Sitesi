const Mod = require('../models/Mod');
const User = require('../models/User');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

exports.getDashboard = async (req, res) => {
    try {
        const modStats = await Mod.getStats();
        const userCount = await User.getStats();
        const commentCount = await Comment.getStats();
        
        res.render('admin/dashboard', { 
            modStats, 
            userCount, 
            commentCount,
            title: 'Admin Paneli' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getMods = async (req, res) => {
    try {
        const mods = await Mod.getAllForAdmin();
        res.render('admin/mods', { mods, title: 'Mod Yönetimi' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.approveMod = async (req, res) => {
    try {
        await Mod.updateStatus(req.params.id, 'approved');
        res.redirect('/admin/mods');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteMod = async (req, res) => {
    try {
        await Mod.delete(req.params.id);
        res.redirect('/admin/mods');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.render('admin/categories', { categories, title: 'Kategori Yönetimi' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.addCategory = async (req, res) => {
    try {
        await Category.create(req.body.name);
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.delete(req.params.id);
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.render('admin/users', { users, title: 'Kullanıcı Yönetimi' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.getAllForAdmin();
        res.render('admin/comments', { comments, title: 'Yorum Yönetimi' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.approveComment = async (req, res) => {
    try {
        await Comment.updateStatus(req.params.id, 'approved');
        res.redirect('/admin/comments');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.delete(req.params.id);
        res.redirect('/admin/comments');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
