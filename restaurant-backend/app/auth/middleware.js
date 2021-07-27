const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../utils/get-token');
const User = require('../users/model');

const decodeToken = () => (
    async (req, res, next) => {
        try {
            const token = getToken(req);

            if (!token) return next();

            req.user = jwt.verify(token, config.secretKey);

            const user = await User.findOne({ token: { $in: [token] } });

            if (!user) {
                return res.json({
                    error: 1,
                    message: 'token expired',
                });
            }
        } catch (error) {
            if (error && error.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: error.message,
                });
            }

            next(error);
        }

        return next();
    }
);

module.exports = {
    decodeToken,
};
