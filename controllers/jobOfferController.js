function jobOfferController(JobOffer) {

  function get(req, res) {
    JobOffer.find((err, jobOffers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(jobOffers);
    })
  };

  function post(req, res) {
    const jobOffer = new JobOffer(req.body);

    if (!req.body.title || req.body.title === '') {
      res.status(400);
      return res.send('Title is required');
    }

    if (!req.body.link || req.body.link === '') {
      res.status(400);
      return res.send('Link is required');
    }

    jobOffer.save();
    res.status(201);
    return res.json(jobOffer);
  };

  function getById(req, res) {
    return res.json(req.jobOffer);
  };

  function put(req, res) {
    const jobOffer = req.jobOffer;
    jobOffer.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(jobOffer);
    });
  };

  function patch(req, res) {
    const jobOffer = req.jobOffer;
    jobOffer.title = req.body.title || jobOffer.title;
    jobOffer.description = req.body.description || jobOffer.description;
    jobOffer.link = req.body.link || jobOffer.link;
    jobOffer.tags = req.body.tags || jobOffer.tags;
    jobOffer.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(jobOffer);
    });
  };

  function remove(req, res) {
    req.jobOffer.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  };

  function searchByTag(req, res) {
    JobOffer.find({ tags: req.params.tag }, (err, jobOffers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(jobOffers);
    });
  }

  return { get, post, getById, put, patch, remove, searchByTag };
}

module.exports = jobOfferController;
