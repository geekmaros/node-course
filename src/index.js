const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const bcrypt = require('bcryptjs')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const myFunction = async () => {
    const password = 'abuAkorede'

    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('abuAkorede', hashedPassword)

    console.log(isMatch)
}



myFunction()





app.listen(port , () => {
    console.log('server is up and running on port ' + port)
})