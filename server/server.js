const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const dbConnectionMiddleware = require('./middlewares/dbConnector');
const theDarkEye = require('./data/theDarkEye/charsheet');
const savageWorlds = require('./data/savageWorlds/charsheet');

const app = express();
const port = 8080;


// Middleware: Make mongoDb db object available in req.
app.use(dbConnectionMiddleware('mongodb://127.0.0.1:27017/charCreator'));

// Middleware: Parse request body to json.
app.use(bodyParser.json());

// This is not needed in production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

if (process.env.NODE_ENV === 'production') {
  console.log('Serve the production build');
  app.use(express.static('build'));
}

app.options('*', (req, res) => {
  res.status(200).send();
})

app.route('/api/users')

app.route('/api/thedarkeye')
  .get((req, res) => {
    res.json(theDarkEye);
  });

app.route('/api/savageworldsfantasy')
  .get((req, res) => {
    console.log('send this')
    res.status(200).json(savageWorlds);
  });

app.route('/api/savageworldsfantasy/characters')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters')
    next();
  })

  // Get all characters
  .get((req, res) => {
    req.collection.find({}).toArray()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err))
  })
  

// TODO add this kind of error handling to all endpoints
app.route('/api/savageworldsfantasy/characters/:id')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters')
    next();
  })


  // Get specific character
  .get((req, res) => {
    req.collection.findOne({ _id: req.params.id })
      .then(mongoRes => res.status(200).json(mongoRes))
      .catch(err => res.status(404).json(err))
  })


  // Upsert character with given id
  .put((req, res) => {
    req.collection.findOneAndReplace(
      { _id: req.params.id},
      req.body,
      { returnOriginal: false, upsert: true }
    )
      .then(mongoRes => res.status(200).json(mongoRes.value))
      .catch(err => { res.status(404).json(err) })
  })


  // Delete character with given id
  .delete((req, res) => {
    req.collection.findOneAndDelete({ _id: req.params.id })
      .then(mongoRes => res.status(200).json(mongoRes.value))
      .catch(err => res.status(404).json(err))
  })

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})