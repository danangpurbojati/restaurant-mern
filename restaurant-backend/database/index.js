const mongoose = require('mongoose');
const { dbUrl } = require('../app/config');

mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
);

const db = mongoose.connection;

module.exports = db;