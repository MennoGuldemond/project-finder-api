const mongoose = require('mongoose');

const JobOfferSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    tags: []
  }
);

module.exports = mongoose.model('JobOffer', JobOfferSchema);
