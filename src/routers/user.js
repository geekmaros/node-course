const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
   
    const user =  new User(req.body)
    try {
        await user.save()
        const token = await  user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
     try{
         const user = await User.findCredentials(req.body.email, req.body.password)
         const  token = await user.generateAuthToken()
         res.status(200).send({user, token})

     }catch (e) {
         res.status(401).send(e)
     }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        const users = req.user
        res.send(users)
    } catch (error) {
        res.status(500).send()  
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => res.status(500).send() )
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }

})

router.patch('/users/:id', async (req,res) => {
    const _id = req.params.id
    console.log(req.body)
     const updates = Object.keys(req.body)
     const allowedUpdates = ['name', 'age', 'email', 'password']

     const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

     if(!isValidUpdate){
         return res.status(404).send({error: 'Invalid Update operation'})
     }
     try {
         const user = await User.findById(req.params.id)

         updates.forEach((update) => {
             user[update] = req.body[update]
         })

         await user.save()
         //  const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
     } catch(e){
         return res.status(400).send(e)
     }
})

router.delete('/users/:id', async(req, res) => {
    console.log('delete user working')
    const _id = req.params.id
    try {
       const user = await User.findOneAndDelete({_id: req.params.id}, {useFindAndModify:true})
       if (!user) {
           return res.status(404).send({error: 'User Not Found for deletion'})
       }
       res.send() 
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router
