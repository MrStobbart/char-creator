const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/api/')

app.listen(3000, () => {
  console.log('Server started on port 3000');
})