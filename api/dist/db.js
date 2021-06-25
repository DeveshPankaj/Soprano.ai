"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var myurl = 'mongodb://mongo:27017/soprano';
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
var options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    reconnectInterval: 500,
    poolSize: process.env.MONGOPOOLSIZE || 5,
    // If not connected, return errors immediately rather than waiting for reconnect
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};
//@ts-ignore
mongoose.connect(myurl, options).then(function () {
    console.log("MongoDB connection is Connected");
    // userModel.create({ first_name: 'udgshdfgh',
    //     last_name: '0',
    //     email: ';',
    //     password: 'string', avatar:'husdfu'})
    // userModel.find().then(result => {
    //     console.log(result)
    // })
})["catch"](function (err) {
    console.log("MongoDB connection is Down.Error is...", err);
    process.exit();
});
