/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findByBusiness: function (req, res) {

    if (!req.param('id')){
      return res.badRequest('businessId is a required parameter.');
    }
   
    Review.find({businessId: req.param('id')}).exec(function (err, reviews) {
      if (err) return res.negotiate(err);

      var prunedReviews = [];

      _.each(reviews, function (review){
        prunedReviews.push({
          id: review.id,
          businessid: review.businessId,
          userid: review.userId,
          review: review.review
        });
      });

      // Finally, send array of users in the response
      return res.json(prunedReviews);
    });
  },
};