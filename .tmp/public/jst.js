this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/dashboard/edit-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\r\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{userProfile.errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n<!-- Loading state -->\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n\r\n<div class="col-md-6">\r\n  <div class="panel panel-default">\r\n    <div class="panel-heading">\r\n      <h4>Edit Profile</h4>\r\n    </div>\r\n    <div class="panel-body">\r\n      <form ng-submit="editUser(userProfile.properties.id)">\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Full name</label>\r\n          <input type="text" class="form-control" placeholder="e.g. Jon Snow" ng-model="userProfile.properties.name">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Title</label>\r\n          <input type="text" class="form-control" placeholder="e.g. Lord Commander, Night\'s Watch" ng-model="userProfile.properties.title">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Email address</label>\r\n          <input type="text" class="form-control" placeholder="jon@winterfell.net" ng-model="userProfile.properties.email">\r\n        </div>\r\n\r\n        <div class="control-group form-group col-md-12">\r\n          <label>Administrator?</label>\r\n          <input type="checkbox" class="form-control" ng-model="userProfile.properties.admin">\r\n        </div>\r\n\r\n        <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n          <span ng-show="userProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n          <span ng-show="userProfile.saving">Saving...</span>\r\n          <span ng-hide="userProfile.saving" class="btn-text">Save</span>\r\n        </button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/example-page.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=" col-md-8 col-md-offset-2">\r\n  <div class="jumbotron">\r\n    <h1>You could have another "page" here</h1>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/my-profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\r\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n<!-- Loading state -->\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n<div ng-hide="userProfile.loading">\r\n\r\n  <div class="col-md-6">\r\n    <div class="panel panel-default">\r\n      <div class="panel-heading">\r\n        <h4>Edit Profile</h4>\r\n      </div>\r\n      <div class="panel-body">\r\n        <form ng-submit="editMyProfile()">\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your full name</label>\r\n            <input type="text" class="form-control" placeholder="e.g. Jon Snow" name="name" ng-model="userProfile.properties.name">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your title</label>\r\n            <input type="text" class="form-control" placeholder="e.g. Lord Commander, Night\'s Watch" name="title" ng-model="userProfile.properties.title">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Your email address</label>\r\n            <input type="text" class="form-control" placeholder="jon@winterfell.net" name="email" ng-model="userProfile.properties.email">\r\n          </div>\r\n\r\n          <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n            <span ng-show="userProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n            <span ng-show="userProfile.saving">Saving...</span>\r\n            <span ng-hide="userProfile.saving" class="btn-text">Save</span>\r\n          </button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class="col-md-6">\r\n    <div class="panel panel-default">\r\n      <div class="panel-heading">\r\n        <h4>Change Password</h4>\r\n      </div>\r\n      <div class="panel-body">\r\n\r\n        <!-- Error state -->\r\n        <div class="alert alert-info toggle" ng-show="changePasswordForm.errorMsg">\r\n          <h5>Oops!</h5>\r\n          <p>Looks like an error occurred.  Please try again later.</p>\r\n          <code>\r\n            {{changePasswordForm.errorMsg}}\r\n          </code>\r\n        </div>\r\n\r\n        <form ng-submit="changeMyPassword()">\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Choose a password</label>\r\n            <input type="password" class="form-control" placeholder="at least 6 characters" name="password" ng-model="changePasswordForm.properties.password" id="password">\r\n          </div>\r\n\r\n          <div class="control-group form-group col-md-12">\r\n            <label>Re-enter your password</label>\r\n            <input type="password" class="form-control" placeholder="one more time" name="confirmation" ng-model="changePasswordForm.properties.confirmPassword">\r\n          </div>\r\n\r\n          <button type="submit" class="btn btn-lg btn-primary btn-block">\r\n            <span ng-show="changePasswordForm.saving" class="overlord-loading-spinner fa fa-spinner"></span>\r\n            <span ng-show="changePasswordForm.saving">Saving...</span>\r\n            <span ng-hide="changePasswordForm.saving" class="btn-text">Save</span>\r\n          </button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/show-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\r\n<div ng-show="userProfile.errorMsg">\r\n  <h5>Oops!</h5>\r\n  <p>Looks like an error occurred.  Please try again later.</p>\r\n  <code>\r\n    {{errorMsg}}\r\n  </code>\r\n</div>\r\n\r\n<!-- Loading state -->\r\n<div ng-show="userProfile.loading">\r\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n  <span>Loading user data...</span>\r\n</div>\r\n\r\n<div ng-hide="userProfile.loading">\r\n  <div class="col-md-3">\r\n    <img ng-src="{{userProfile.properties.gravatarUrl}}"/>\r\n  </div>\r\n  <div class="col-md-3">\r\n    <h1> {{userProfile.properties.name}}</h1>\r\n    <h3> {{userProfile.properties.title}} </h3>\r\n    <a href="mailto:{{userProfile.properties.email}}">{{userProfile.properties.email}}</a>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/dashboard/users.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel panel-default">\r\n\r\n  <div class="panel-heading">\r\n    <h3>User Administration</h3>\r\n  </div>\r\n\r\n  <!-- Error state -->\r\n  <div ng-show="userList.errorMsg">\r\n    <h5>Oops!</h5>\r\n    <p>Looks like an error occurred.  Please try again later.</p>\r\n    <code>\r\n      {{userList.errorMsg}}\r\n    </code>\r\n  </div>\r\n\r\n  <!-- Loading state -->\r\n  <div ng-show="userList.loading">\r\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\r\n    <span>Loading users...</span>\r\n  </div>\r\n\r\n  <!-- Empty state -->\r\n  <div ng-show="userList.contents.length === 0">\r\n    <!--\r\n    Note that this empty state will never actually matter because there\r\n    will always be at least one user (the currently-logged-in admin).\r\n    -->\r\n    <span>No users yet.</span>\r\n  </div>\r\n\r\n  <table class="table" ng-show="!userList.loading && userList.contents.length > 0">\r\n    <tr>\r\n      <th></th>\r\n      <th>ID</th>\r\n      <th>Name</th>\r\n      <th>Title</th>\r\n      <th>Email</th>\r\n      <th>Last Login</th>\r\n      <th></th>\r\n      <th></th>\r\n      <th></th>\r\n      <th></th>\r\n    </tr>\r\n    <tr ng-repeat="user in userList.contents">\r\n\r\n      <td>\r\n        <img ng-show="user.isActive" src="images/icon-online.png">\r\n        <img ng-show="!user.isActive" src="images/icon-offline.png">\r\n      </td>\r\n      <td> {{user.id}} </td>\r\n      <td> {{user.name}} </td>\r\n      <td> {{user.title}} </td>\r\n      <td> {{user.email}} </td>\r\n      <td> {{user.lastLoggedIn | timeAgo}} </td>\r\n\r\n      <td>\r\n        <img ng-show="user.admin" src="images/admin.png">\r\n        <img ng-show="!user.admin" src="images/pawn.png">\r\n      </td>\r\n\r\n      <td>\r\n        <!-- Don\'t display the "show" button if this user is YOU (the visitor) -->\r\n        <a ng-hide="me.id == user.id" href="#/users/{{user.id}}" class="btn btn-sm btn-primary">Show</a>\r\n        <!-- Instead show "My Profile" button -->\r\n        <a ng-show="me.id == user.id" href="#/profile" class="btn btn-sm btn-primary">My Profile</a>\r\n      </td>\r\n      <!-- <td><span ng-click="getProfile()" class="btn btn-sm btn-primary pointer">Show</span></td> -->\r\n\r\n      <td>\r\n        <!-- Don\'t show edit button if this user is YOU (the visitor) -->\r\n        <a ng-hide="me.id == user.id" href="#/users/{{user.id}}/edit" class="btn btn-sm btn-warning">Edit</a>\r\n      </td>\r\n      <!-- <td><span ng-click="editUser()" class="btn btn-sm btn-primary pointer">Edit</span></td> -->\r\n\r\n      <td>\r\n        <!-- Don\'t show delete button if this user is YOU (the visitor) -->\r\n        <a ng-disabled="user.deleting" ng-hide="me.id == user.id" ng-click="deleteUser(user.id)" class="btn btn-sm btn-danger">\r\n          <span ng-show="!user.deleting">Delete</span>\r\n          <span class="overlord-loading-spinner fa fa-spinner" ng-show="user.deleting" ></span>\r\n          <span ng-show="user.deleting">Deleting...</span>\r\n        </a>\r\n\r\n      </td>\r\n      <!-- <td>\r\n        <form action="/user/destroy/1" method="POST">\r\n          <input type="hidden" name="_method" value="delete"/>\r\n          <input type="submit" class="btn btn-sm btn-danger" value="Delete"/>\r\n          <input type="hidden" name="_csrf" value="_csrf"  />\r\n        </form>\r\n      </td> -->\r\n    </tr>\r\n\r\n  </table>\r\n</div>\r\n';

}
return __p
};

this["JST"]["assets/templates/public/jumbotron.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=" col-md-8 col-md-offset-2">\r\n  <div class="jumbotron">\r\n    <h1>the Main App</h1>\r\n    <h2>...tracking app activity better than the NSA since 1899.</h2>\r\n  </div>\r\n</div>\r\n';

}
return __p
};