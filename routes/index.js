const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);
router.get('/search', indexController.search);
router.get('/kategori/:id', indexController.getByCategory);

module.exports = router;
