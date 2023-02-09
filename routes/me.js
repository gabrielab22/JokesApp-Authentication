require('dotenv').config()
const express = require("express");
const router = express.Router();

const me = async (req, res) => {
    console.log(req.userId)


    res.json({ user: { ...req.user, password: undefined } })
}

router.get("/", me);

router.post("/test", me);

// ovako na frontendu dohvaćan zaštićenu rutu

// fetch('http://localhost:3000/me', {
//     headers: {
//         'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDIwNGI4ZDItZjhkNS00ZWNmLTg2ZDYtYmMwZjg3YmIxMWMxIiwiaWF0IjoxNjc1ODgyNDY0LCJleHAiOjE2NzU4ODk2NjR9.a29ZPD6O5RHe2naXOpKPX977breDfNutKYiURmlthPs'
//     }
// })


module.exports = router;