const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const history = require('connect-history-api-fallback');
const ObjectId = require('mongodb').ObjectID;

const ApiError = require('./models/ApiError');
const dbConnectionMiddleware = require('./middlewares/dbConnector');
const theDarkEye = require('./data/theDarkEye/charsheet');
const savageWorldsFantasyQualities = require('./data/savageWorldsFantasy/qualities');

const app = express();
const port = 8080;


// Middleware: Make mongoDb db object available in req.
app.use(dbConnectionMiddleware('mongodb://127.0.0.1:27017', 'char-reator'));

// Middleware: Parse request body to json.
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(cors());
  // Log every request made to the console
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // This is not needed in production
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   next();
// });


// app.options('*', (req, res) => {
//   res.status(200).send();
// });

app.route('/api/users');

app.route('/api/thedarkeye')
  .get((req, res) => {
    res.json(theDarkEye);
  });

app.route('/api/savage-worlds-fantasy/qualities')
  .get((req, res) => {
    res.status(200).json(savageWorldsFantasyQualities);
  });

app.route('/api/savage-worlds-fantasy/characters')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters');
    next();
  })

  // Get all characters
  .get((req, res, next) => {
    req.collection.find({}).toArray()
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });


// TODO add this kind of error handling to all endpoints
app.route('/api/savage-worlds-fantasy/characters/:id')
  .all((req, res, next) => {
    // console.log('asdasdas', req.db);
    req.collection = req.db.collection('swFantasyCharacters');
    next();
  })


  // Get specific character
  .get((req, res, next) => {
    req.collection.findOne({ _id: req.params.id })
      .then((mongoRes) => {
        if (!mongoRes) {
          next(new ApiError(404, `No character with the id ${req.params.id} found!`));
        }
        res.status(200).json(mongoRes);
      })
      .catch(err => next(err));
  })


  // Upsert character with given id
  .put((req, res, next) => {
    req.collection.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { returnOriginal: false, upsert: true },
    )
      .then(mongoRes => res.status(200).json(mongoRes.value))
      .catch(err => next(err));
  })


  // Delete character with given id
  .delete((req, res, next) => {
    req.collection.findOneAndDelete({ _id: req.params.id })
      .then(mongoRes => res.status(200).json(mongoRes._id))
      .catch(err => next(err));
  });


if (isProduction) {
  // Serve dist files in production mode
  console.log('Serve the production build');

  const staticFileMiddleware = express.static('dist');
  app.use(staticFileMiddleware);
  app.use(history({
    disableDotRule: true,
    verbose: false,
  }));
  app.use(staticFileMiddleware);
  app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'An unkown error occured!' });
  });
} else {
  app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message, stack: err.stack });
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
