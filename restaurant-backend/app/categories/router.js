const express = require('express');
const multer = require('multer');
const os = require('os');
const categoryController = require('./controller');

const router = express.Router();

router.get('/categories', categoryController.index);
router.post('/categories', multer({ dest: os.tmpdir() }).single('image'), categoryController.store);
router.put('/categories/:id', multer({ dest: os.tmpdir() }).single('image'), categoryController.update);
router.delete('/categories/:id', categoryController.destroy);

module.exports = router;
