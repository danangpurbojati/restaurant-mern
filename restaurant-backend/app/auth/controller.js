const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../utils/get-token');
const User = require('../users/model');

const index = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({
            status: 'data users',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

const localStrategy = async (email, password, done) => {
    try {
        const user = await User.findOne({ email }).select('-__v -token');
        // cek apakah ada user atau tidak
        // jika tidak ada selesai
        if (!user) return done();

        // jika lolos, maka user ditemukan
        // selanjutnya adalah mencocokan password yang telah di hash
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
    return done();
};

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = new User(payload);
        await user.save();

        res.json({
            status: 'registered',
            data: user,
        });
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
            });
        }

        next(error);
    }
};

const login = async (req, res, next) => {
    passport.authenticate('local', async (error, user) => {
        if (error) return next(error);

        if (!user) return res.json({ error: 1, message: 'email or password incorrect' });

        // res.json(user);
        // jika email dan password benar
        // buat json web token
        // dont forget toJson()
        const signed = jwt.sign(user.toJSON(), config.secretKey);

        // simpan token ke database user terkait
        await User.findOneAndUpdate({ _id: user._id }, { $push: { token: signed } }, { new: true });

        // kirim respon ke client
        return res.json({
            message: 'logged in succesfully',
            user,
            token: signed,
        });
    })(req, res, next);
};

const me = (req, res) => {
    if (!req.user) {
        res.json({
            error: 1,
            message: 'you are not login or token expoied',
        });
    }

    res.json(req.user);
};

// logout
const logout = async (req, res) => {
    // dapatkan token yang sedang aktif
    const token = getToken(req);

    // cari user yang memiliki token tersebut
    const user = await User.findOneAndUpdate(
        { token: { $in: [token] } },
        { $pull: { token } },
        { useFindAndModify: false },
    );

    // cek user
    if (!user || !token) {
        res.json({
            error: 1,
            message: 'no user found',
        });
    }

    // jika berhasil
    res.json({
        error: 0,
        message: 'logout berhasil',
    });
};

module.exports = {
    register,
    index,
    localStrategy,
    login,
    me,
    logout,
};
