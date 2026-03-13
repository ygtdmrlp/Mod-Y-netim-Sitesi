const Mod = require('../models/Mod');
const Category = require('../models/Category');

exports.getHome = async (req, res) => {
    try {
        const recentMods = await Mod.getRecent(8);
        const popularMods = await Mod.getPopular(4);
        const mostDownloaded = await Mod.getMostDownloaded(4);
        const categories = await Category.getAll();
        
        res.render('index', { 
            recentMods, 
            popularMods, 
            mostDownloaded, 
            categories,
            title: 'Anasayfa' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.search = async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Mod.search(query);
        res.render('search_results', { results, query, title: 'Arama Sonuçları' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getByCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const mods = await Mod.getByCategory(categoryId);
        const category = await Category.findById(categoryId);
        res.render('category_mods', { mods, category, title: category.name });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
