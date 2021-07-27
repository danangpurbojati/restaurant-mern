const router = require('express').Router();

const controller = require('./controller');

router.get('/invoices/:orderId', controller.show);

module.exports = router;
