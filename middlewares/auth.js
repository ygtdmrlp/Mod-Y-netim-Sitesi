module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.userId) {
            return next();
        }
        res.redirect('/login');
    },
    isAdmin: (req, res, next) => {
        if (req.session.role === 'admin') {
            return next();
        }
        res.status(403).send('Unauthorized access');
    },
    attachUser: async (req, res, next) => {
        if (req.session.userId) {
            const User = require('../models/User');
            const user = await User.findById(req.session.userId);
            res.locals.currentUser = user;
        } else {
            res.locals.currentUser = null;
        }
        next();
    }
};
