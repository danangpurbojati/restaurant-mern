const express = require('express');
const multer = require('multer');
const os = require('os');

const router = express.Router();
const menuController = require('./controller');

router.get('/menus', menuController.index);
router.post('/menus', multer({ dest: os.tmpdir() }).single('image'), menuController.store);
router.put('/menus/:id', multer({ dest: os.tmpdir() }).single('image'), menuController.update);
router.delete('/menus/:id', menuController.destroy);

module.exports = router;
