const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codial_development',{ useNewUrlParser: true },{ useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function () {
    console.log("connected to db");
});

module.exports = db;