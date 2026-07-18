const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    try {

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded User:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;