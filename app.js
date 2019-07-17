const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const db = mongoose.connection;

const JobOffer = require('./models/jobOfferSchema');
const jobOfferRouter = require('./routes/jobOfferRouter')(JobOffer);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});
 
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api', jobOfferRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
