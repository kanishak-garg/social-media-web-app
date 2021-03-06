const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost:27017/${env.db}`,{ useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function () {
    console.log("connected to db");
});

module.exports = db;