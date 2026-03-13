const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
const { attachUser } = require('./middlewares/auth');

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'mod_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Custom Middleware to attach user to all views
app.use(attachUser);

// Global Variables for views
app.use(async (req, res, next) => {
    const Category = require('./models/Category');
    try {
        res.locals.categories = await Category.getAll();
        res.locals.path = req.path;
        res.locals.req = req;
        next();
    } catch (err) {
        next(err);
    }
});

// Routes
const indexRoutes = require('./routes/index');
const modRoutes = require('./routes/mods');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/', indexRoutes);
app.use('/mods', modRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/profil', userRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
