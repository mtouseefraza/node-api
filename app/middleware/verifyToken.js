const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const tokenHeader = process.env.TOKEN_HEADER_KEY;
function verifyToken(req, res, next) {
    const token = req.header(tokenHeader);
    if (!token) return res.status(401).json({ status:0,message:'Access denied' });
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ status:0,message: 'Invalid token' });
    }
};
module.exports = verifyToken;