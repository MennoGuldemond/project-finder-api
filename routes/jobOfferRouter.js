const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');

function routes(JobOffer) {
  const jobOfferRouter = express.Router();
  const controller = jobOfferController(JobOffer);

  jobOfferRouter.route('/jobOffer')
    .get(controller.get)
    .post(controller.post);

  jobOfferRouter.route('/jobOffer/tag/:tag')
    .get(controller.searchByTag);

  // JobOffer by id middelware
  jobOfferRouter.use('/jobOffer/:id', (req, res, next) => {
    JobOffer.findById(req.params.id, (err, jobOffer) => {
      if (err) {
        return res.send(err);
      }
      if (jobOffer) {
        req.jobOffer = jobOffer;
        return next();
      }
      return res.sendStatus(404);
    })
  });

  jobOfferRouter.route('/jobOffer/:id')
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.remove);



  return jobOfferRouter;
}

module.exports = routes;
