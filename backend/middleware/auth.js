const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_secret_key";

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) return res.status(403).send("Token missing");

    token = token.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");

        req.userId = decoded.userId;
        next();
    });
};
