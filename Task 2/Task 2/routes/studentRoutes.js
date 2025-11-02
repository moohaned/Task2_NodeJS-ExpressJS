const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', studentController.getHomepage);

router.get('/students', isAuth, studentController.getAllStudents);
router.get('/students/add', isAuth, studentController.getAddStudent);
router.post('/students/add', isAuth, studentController.postAddStudent);
router.get('/students/edit/:id', isAuth, studentController.getEditStudent);
router.post('/students/edit/:id', isAuth, studentController.postEditStudent);
router.post('/students/delete/:id', isAuth, studentController.postDeleteStudent);

module.exports = router;