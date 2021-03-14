const router = require('express').Router();
const { getAllLogged, getPopular } = require('../services/courseService');

router.get('/', async (req, res) => {
    if (req.user) {
        let courses = await getAllLogged(req.query.search);
        courses.map(x => x.createdAt = x.createdAt.toString().substring(4, 16));
        res.render('loggedHome', { courses });
    } else {
        let courses = await getPopular(3);
        res.render('guestHome', { courses });
    }
});

module.exports = router;