const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    dbUrl: process.env.DB_URL,
    rootPath: path.resolve(__dirname, '..'),
    secretKey: 'passwordRahasia',
};
