const express = require('express')
const router = new express.Router()

const Task = require('../models/task')
const auth = require('../middleware/auth')

router.get('/tasks', auth, async (req, res) => {
    console.log(req.user._id)
})




module.exports = router