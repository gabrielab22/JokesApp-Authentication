const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { authJwt } = require('../middleware/authJwt');
const yup = require('yup');
const jwt = require('jsonwebtoken');

const { User } = require('../models');


router.post('/', async (req, res) => {
    try {
        const validate = await schema.validate(req.body)
        console.log("try block", validate)




        const user = await User.findOne({ where: { email: req.body.email } });

        if (user === null) {
            res.json({ "msg": "User not found!" })
        } else {
            const result = bcrypt.compareSync(req.body.password, user.password);
            if (result) {

                const token = jwt.sign(
                    {
                        user_id: user.id
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "2h",
                    }
                )

                return res.json({ message: "success", token });
            } else {
                return res.status(400).json("Bad request. Password don't match ");
            }

        }

    } catch (error) {
        console.log("Creating user failed", error)
        res.json({ "path": error.path, "messages": error.errors })
    }
});


let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

module.exports = router;