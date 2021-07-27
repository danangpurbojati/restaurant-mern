const express = require('express');
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const authController = require('./controller');

passport.use(new LocalStrategy({ usernameField: 'email' }, authController.localStrategy));
router.get('/register', authController.index);
router.post('/register', multer().none(), authController.register);
router.post('/login', multer().none(), authController.login);
router.get('/me', authController.me);
router.post('/logout', authController.logout);

module.exports = router;
