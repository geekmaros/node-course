const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error(`Password Incorrect  cannot contain "password"`)
            }
        }

    },
    email: {
        type: String,
        required: true,
        unique: true ,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error ('Age must be a positive Number')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id : user._id.toString() }, 'secretpasskey' )

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.findCredentials = async (email, password) => {
    const user = await  User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch ){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema )

module.exports = User