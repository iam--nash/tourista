/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  destroy: function (req, res) {

    if (!req.param('id')){
      return res.badRequest('id is a required parameter.');
    }

    User.destroy({
      id: req.param('id')
    }).exec(function (err, usersDestroyed){
      if (err) return res.negotiate(err);
      if (usersDestroyed.length === 0) {
        return res.notFound();
      }

  
      User.publishDestroy(req.param('id'), undefined, {
        previous: {
          name: usersDestroyed[0].name
        }
      });

     
      _.each(User.subscribers(usersDestroyed[0]), function(socket) {
        User.unsubscribe(socket, usersDestroyed[0]);
      });

      return res.ok();
    });
  },




  findOne: function (req, res) {

    if (!req.param('id')){
      return res.badRequest('id is a required parameter.');
    }

    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

    
      if (req.isSocket) {
        User.subscribe(req, user.id);
      }


      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        title: user.title,
        gravatarUrl: user.gravatarUrl,
        admin: user.admin,
        lastLoggedIn: user.lastLoggedIn,

        msUntilInactive: (function (){
          var _msUntilLastActive;
          var now = new Date();
          _msUntilLastActive = (user.lastActive.getTime()+15*1000) - now.getTime();
          if (_msUntilLastActive < 0) {
            _msUntilLastActive = 0;
          }
          return _msUntilLastActive;
        })()
      }); 

    });
  },



  find: function (req, res) {

    User.watch(req);

    User.find().exec(function (err, users) {
      if (err) return res.negotiate(err);

      var prunedUsers = [];

      
      _.each(users, function (user){

        if (req.isSocket){
          User.subscribe(req, user.id);
        }

        prunedUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          title: user.title,
          gravatarUrl: user.gravatarUrl,
          admin: user.admin,
          lastLoggedIn: user.lastLoggedIn,

        
          msUntilInactive: (function (){
            var _msUntilLastActive;
            var now = new Date();
            _msUntilLastActive = (user.lastActive.getTime()+15*1000) - now.getTime();
            if (_msUntilLastActive < 0) {
              _msUntilLastActive = 0;
            }
            return _msUntilLastActive;
          })()
        });
      });

      return res.json(prunedUsers);
    });
  },




  comeOnline: function (req, res) {


    User.findOne(req.session.me).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        return res.notFound('User associated with socket "coming online" no longer exists.');
      }

 
      var INACTIVITY_TIMEOUT = 15*1000;

    
      User.update(user.id, {
        lastActive: new Date()
      }).exec(function (err){
        if (err) return res.negotiate(err);

    
        User.publishUpdate(req.session.me, {
          justBecameActive: true,
          msUntilInactive: INACTIVITY_TIMEOUT,
          name: user.name
        });

        return res.ok();
      });
    });
  },




  updateMyProfile: function (req, res) {

    (function _prepareAttributeValuesToSet(allParams, cb){
      var setAttrVals = {};

      if (allParams.name) {
        setAttrVals.name = allParams.name;
      }
      if (allParams.title) {
        setAttrVals.title = allParams.title;
      }
      if (allParams.email) {
        setAttrVals.email = allParams.email;
   
        setAttrVals.gravatarUrl = require('machinepack-gravatar').getImageUrl({
          emailAddress: allParams.email
        }).execSync();
      }

     
      if (!allParams.password) {
        return cb(null, setAttrVals);
      }
      require('machinepack-passwords').encryptPassword({password: allParams.password}).exec({
        error: function (err){
          return cb(err);
        },
        success: function (encryptedPassword){
          setAttrVals.encryptedPassword = encryptedPassword;
          return cb(null, setAttrVals);
        }
      });
    })(req.allParams(), function (err, attributeValsToSet){
      if (err) return res.negotiate(err);

      User.update(req.session.me, attributeValsToSet).exec(function (err){
        if (err) return res.negotiate(err);

     
        User.publishUpdate(req.session.me, {
          name: attributeValsToSet.name,
          email: attributeValsToSet.email,
          title: attributeValsToSet.title,
          gravatarUrl: attributeValsToSet.gravatarUrl
        });

     
        return res.ok({
          name: attributeValsToSet.name,
          email: attributeValsToSet.email,
          title: attributeValsToSet.title,
          gravatarUrl: attributeValsToSet.gravatarUrl
        });
      });
    });
  },




  update: function (req, res) {

    if (!req.param('id')) {
      return res.badRequest('`id` of user to edit is required');
    }

    (function _prepareAttributeValuesToSet(allParams, cb){

      var setAttrVals = {};
      if (allParams.name) {
        setAttrVals.name = allParams.name;
      }
      if (allParams.title) {
        setAttrVals.title = allParams.title;
      }
      if (allParams.email) {
        setAttrVals.email = allParams.email;
      
        setAttrVals.gravatarUrl = require('machinepack-gravatar').getImageUrl({
          emailAddress: allParams.email
        }).execSync();
      }

     
      if ( !_.isUndefined(allParams.admin) ) {
        setAttrVals.admin = allParams.admin;
      }


      if (!allParams.password) {
        return cb(null, setAttrVals);
      }
      require('machinepack-passwords').encryptPassword({password: allParams.password}).exec({
        error: function (err){
          return cb(err);
        },
        success: function (encryptedPassword) {
          setAttrVals.encryptedPassword = encryptedPassword;
          return cb(null, setAttrVals);
        }
      });
    })(req.allParams(), function afterwards (err, attributeValsToSet){
      if (err) return res.negotiate(err);

      User.update(req.param('id'), attributeValsToSet).exec(function (err){
        if (err) return res.negotiate(err);

       
        User.publishUpdate(req.param('id'), {
          name: attributeValsToSet.name,
          email: attributeValsToSet.email,
          title: attributeValsToSet.title,
          admin: attributeValsToSet.admin,
          gravatarUrl: attributeValsToSet.gravatarUrl
        });

        return res.ok();
      });
    });

  },



  login: function (req, res) {

    req.validate({
      email: 'string',
      password: 'string'
    });


    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

  
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

     
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

         
          User.update(user.id, {
            lastLoggedIn: new Date()
          }, function(err) {
            if (err) return res.negotiate(err);

          
            req.session.me = user.id;

          
            return res.ok();
          });
        }
      });
    });
  },




  logout: function (req, res) {

    
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      
      req.session.me = null;

    
      User.publishUpdate(user.id, {
        justLoggedOut: true,
        name: user.name
      });

    
      return res.backToHomePage();

    });
  },




  signup: function(req, res) {

   
    require('machinepack-passwords').encryptPassword({
      password: req.param('password')
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {

          
            User.create({
              name: req.param('name'),
              title: req.param('title'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {

               
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }

               
                return res.negotiate(err);
              }

         
              req.session.me = newUser.id;

          
              User.publishCreate({
                id: newUser.id,
                name: newUser.name,
                title: newUser.title,
                email: newUser.email,
                lastLoggedIn: newUser.lastLoggedIn
              });

            
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  }

};
