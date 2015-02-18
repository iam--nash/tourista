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
	          review: review.review,
	          dateCreated: review.createdAt
	        });
	      });

	      // Finally, send array of users in the response
	      return res.json(prunedReviews);
	    });	
	},

	getTotalReview: function(req, res){
		if (!req.param('id')){
	      return res.badRequest('businessId is a required parameter.');
	    }

		Review.count({businessId: req.param('id')}).exec(function(err, count){
			return res.json({
				numCount: count
			});
		});
	},
	/*
	getAverageRating: function(req,res){
		if (!req.param('id')){
	      return res.badRequest('businessId is a required parameter.');
	    }

		Review.count({businessId: req.param('id')}).exec(function(err, count){
			return res.json({
				numCount: count
			});
		});
	},*/

  	createReview: function(req,res){
  		Review.create({
  			userId: req.param('userid'),
  			businessId: req.param('businessid'),
  			review: req.param('review'),
  			rating: req.param('rating')
  		},function reviewCreated(err, newReview){
  			if(err) return res.negotiate(err);

  			console.log("success");
  		});
	}
};