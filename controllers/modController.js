const Mod = require('../models/Mod');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const path = require('path');
const fs = require('fs');

exports.getAllMods = async (req, res) => {
    try {
        const mods = await Mod.getAll();
        res.render('mod/list', { mods, title: 'Tüm Modlar' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getModDetail = async (req, res) => {
    const modId = req.params.id;
    try {
        const mod = await Mod.findById(modId);
        if (!mod) return res.status(404).send('Mod not found');
        
        await Mod.incrementView(modId);
        const comments = await Comment.getByModId(modId);
        const similarMods = await Mod.getSimilar(modId, mod.category_id);
        
        res.render('mod/detail', { mod, comments, similarMods, title: mod.title });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getUploadMod = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.render('mod/upload', { categories, title: 'Mod Yükle' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postUploadMod = async (req, res) => {
    const { title, game_name, description, version, category_id, mod_link } = req.body;
    const mod_image = req.files['mod_image'] ? req.files['mod_image'][0] : null;

    if (!mod_link) return res.status(400).send('Mod link is required');

    try {
        const modData = {
            title,
            game_name,
            description,
            version,
            file_path: mod_link, // Store URL in file_path column
            image_path: mod_image ? mod_image.filename : 'default_mod.png',
            file_size: 'N/A', // Link based mods may not have size available
            user_id: req.session.userId,
            category_id
        };
        await Mod.create(modData);
        res.redirect('/profil');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.downloadMod = async (req, res) => {
    const modId = req.params.id;
    try {
        const mod = await Mod.findById(modId);
        if (!mod) return res.status(404).send('Mod not found');
        
        await Mod.incrementDownload(modId);
        // Instead of downloading from server, redirect to external link
        res.redirect(mod.file_path);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postComment = async (req, res) => {
    const modId = req.params.id;
    const { comment } = req.body;
    try {
        await Comment.create({
            mod_id: modId,
            user_id: req.session.userId,
            comment
        });
        res.redirect(`/mods/${modId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
