const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "dm123";

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ msg: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };
