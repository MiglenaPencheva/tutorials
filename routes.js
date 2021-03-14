const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const { isLogged } = require('./middlewares/authMiddleware');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/course', isLogged, courseController);

module.exports = router;