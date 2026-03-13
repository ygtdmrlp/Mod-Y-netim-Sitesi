const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/auth');
const upload = require('../config/multer');

router.get('/', isLoggedIn, userController.getProfile);
router.post('/update', isLoggedIn, userController.updateProfile);
router.post('/upload-image', isLoggedIn, upload.single('profile_image'), userController.uploadProfileImage);

module.exports = router;
