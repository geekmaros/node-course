const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async  (req, res, next) => {
   try {
       const token = req.header('Authorization').replace('Bearer','')
       const decode = jwt.verify(token, 'secretpasskey')
       console.log(decode)
       const user = await User.find({_id: decode._id, 'tokens.token': token})

       if(!user){
           throw new Error()
       }
        req.user = user
       next()
   }catch (e) {
        res.status(401).send('Kindly Authenticate')
   }
}

module.exports = auth