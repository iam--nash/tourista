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
          center:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          marker:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          photos: business.photos,
          dateCreated: business.createdAt
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
        center:{
          latitude: business.map.latitude,
          longitude: business.map.longitude
        },
        marker:{
          latitude: business.map.latitude,
          longitude: business.map.longitude
        },
        photos: business.photos,
        dateCreated: business.createdAt
      });
    });
  },

  delete: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('`id` of business to delete is required');
    }

    Business.destroy({
      id: req.param('id')
    }).exec(function (err, businessDestroyed){
      if (err) return res.negotiate(err);
      if (businessDestroyed.length === 0) {
        return res.notFound();
      }

      return res.ok();
    });
  },

  update: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('`id` of business to edit is required');
    }

    Business.update(req.param('id'), req.params.all(), function businessUpdated(err, newBusiness){
      if(err){
        console.log(err);
      }
      return res.json({
        business: newBusiness
      })
    });
  },

  createBusiness: function(req,res){
      Business.create({
        name: req.param('name'),
        description: req.param('description'),
        streetaddress: req.param('street'),
        city: req.param('city'),
        province: req.param('province'),
        category: req.param('category'),
        photos: ["images/image-business/restaurantimage1.jpg"],
        map: req.param('map')
      },function businessCreated(err, newBusiness){
        if(err) return res.negotiate(err);

        console.log("success");
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
          center:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          marker:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          photos: business.photos,
          dateCreated: business.createdAt
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
          center:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          marker:{
            latitude: business.map.latitude,
            longitude: business.map.longitude
          },
          photos: business.photos,
          dateCreated: business.createdAt
        });
      });

      // Finally, send array of users in the response
      return res.json(prunedBusinesses);
    });
  }

};

