require('should');
const sinon = require('sinon');
const jobOfferController = require('../controllers/jobOfferController');

const res = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy()
}

describe('Job offer controller tests:', () => {
  describe('Post', () => {
    it('Should not allow an empty link on post', () => {
      const JobOffer = function(jobOffer) { this.save = () => {}};

      const req = {
        body: {
          title: 'Some job offer',
          description: 'This is a dummy job offer'
        }
      }

      const controller = jobOfferController(JobOffer);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Link is required').should.equal(true);
    });
    it('Should not allow an empty title on post', () => {
      const JobOffer = function(jobOffer) { this.save = () => {}};

      const req = {
        body: {
          description: 'This is a dummy job offer',
          link: 'www.google.nl'
        }
      }

      const controller = jobOfferController(JobOffer);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
