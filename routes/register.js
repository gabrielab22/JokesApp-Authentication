const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const yup = require('yup');

const { User } = require('../models');

router.get('/', async (req, res) => {
    const UsersList = await User.findAll();
    res.json(UsersList);
});

router.post("/", async (req, res) => {
    try {
        const validate = await schema.validate(req.body)
        console.log("try block", validate)

        const user = await User.findOne({ where: { email: req.body.email } });

        if (user === null) {
            console.log('Not found!');

            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash

            const createdUser = await User.create(req.body)
            res.json({ ...createdUser.dataValues, password: undefined }) //destructing object learn more
        } else {
            console.log(user instanceof User);
            console.log(user.email);
            res.json({ "msg": "Email already exist" })
        }

    } catch (error) {
        console.log("Creating user failed", error)
        res.json({ "path": error.path, "messages": error.errors })
    }
});

let schema = yup.object().shape({
    id: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    firstName: yup.string().required().max(20),
    lastName: yup.string().required().max(20),
    createdAt: yup.date().default(function () {
        return new Date();
    }),
    updatedAt: yup.date().default(function () {
        return new Date();
    }),
});

module.exports = router;
