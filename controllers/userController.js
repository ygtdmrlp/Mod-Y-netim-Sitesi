const User = require('../models/User');
const Mod = require('../models/Mod');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const userMods = await Mod.getByUser(req.session.userId);
        res.render('profile', { user, userMods, title: 'Profilim' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateProfile = async (req, res) => {
    const { username, password, confirm_password } = req.body;
    try {
        if (username) {
            await User.updateProfile(req.session.userId, username);
        }
        
        if (password) {
            if (password !== confirm_password) {
                const user = await User.findById(req.session.userId);
                const userMods = await Mod.getByUser(req.session.userId);
                return res.render('profile', { 
                    user, 
                    userMods, 
                    title: 'Profilim', 
                    error: 'Şifreler eşleşmiyor' 
                });
            }
            await User.updatePassword(req.session.userId, password);
        }
        
        res.redirect('/profil?success=1');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.uploadProfileImage = async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    try {
        await User.updateProfileImage(req.session.userId, req.file.filename);
        res.redirect('/profil');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
