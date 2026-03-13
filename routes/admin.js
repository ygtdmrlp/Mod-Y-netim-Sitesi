const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/auth');

router.use(isAdmin);

router.get('/', adminController.getDashboard);
router.get('/mods', adminController.getMods);
router.post('/mods/approve/:id', adminController.approveMod);
router.post('/mods/delete/:id', adminController.deleteMod);

router.get('/categories', adminController.getCategories);
router.post('/categories/add', adminController.addCategory);
router.post('/categories/delete/:id', adminController.deleteCategory);

router.get('/users', adminController.getUsers);
router.post('/users/delete/:id', adminController.deleteUser);

router.get('/comments', adminController.getComments);
router.post('/comments/approve/:id', adminController.approveComment);
router.post('/comments/delete/:id', adminController.deleteComment);

module.exports = router;
