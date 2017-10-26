const express = require('express');
const bodyParser = require('body-parser');

const mundanChar = require('./data/theDarkEye/mundanChar');

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  console.log('Serve the production build');
  app.use(express.static('build'));
}

app.route('/api/thedarkeye/mundanchar')
  .get((req, res) => {
    res.json(mundanChar);
  });


app.listen(8080, () => {
  console.log('Server started on port 8080');
})