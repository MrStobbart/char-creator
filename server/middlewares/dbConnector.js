const MongoClient = require('mongodb').MongoClient;

module.exports = function (url, options) {
	if (typeof url !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	options = options || {};
	let property = options.property || 'db';

	let connection = createConnection(url, options);

	return (req, res, next) => {
		if (!connection) {
			connection = createConnection(url, options);
		}

		connection
			.then((db) => {
				req[property] = db;
				next();
			})
			.catch((err) => {
				console.log(`Error while applying connector middleware on request: ${req.originalUrl}\nError obj: ${JSON.stringify(err, null, 2)}`)
				connection = undefined;
				next(err);
			});
	};
};

function createConnection(url, options) {
	return connection = MongoClient.connect(url, options)
		.then(db => {
			console.log("Mongo Connection established!");
			return db;
		})
		.catch(err => console.log(`Could not connect to MongoDB!\nPlease make sure Mongodb is installed and running!\nMongo url: ${url}\nError obj: ${JSON.stringify(err, null, 2)}`));
}