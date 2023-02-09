const jwt = require("jsonwebtoken");
const { User } = require('../models');

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.user_id;


        // const user = UserRepository.getUserById(req.userId)
        const user = await User.findOne({ where: { id: req.userId } })

        if (!user) {
            return res.status(401).send({
                message: "User not found!"
            });
        }

        req.user = user.dataValues
        next();
    });
};


const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;