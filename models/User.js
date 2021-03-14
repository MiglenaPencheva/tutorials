const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: ['Username is required'],
        unique: true,
        trim: true,
        minlength: [5, 'Username should be at least 5 characters long'],
        validate: {
            validator: /^[a-zA-z0-9]$/,
            message: 'Username should contains only english letters and digits'
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'Password should be at least 5 characters long'],
        validate: {
            validator: /^[a-zA-z0-9]$/,
            message: 'Password should contains only english letters and digits'
        },
    }
});

userScheme.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', userScheme);
