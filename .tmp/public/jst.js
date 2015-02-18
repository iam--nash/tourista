this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/dashboard/businesses.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel panel-default">\r\n\r\n  <div class="panel-heading">\r\n    <h3>Business Administration</h3>\r\n  </div>\r\n\r\n  <div ng-show="businessList.errorMsg">\r\n    <h5>Oops!</h5>\r\n    <p>Looks like an error occurred.  Please try again later.</p>\r\n    <code>\r\n      {{businessList.errorMsg}}\r\n    </code>\r\n  </div>\r\n\r\n  <div ng-show="businessList.loading">\r\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n    <span>Loading businesses...</span>\r\n  </div>\r\n\r\n  <div ng-show="businessList.contents.length === 0">\r\n    <span>No businesses yet.</span>\r\n  </div>\r\n\r\n  <table class="table" ng-show="!businessList.loading && businessList.contents.length > 0">\r\n    <tr>\r\n      <th>ID</th>\r\n      <th>Name</th>\r\n      <th>Address</th>\r\n      <th>City</th>\r\n      <th></th>\r\n      <th></th>\r\n    </tr>\r\n    <tr ng-repeat="business in businessList.contents">\r\n      <td> {{business.id}} </td>\r\n      <td> {{business.name}} </td>\r\n      <td> {{business.street}} </td>\r\n      <td> {{business.city}} </td>\r\n      <td>\r\n        <a href="#/businesses/{{business.id}}" class="btn btn-sm btn-primary">Show</a>\r\n      </td>\r\n      <td>\r\n        <a href="#/businesses/{{business.id}}/edit" class="btn btn-sm btn-warning">Edit</a>\r\n      </td>\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/edit-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{userProfile.errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n\r\n<div class="col-md-6">\r\n  <div class="panel panel-default">\r\n    <div class="panel-heading">\r\n      <h4>Edit Profile</h4>\r\n    </div>\r\n    <div class="panel-body">\r\n      <form ng-submit="editUser(userProfile.properties.id)">\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Full name</label>\r\n          <input type="text" class="form-control" placeholder="e.g. Jon Snow" ng-model="userProfile.properties.name">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Title</label>\r\n          <input type="text" class="form-control" placeholder="e.g. Lord Commander, Night\'s Watch" ng-model="userProfile.properties.title">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Email address</label>\r\n          <input type="text" class="form-control" placeholder="jon@winterfell.net" ng-model="userProfile.properties.email">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Administrator?</label>\r\n          <input type="checkbox" class="form-control" ng-model="userProfile.properties.admin">\r\n        </div>\r\n\r\n        <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n          <span ng-show="userProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n          <span ng-show="userProfile.saving">Saving...</span>\r\n          <span ng-hide="userProfile.saving" class="btn-text">Save</span>\r\n        </button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/my-profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n<div ng-hide="userProfile.loading">\r\n\r\n  <div class="col-md-6">\r\n    <div class="panel panel-default">\r\n      <div class="panel-heading">\r\n        <h4>Edit Profile</h4>\r\n      </div>\r\n      <div class="panel-body">\r\n        <form ng-submit="editMyProfile()">\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your full name</label>\r\n            <input type="text" class="form-control" placeholder="e.g. Jon Snow" name="name" ng-model="userProfile.properties.name">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your title</label>\r\n            <input type="text" class="form-control" placeholder="e.g. Lord Commander, Night\'s Watch" name="title" ng-model="userProfile.properties.title">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your email address</label>\r\n            <input type="text" class="form-control" placeholder="jon@winterfell.net" name="email" ng-model="userProfile.properties.email">\r\n          </div>\r\n\r\n          <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n            <span ng-show="userProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n            <span ng-show="userProfile.saving">Saving...</span>\r\n            <span ng-hide="userProfile.saving" class="btn-text">Save</span>\r\n          </button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class="col-md-6">\r\n    <div class="panel panel-default">\r\n      <div class="panel-heading">\r\n        <h4>Change Password</h4>\r\n      </div>\r\n      <div class="panel-body">\r\n\r\n        <div class="alert alert-info toggle" ng-show="changePasswordForm.errorMsg">\r\n          <h5>Oops!</h5>\r\n          <p>Looks like an error occurred.  Please try again later.</p>\r\n          <code>\r\n            {{changePasswordForm.errorMsg}}\r\n          </code>\r\n        </div>\r\n\r\n        <form ng-submit="changeMyPassword()">\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Choose a password</label>\r\n            <input type="password" class="form-control" placeholder="at least 6 characters" name="password" ng-model="changePasswordForm.properties.password" id="password">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Re-enter your password</label>\r\n            <input type="password" class="form-control" placeholder="one more time" name="confirmation" ng-model="changePasswordForm.properties.confirmPassword">\r\n          </div>\r\n\r\n          <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n            <span ng-show="changePasswordForm.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n            <span ng-show="changePasswordForm.saving">Saving...</span>\r\n            <span ng-hide="changePasswordForm.saving" class="btn-text">Save</span>\r\n          </button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/show-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n<div ng-hide="userProfile.loading">\r\n  <div class="col-md-3">\r\n    <img ng-src="{{userProfile.properties.gravatarUrl}}"/>\r\n  </div>\r\n  <div class="col-md-3">\r\n    <h1> {{userProfile.properties.name}}</h1>\r\n    <h3> {{userProfile.properties.title}} </h3>\r\n    <a href="mailto:{{userProfile.properties.email}}">{{userProfile.properties.email}}</a>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/users.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel panel-default">\r\n\r\n  <div class="panel-heading">\r\n    <h3>User Administration</h3>\r\n  </div>\r\n\r\n  <div ng-show="userList.errorMsg">\r\n    <h5>Oops!</h5>\r\n    <p>Looks like an error occurred.  Please try again later.</p>\r\n    <code>\r\n      {{userList.errorMsg}}\r\n    </code>\r\n  </div>\r\n\r\n  <div ng-show="userList.loading">\r\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n    <span>Loading users...</span>\r\n  </div>\r\n\r\n  <div ng-show="userList.contents.length === 0">\r\n    <span>No users yet.</span>\r\n  </div>\r\n\r\n  <table class="table" ng-show="!userList.loading && userList.contents.length > 0">\r\n    <tr>\r\n      <th></th>\r\n      <th>ID</th>\r\n      <th>Name</th>\r\n      <th>Title</th>\r\n      <th>Email</th>\r\n      <th>Last Login</th>\r\n      <th></th>\r\n      <th></th>\r\n      <th></th>\r\n      <th></th>\r\n    </tr>\r\n    <tr ng-repeat="user in userList.contents">\r\n\r\n      <td>\r\n        <img ng-show="user.isActive" src="images/icon-online.png">\r\n        <img ng-show="!user.isActive" src="images/icon-offline.png">\r\n      </td>\r\n      <td> {{user.id}} </td>\r\n      <td> {{user.name}} </td>\r\n      <td> {{user.title}} </td>\r\n      <td> {{user.email}} </td>\r\n      <td> {{user.lastLoggedIn | timeAgo}} </td>\r\n\r\n      <td>\r\n        <img ng-show="user.admin" src="images/admin.png">\r\n        <img ng-show="!user.admin" src="images/pawn.png">\r\n      </td>\r\n\r\n      <td>\r\n        <a ng-hide="me.id == user.id" href="#/users/{{user.id}}" class="btn btn-sm btn-primary">Show</a>\r\n        <a ng-show="me.id == user.id" href="#/profile" class="btn btn-sm btn-primary">My Profile</a>\r\n      </td>\r\n\r\n      <td>\r\n        <a ng-hide="me.id == user.id" href="#/users/{{user.id}}/edit" class="btn btn-sm btn-warning">Edit</a>\r\n      </td>\r\n      \r\n      <td>\r\n        \r\n        <a ng-disabled="user.deleting" ng-hide="me.id == user.id" ng-click="deleteUser(user.id)" class="btn btn-sm btn-danger">\r\n          <span ng-show="!user.deleting">Delete</span>\r\n          <span class="overlord-loading-spinner fa fa-spinner" ng-show="user.deleting" ></span>\r\n          <span ng-show="user.deleting">Deleting...</span>\r\n        </a>\r\n\r\n      </td>\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/public/documentation.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<ul>\r\n\t\t<li ng-repeat="business in businessList.contents.photos">\r\n\t\t\t<img src="{{business}}" alt="">\r\n\t\t</li>\r\n\t</ul>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/public/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<h3>Show List of Businesses:</h3><hr/>\r\n\t<div ng-show="businessList.errorMsg">\r\n\t    <h5>Oops!</h5>\r\n\t    <p>Looks like an error occurred.  Please try again later.</p>\r\n\t    <code>\r\n\t      {{businessList.errorMsg}}\r\n\t    </code>\r\n  \t</div>\r\n  \t<div ng-show="businessList.loading">\r\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n    \t<span>Loading businesses...</span>\r\n  \t</div>\r\n  \t<div ng-show="businessList.contents.length === 0">\r\n    \t<span>No businesses yet.</span>\r\n  \t</div>\r\n\t<ul class="row" ng-show="!businessList.loading && businessList.contents.length > 0">\r\n\t\t<li ng-repeat="business in businessList.contents">\r\n\t\t\t<h4><a href="#/business/{{business.id}}">{{business.name}}</a></h4>\r\n\t\t\t<p>{{business.street}}, {{business.city}}, {{business.province}}</p>\r\n\t\t</li>\r\n\t<ul>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/public/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="container">\r\n        <form ng-submit="submitLoginForm()" class="col-md-6">\r\n              <!-- Error message -->\r\n            <ul ng-show="loginForm.topLevelErrorMessage" class="alert alert-danger">\r\n                <li>\r\n                  <span>{{loginForm.topLevelErrorMessage}}</span>\r\n                </li>\r\n            </ul>\r\n\r\n            <div class="form-group">\r\n                <input ng-model="loginForm.email" type="text" placeholder="Email" name="email" class="form-control">\r\n            </div>\r\n            <div class="form-group">\r\n                <input ng-model="loginForm.password" type="password" placeholder="Password" name="password" class="form-control">\r\n            </div>\r\n            <a href="#" class="pull-right">Forgot your password?</a><br/><br/>\r\n            <button type="submit" class="btn btn-success pull-right">\r\n                <span ng-show="!loginForm.loading">Sign in</span>\r\n                <span ng-show="loginForm.loading" class="fa fa-spinner"></span>\r\n                <span ng-show="loginForm.loading">Signing in...</span>\r\n            </button>\r\n            <input type="hidden" name="_csrf" value="' +
((__t = ( _csrf )) == null ? '' : __t) +
'" />\r\n        </form>\r\n      \r\n        <div class="col-md-6">\r\n\r\n            <center>\r\n                <h3>No Account Yet?</h3>\r\n                <a href="#/signup" class="btn btn-success">Signup Now!</a><br/><br/>\r\n                <p>\r\n                    Toris is the fun and easy way to find, review and talk about what\'s great - and not so great - in your local area. It\'s about real people giving their honest and personal opinions on everything from restaurants and spas to coffee shops and bars.\r\n                </p>\r\n            </center>\r\n        </div>\r\n    </div>';

}
return __p
};

this["JST"]["assets/templates/public/profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<h3>Please login to view this page!</h3>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/public/review.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<h3>Please login to view this page!</h3>\r\n</div>';

}
return __p
};

this["JST"]["assets/templates/public/show-business.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n  <!-- Error state -->\r\n  <div ng-show="businessProfile.errorMsg">\r\n    <h5>Oops!</h5>\r\n    <p>Looks like an error occurred.  Please try again later.</p>\r\n    <code>\r\n      {{errorMsg}}\r\n    </code>\r\n  </div>\r\n\r\n  <!-- Loading state -->\r\n  <div ng-show="businessProfile.loading">\r\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n    <span>Loading business data...</span>\r\n  </div>\r\n\r\n  <div ng-hide="businessProfile.loading">\r\n        <h4>{{businessProfile.contents.name}}</h4>\r\n        <p>{{businessProfile.contents.street}}, {{businessProfile.contents.city}}, {{businessProfile.contents.province}}</p>\r\n  </div> \r\n\r\n</div>\r\n\r\n\r\n\r\n';

}
return __p
};

this["JST"]["assets/templates/public/signup.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="container">\r\n      <form ng-submit="submitSignupForm()" id="sign-up-form" class="form-signin" name="signup">\r\n        <h2 class="form-signin-heading">Sign up for Torist</h2>\r\n        <ul ng-show="signupForm.topLevelErrorMessage" class="alert alert-danger">\r\n          <li>\r\n            <span>{{signupForm.topLevelErrorMessage}}</span>\r\n          </li>\r\n        </ul>\r\n\r\n        <ul ng-show="signupForm.validationErrors.length > 0" class="alert alert-danger">\r\n          <li ng-repeat="error in signupForm.validationErrors track by $index">\r\n            <span>{{error}}</span>\r\n          </li>\r\n        </ul>\r\n        \r\n        <div class="row">\r\n          <!-- N A M E -->\r\n\r\n          <div class="control-group form-group col-md-12"\r\n          ng-class="{\'has-error\':signup.name.$invalid &&\r\n                                signup.name.$dirty}">\r\n            <label>Name</label>\r\n\r\n            <!-- For this input field make it required, and have a min and max length -->\r\n            <input type="text" class="form-control" placeholder="e.g. Juan Tamad" name="name" ng-model="signupForm.name" required>\r\n\r\n            <!-- Also, if signup.name.$dirty is true, show the message depending upon the particular properties truthiness (e.g. required\r\n            and/or minlength) -->\r\n            <span class="help-block has-error" ng-if="signup.name.$dirty">\r\n              <span ng-show="signup.name.$error.required">Name is required.</span>\r\n            </span>\r\n          </div>\r\n\r\n          <!-- T I T L E -->\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Title</label>\r\n            <input type="text" class="form-control" placeholder="e.g. Lord Commander, Night\'s Watch" name="title" ng-model="signupForm.title">\r\n            <span class="help-block has-error" ng-if="signup.name.$dirty">\r\n              <span ng-show="signup.name.$error.required">Title is required.</span>\r\n            </span>\r\n          </div>\r\n\r\n          <!-- E M A I L -->\r\n\r\n          <div class="control-group form-group col-md-12"\r\n          ng-class="{\'has-error\':signup.email.$invalid &&\r\n                                signup.email.$dirty}">\r\n            <label>Email Address</label>\r\n            <input type="email" class="form-control" placeholder="juan@tamad.com" name="email" ng-model="signupForm.email" required>\r\n            <span class="help-block has-error" ng-if="signup.email.$dirty">\r\n              <span ng-show="signup.email.$error.required">Email address is required.</span>\r\n              <span ng-show="signup.email.$error.email">Not a valid email address.</span>\r\n            </span>\r\n          </div>\r\n\r\n          <!-- P A S S W O R D -->\r\n\r\n          <div class="control-group form-group col-md-6"\r\n          ng-class="{\'has-error\':signup.password.$invalid &&\r\n                                signup.password.$dirty}">\r\n            <label>Choose a password</label>\r\n            <!-- Added the compareTo directive that compares the passowrds -->\r\n            <input type="password" class="form-control" placeholder="at least 6 characters" name="password" ng-model="signupForm.password" id="password" required ng-minlength="5" compare-to="signupForm.confirmPassword" >\r\n            <span class="help-block has-error" ng-if="signup.email.$dirty">\r\n              <span ng-show="signup.password.$error.required">Password is required.</span>\r\n              <span ng-show="signup.password.$error.minlength">Password must be at least 6 characters.</span>\r\n              <span ng-show="signup.password.$error.minlength">Password must be at least 6 characters.</span>\r\n            </span>\r\n          </div>\r\n\r\n          <!-- C O N F I R M  P A S S W O R D -->\r\n\r\n          <div class="control-group form-group col-md-6">\r\n            <label>Re-enter your password</label>\r\n            <input type="password" class="form-control" placeholder="re-enter password" name="confirmation" ng-model="signupForm.confirmPassword" required>\r\n            <span class="help-block has-error" ng-if="signup.confirmation.$dirty">\r\n              <span ng-show="signup.password.$error.compareTo">Password must match.</span>\r\n              <span ng-show="signup.confirmation.$error.required">Confirmation password is required.</span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class="row">\r\n          <!-- Disable signup button until the form has no errors -->\r\n          <div class="col-md-12">\r\n              <button class="btn btn-primary btn-lg btn-block" type="submit" ng-disabled="signup.$invalid">\r\n                <span ng-show="!signupForm.loading">Create Account</span>\r\n                <span class="overlord-loading-spinner fa fa-spinner" ng-show="signupForm.loading" ></span>\r\n                <span ng-show="signupForm.loading">Preparing your new account...</span>\r\n              </button>\r\n\r\n              <input type="hidden" name="_csrf" value="' +
((__t = ( _csrf )) == null ? '' : __t) +
'" />\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>';

}
return __p
};