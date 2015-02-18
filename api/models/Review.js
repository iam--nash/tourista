/**
* Review.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	userId:{
  		type: "string",
  		required: true
  	},

  	businessId:{
  		type: "string",
  		required: true
  	},

  	review:{
  		type: "string",
  		required: true
  	},

    rating:{
      type: "string",
      required: true
    }
  }
};

