/**
 * User.js
 *
 * @description :: Each record in this model represents a user's account in Activity Overlord.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },


    encryptedPassword: {
      type: 'string'
    },


    lastActive: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

 
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

 
    admin: {
      type: 'boolean',
      defaultsTo: false
    },


    gravatarUrl: {
      type: 'string'
    }
  }

};
