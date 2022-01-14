const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sendWelcomeMail} = require('../helpers/email')

const router = new express.Router()

router.post('/api/users', async(req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
        await sendWelcomeMail(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/api/users/login', async(req,res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.get("/api/users/me", auth , async (req, res) => {
    try {
        res.status(201).send(req.user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router