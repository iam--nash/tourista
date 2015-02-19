/**
 * BusinessController
 *
 * @description :: Server-side logic for managing Businesses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	find: function (req, res) {

    Business.find().exec(function (err, businesses) {
      if (err) return res.negotiate(err);

      var prunedBusinesses = [];

      _.each(businesses, function (business){
        prunedBusinesses.push({
          id: business.id,
          name: business.name,
          description: business.description,
          street: business.streetaddress,
          city: business.city,
          province: business.province,
          category: business.category,
          photos: business.photos
        });
      });

      // Finally, send array of users in the response
      return res.json(prunedBusinesses);
    });
  },

  findOne: function (req, res) {

    if (!req.param('id')){
      return res.badRequest('id is a required parameter.');
    }

    Business.findOne(req.param('id')).exec(function (err, business) {
      if (err) return res.negotiate(err);
      if (!business) return res.notFound();

      return res.json({
        id: business.id,
        name: business.name,
        description: business.description,
        street: business.streetaddress,
        city: business.city,
        province: business.province,
        category: business.category,
        photos: business.photos
      });
    });
  },

  findByCity: function (req, res) {

    if (!req.param('city')){
      return res.badRequest('city is a required parameter.');
    }
   
    Business.find({city: req.param('city')}).exec(function (err, businesses) {
      if (err) return res.negotiate(err);

      var prunedBusinesses = [];

      _.each(businesses, function (business){
        prunedBusinesses.push({
          id: business.id,
          name: business.name,
          description: business.description,
          street: business.streetaddress,
          city: business.city,
          province: business.province,
          category: business.category,
          photos: business.photos
        });
      });

      // Finally, send array of users in the response
      return res.json(prunedBusinesses);
    });
  },

  findByCategory: function(req,res){
    if(!req.param('category')){
      return res.badRequest('category is a required parameter.');
    }

    Business.find({category: req.param('category')}).exec(function (err, businesses) {
      if (err) return res.negotiate(err);

      var prunedBusinesses = [];

      _.each(businesses, function (business){
        prunedBusinesses.push({
          id: business.id,
          name: business.name,
          description: business.description,
          street: business.streetaddress,
          city: business.city,
          province: business.province,
          category: business.category,
          photos: business.photos
        });
      });

      // Finally, send array of users in the response
      return res.json(prunedBusinesses);
    });
  }

};

