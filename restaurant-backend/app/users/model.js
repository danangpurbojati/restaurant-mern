const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const HASH_ROUND = 10;

const userSchema = new Schema({
    fullname: {
        type: String,
        minlength: [3, 'name at least has 3 characters'],
        maxlength: [255, 'maximum name characters is 255'],
        required: [true, 'fullname is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        maxlength: [255, 'maximum email characters is 255'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        maxlength: [255, 'maximum email characters is 255'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    token: [String],
});

// email validation
userSchema.path('email').validate((value) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(value);
}, (attr) => `${attr.value} has to be a valid email`);

// validate registered email
userSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('User').count({ email: value });
        return !count;
    } catch (error) {
        throw error;
    }
}, (attr) => `${attr.value} has been registered`);

// hashing password
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
