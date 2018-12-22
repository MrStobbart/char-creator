const MongoClient = require('mongodb').MongoClient;


function createConnection(url, options) {
  options.useNewUrlParser = true; // eslint-disable-line
  return MongoClient.connect(url, options)
    .then((db) => {
      console.log('Mongo Connection established!');
      return db;
    })
    .catch((err) => {
      const message = `Could not connect to MongoDB!\n
      lease make sure Mongodb is installed and running!\n
      Mongo url: ${url}\nError obj: ${JSON.stringify(err, null, 2)}`;
      console.log(message);
    });
}

module.exports = function (url, databaseName, options) {
  if (typeof url !== 'string') {
    throw new TypeError('Expected uri to be a string');
  }

  options = options || {}; // eslint-disable-line 
  const property = options.property || 'db';

  let connection = createConnection(url, options);

  return (req, res, next) => {
    if (!connection) {
      connection = createConnection(url, options);
    }

    connection
      .then((client) => {
        req[property] = client.db(databaseName);
        next();
      })
      .catch((err) => {
        const message = `Error while applying connector middleware on request: ${req.originalUrl}\n
        Error obj: ${JSON.stringify(err, null, 2)}`;
        console.log(message);
        connection = undefined;
        next(err);
      });
  };
};
