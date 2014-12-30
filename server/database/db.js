var Q = require('q'),
    mongoose = require('mongoose'),
    config = require('../config/config');

// --- Database connection --- //

exports.init = function () {
  connectToDatabase();
};

function connectToDatabase() {
  mongoose.connect(config.db.url);

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function () {
    console.log('Connected to database');
  });
}

exports.getDatabaseConnection = function () {
  return mongoose.connection;
};

exports.clear = function () {
  var deferred = Q.defer();

  mongoose.connection.once('open', function () {
    mongoose.connection.db.dropDatabase();
    console.log('Emptied database');
    deferred.resolve();
  });

  return deferred.promise;
};
