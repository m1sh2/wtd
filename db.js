// Bring Mongoose into the app
var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'localhost:27017/wtd';

if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://wtd:9Nopsir6BZhq@ds119788.mlab.com:19788/wtd';
}

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require('./models/task');
require('./models/user');