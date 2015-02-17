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
          street: business.streetaddress,
          city: business.city,
          province: business.province
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
        street: business.streetaddress,
        city: business.city,
        province: business.province
      });
    });
  }

};

