// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID("609bf285235bc5282a21b87f") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch user')
    //     }
    //     console.log(user)
    // })


    // db.collection('users').find({ age: 27 }).toArray((error, users) => { console.log(users) })
    // db.collection('users').find({ age: 27 }).count((error, count) => { console.log(count) })

    // db.collection('users').updateOne({
    //         _id: new ObjectID("609c026206aa78589aea09dc")
    //     }, {
    //         $inc: {
    //             age: 1
    //         }
    //     })
    //     .then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({
    //     age: 41
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteOne({
    //     _id: new ObjectID("609c026206aa78589aea09dc")
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


})