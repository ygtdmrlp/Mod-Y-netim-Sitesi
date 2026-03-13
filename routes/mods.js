const express = require('express');
const router = express.Router();
const modController = require('../controllers/modController');
const { isLoggedIn } = require('../middlewares/auth');
const upload = require('../config/multer');

router.get('/', modController.getAllMods);
router.get('/yukle', isLoggedIn, modController.getUploadMod);
router.post('/yukle', isLoggedIn, upload.fields([
    { name: 'mod_image', maxCount: 1 }
]), modController.postUploadMod);
router.get('/:id', modController.getModDetail);
router.get('/indir/:id', modController.downloadMod);
router.post('/yorum/:id', isLoggedIn, modController.postComment);

module.exports = router;
