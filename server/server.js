const express = require('express');
const bodyParser = require('body-parser');

const theDarkEye = require('./data/theDarkEye/charsheet');
const savageWorlds = require('./data/savageWorlds/charsheet');

const app = express();

app.use(bodyParser.json());

// This is not needed in production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header({ 'Content-Type': 'application/json' });
  next();
});

if (process.env.NODE_ENV === 'production') {
  console.log('Serve the production build');
  app.use(express.static('build'));
}

app.route('/api/thedarkeye')
  .get((req, res) => {
    res.json(theDarkEye);
  });

app.route('/api/savageworlds')
  .get((req, res) => {
    res.json(savageWorlds);
  });

app.listen(8080, () => {
  console.log('Server started on port 8080');
})