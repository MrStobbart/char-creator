const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const dbConnectionMiddleware = require('./middlewares/dbConnector');
const theDarkEye = require('./data/theDarkEye/charsheet');
const savageWorlds = require('./data/savageWorlds/charsheet');

const app = express();
const port = 8080;


// Middleware: Make mongoDb db object available in req.
app.use(dbConnectionMiddleware('mongodb://127.0.0.1:27017'));

// Middleware: Parse request body to json.
app.use(bodyParser.json());

// This is not needed in production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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
      .then(data => res.status(200).json({
        message: 'swFantasyCharacters found!',
        data: data
      }))
      .catch(err => res.status(400).json(err))
  })
  // Create new character
  .post((req, res) => {
    console.log('save char')
    req.collection.insertOne(req.body)
      .then(mongoRes => res.status(200).json({
        message: 'Entry created!',
        id: mongoRes.insertedId
      }))
      .catch(err => res.staus(400).json(err))
  })

app.route('/api/savageworldsfantasy/characters/:id')
  .all((req, res, next) => {
    req.collection = req.db.collection('swFantasyCharacters')
    if (req.params.id.length !== 24) {
      res.status(400).json({message: 'The id must be a 24 byte string!'})
    }
    next();
  })
  // Get specific character
  .get((req, res) => {
    req.collection.findOne({ _id: ObjectId(req.params.id) })
      .then(mongoRes => res.status(200).json({
          message: 'Entry found!',
          data: mongoRes
      }))
      .catch(err => res.status(404).json(err))
  })
  // Update character with given id
  .put((req, res) => {
    req.collection.findOneAndReplace(
      { _id: ObjectId(req.params.id)},
      req.body,
      { returnOriginal: false }
    )
      .then(mongoRes => res.status(200).json({
        message: 'Entry upserted!',
        data: mongoRes.value
      }))
      .catch(err => res.status(404).json(err))
  })
  // Delete character with given id
  .delete((req, res) => {
    req.collection.findOneAndDelete({ _id: ObjectId(req.params.id) })
      .then(mongoRes => res.status(200).json({
        message: 'Entry deleted!',
        data: mongoRes.value
      }))
      .catch(err => res.status(404).json(err))
  })

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})