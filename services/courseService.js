const Course = require('../models/Course');

async function getAllLogged(query) {
    return await Course
        .find({ title: { $regex: query || '', $options: 'i' } })
        .sort({ createdAt: -1 })
        .lean();
}

async function getPopular(num) {
    return await Course
        .find({ isPublic: true })
        .sort({ usersEnrolled: -1 })
        .limit(num)
        .lean();
}

async function getOne(courseId, userId) {
    let course = await Course.findById(courseId).lean();
    course.isEnrolled = course.usersEnrolled.toString().includes(userId);
    course.isOwn = course.creator == userId;
    course.checked = course.isPublic ? 'checked' : '';
    return course;
}

async function enrollUser(courseId, userId) {
    let course = await Course.findById(courseId);
    if (course.creator == userId) return;
    if (!course.usersEnrolled.includes(userId)) {
        course.usersEnrolled.push(userId);
    }
    return course.save();
}

async function create(courseData, userId) {
    let course = new Course(courseData);
    course.creator = userId;
    return course.save();
}

async function deleteCourse(courseId) {
    return await Course.deleteOne({ _id: courseId });
}

async function edit(courseId, editedData) {
    return await Course.updateOne({ _id: courseId }, editedData);
}

module.exports = {
    getAllLogged,
    getPopular,
    getOne,
    enrollUser,
    create,
    deleteCourse,
    edit,
};