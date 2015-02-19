/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  'GET /': 'PageController.showHomePage',

  //User API
  'POST /signup': 'UserController.signup',
  'PUT /login': 'UserController.login',
  '/logout': 'UserController.logout',
  'GET /users': 'UserController.find',
  'GET /users/:id': 'UserController.findOne',
  'PUT /users/:id': 'UserController.update',
  'DELETE /users/:id': 'UserController.destroy',
  'PUT /me/online': 'UserController.comeOnline',
  'PUT /me': 'UserController.updateMyProfile',

  //Business API
  'GET /businesses': 'BusinessController.find',
  'GET /businesses/:id': 'BusinessController.findOne',
  'PUT /businesses/:id': 'BusinessController.update',
  'DELETE /businesses/:id': 'BusinessController.delete',
  'GET /businesses/city/:city': 'BusinessController.findByCity',
  'GET /businesses/category/:category': 'BusinessController.findByCategory',
  

  //Review API
  'GET /reviews/business/:id': 'ReviewController.findByBusiness',
  'GET /reviews/business/count/:id': 'ReviewController.getTotalReview',
  'GET /reviews/business/rating/:id': 'ReviewController.getAverageRating',
  'POST /reviews/new':'ReviewController.createReview'



};
