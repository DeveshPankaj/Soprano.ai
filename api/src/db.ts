import {MongoClient} from 'mongodb'
import * as mongoose from 'mongoose'
import userModel from './models/user.model'
const myurl = 'mongodb://mongo:27017/soprano';

// MongoClient.connect(myurl, (err, client) => {
//   if (err) return console.log(err)

//   console.log('Connected!')
  
//   const db = client.db('admin')
//   const collection = db.collection('user')
//   collection.findOne({}, (error, result) => {
//       console.log(result)
//   })
  
// })


// async function run(): Promise<void> {
//     let conn = mongoose.connect(myurl, { useNewUrlParser: true});

//     // let userModel = conn.model('user', userSchema)
//     conn.then(()=>{

//     })
//     userModel.findOne({}, (error, data) => {
//         console.log(error, data)
//     })
// }

// run()

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: process.env.MONGOPOOLSIZE || 5, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

//@ts-ignore
mongoose.connect(myurl, options as any).then(() => {
    console.log("MongoDB connection is Connected");

// userModel.create({ first_name: 'udgshdfgh',
//     last_name: '0',
//     email: ';',
//     password: 'string', avatar:'husdfu'})

// userModel.find().then(result => {
//     console.log(result)
// })


  })
  .catch(err => {
    console.log("MongoDB connection is Down.Error is...", err);
    process.exit();
  });
