/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function (req, res) {

	    Review.find().exec(function (err, reviews) {
	      if (err) return res.negotiate(err);

	      var prunedReviews = [];

	      _.each(reviews, function (review){
	        prunedReviews.push({
	          id: review.id,
	          businessid: review.businessId,
	          userid: review.userId,
	          review: review.review,
	          rating: review.rating,
	          dateCreated: review.createdAt
	        });
	      });

	      // Finally, send array of users in the response
	      return res.json(prunedReviews);
	    });
	  },


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
	          rating: review.rating,
	          dateCreated: review.createdAt
	        });
	      });

	      // Finally, send array of users in the response
	      return res.json(prunedReviews);
	    });	
	},

	getAverageRating: function(req, res){
		if (!req.param('id')){
	      return res.badRequest('businessId is a required parameter.');
	    }
	    var totalrating = 0;
	    var count = 0;
	    var averagerating = 0;
	    Review.find({businessId: req.param('id')}).exec(function (err, reviews) {
	      if (err) return res.negotiate(err);


	      _.each(reviews, function (review){
	      		totalrating = totalrating + Number(review.rating);
	      		count = count + 1;
	      });

	      averagerating = totalrating/count;

	      return res.json({
	      	averagerate:averagerating
	      });
	    });	
	},
	
	getTotalReview: function(req,res){
		if (!req.param('id')){
	      return res.badRequest('businessId is a required parameter.');
	    }

		Review.count({businessId: req.param('id')}).exec(function(err, count){
			return res.json({
				numCount: count
			});
		});
	},

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