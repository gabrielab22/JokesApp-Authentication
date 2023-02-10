require('dotenv').config()
const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require('nodemailer');

const url = 'https://api.chucknorris.io/jokes/random';


router.get('/', async (req, res) => {

    try {
        const joke = await axios.get(url);
        //console.log(joke.data.value)

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.SENDER_ADRESSS, // sender address
            to: [req.user.email], // list of receivers
            subject: "Joke", // Subject line
            html: generateTemplate(joke.data.value), // html body
        });
        //console.log(info)

        return res.send({ "msg": "Send email" })

    } catch (err) {
        console.log(err);
        return res.send({ "error": err?.message || 'Error' })
    }
});

const generateTemplate = (joke) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        
    </head>
    <body>
        <span>Chuck Noris Joke: </span>
        <p>${joke}<p>
    </body>
    </html>
`

module.exports = router;