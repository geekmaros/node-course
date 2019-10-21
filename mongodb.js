// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

console.log(id)

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
       return  console.log('unable to connect to database')
    }
    console.log('Connected SUccessfully');


    const db = client.db(databaseName)

    // db.collection('users').find({club:'Man Utd'}).toArray((error, result) => {
    //     if (error) {
    //         return console.log('Name not FOund')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Geeky',
    //     club: 'Man Utd'
    // }, (error, result) =>{
    //     if (error) {
    //         return console.log('Unable to Insert')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Rukky',
    //         club: 'Arsenal'
    //     },
    //     {
    //         name: 'Adex',
    //         club:'Crystal Palace'
    //     }
    // ], (error, result) => {

    //     if (error) {
    //         return console.log('Unable to Insert document')
    //     }

    //     console.log(result.ops)
    // })

    updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('5d8b626465d5670648a832c4')
    },
    {
        $set: {
            club: 'Barcelona'
        }
    })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})