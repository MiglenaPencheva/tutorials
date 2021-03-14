const router = require('express').Router();
const { create, getOne, enrollUser, deleteCourse, edit } = require('../services/courseService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let courseData = extractData(req);
    try {
        await create(courseData, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', { error });
    }
});

router.get('/:id/details', async (req, res) => {
    const course = await getOne(req.params.id, req.user._id);
    res.render('details', { course });
});

router.get('/:id/enroll', async (req, res) => {
    try {
        let course = await enrollUser(req.params.id, req.user._id);
        course = await getOne(req.params.id, req.user._id);
        res.render('details', { course });
    } catch (error) {
        res.render('details', { error });
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        let course = await getOne(req.params.id, req.user._id);
        if (course.creator == req.user._id) {
            await deleteCourse(req.params.id);
            res.redirect('/');
        }
    } catch (error) {
        res.render('delete', { error });
    }
});

router.get('/:id/edit', async (req, res) => {
    let course = await getOne(req.params.id, req.user._id);
    res.render('edit', course);
});

router.post('/:id/edit', async (req, res) => {
    let courseData = extractData(req);
    try {
        const course = await getOne(req.params.id, req.user._id);
        if (course.creator == req.user._id) {
            await edit(req.params.id, courseData);
            res.redirect(`/course/${req.params.id}/details`);
        }
    } catch (error) {
        res.render('edit', { error });
    }
});

function extractData(req) {
    let { title, description, imageUrl, isPublic } = req.body;

    return courseData = {
        title,
        description,
        imageUrl,
        isPublic: Boolean(isPublic),
        createdAt: new Date(),
    };
}

module.exports = router;