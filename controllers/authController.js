const User = require('../models/User');

exports.getLogin = (req, res) => {
    if (req.session.userId) return res.redirect('/');
    res.render('auth/login', { title: 'Giriş Yap', error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (user && await User.comparePassword(password, user.password)) {
            req.session.userId = user.id;
            req.session.role = user.role;
            return res.redirect('/');
        }
        res.render('auth/login', { title: 'Giriş Yap', error: 'Geçersiz e-posta veya şifre' });
    } catch (err) {
        console.error(err);
        res.render('auth/login', { title: 'Giriş Yap', error: 'Sunucu hatası oluştu' });
    }
};

exports.getRegister = (req, res) => {
    if (req.session.userId) return res.redirect('/');
    res.render('auth/register', { title: 'Kayıt Ol', error: null });
};

exports.postRegister = async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.render('auth/register', { title: 'Kayıt Ol', error: 'Şifreler eşleşmiyor' });
    }
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.render('auth/register', { title: 'Kayıt Ol', error: 'Bu e-posta adresi zaten kullanımda' });
        }
        await User.create({ username, email, password });
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('auth/register', { title: 'Kayıt Ol', error: 'Sunucu hatası oluştu' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
