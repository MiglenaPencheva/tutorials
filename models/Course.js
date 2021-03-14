const mongoose = require('mongoose');

const courseScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title should be at least 4 characters long']
    },
    description: {
        type: String,
        required: ['Description is required'],
        minlength: [20, 'Description should be at least 20 characters long'],
        maxlength: [50, 'Description should be max 50 characters long']
    },
    imageUrl: {
        type: String,
        required: ['Image is required'],
        validate: {
            validator: (v) => /^https?:\/\//,
            message: (props) => `Invalid URL`
        }
    },
    isPublic: {
        type: Boolean,
        dafault: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Course', courseScheme);