/**
* Business.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    streetaddress: {
      type: 'string',
      required: true
    },

    city:{
      type: 'string',
      required: true
    },

    province:{
      type: 'string',
      required: true
    },

    category:{
      type: 'string',
      required: true
    },

    photos:{
      type: 'array',
      default: []
    }
  }
};

