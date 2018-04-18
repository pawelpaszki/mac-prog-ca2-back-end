const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

function configureDB() {
  return process.env.MONGODB_URI;
}

mongoose.connect(configureDB());

const app = express();

// Enable CORS for all requests
app.use(cors());

// allow serving of static files from the public directory

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const routes = require('./routes');

app.get('/', routes.index);

require('./routes/muscles')(app);

const port = process.env.PORT || 8001;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});

module.exports = app;
