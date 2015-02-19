/**
 * TorisPublic
 *
 * An angular module for Toris "frontoffice" pages (like `signup.ejs` or `homepage.ejs`)
 *
 * Usage:
 * ```
 * <div ng-app="TorisPublic"></div>
 * ```
 */

angular.module('TorisPublic', ['ngRoute', 'toastr', 'compareTo']);


angular.module('TorisPublic')
.config(function (toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: true,
    closeButton: false,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    positionClass: 'toast-top-right',
    tapToDismiss: true,
    timeOut: 2000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
});


angular.module('TorisPublic')
.config(['$httpProvider', function($httpProvider){

  $httpProvider.defaults.headers.common['X-CSRF-Token'] = window.SAILS_LOCALS._csrf;
}]);


 angular.module('TorisPublic')
 .config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'templates/public/home.html',
    controller: ['$scope', '$location', function($scope, $location) {
        $scope.showAllBusiness();
        $scope.showReviewBusiness("54e36a84e4b0e69a3d1e9f0b");
    }]
  })


  .when('/signup', {
    templateUrl: 'templates/public/signup.html',
    controller: ['$scope', '$location', function($scope, $location) {
       // ...
    }]
  })

  .when('/login', {
    templateUrl: 'templates/public/login.html',
    controller: ['$scope', '$location', function($scope, $location) {
       // ...
    }]
  })

  .when('/profile', {
    templateUrl: 'templates/public/profile.html',
    controller: ['$scope', '$location', function($scope, $location) {
       // ...
    }]
  })

  .when('/review', {
    templateUrl: 'templates/public/review.html',
    controller: ['$scope', '$location', function($scope, $location) {
       // ...
    }]
  })
   
  .when('/business/:id', {
    templateUrl: 'templates/public/show-business.html',
    controller: ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
      $scope.showBusinessProfile($routeParams.id);
      
      $scope.showReviewBusiness("54e36a84e4b0e69a3d1e9f0b");
      $scope.getTotalReview("54e36a84e4b0e69a3d1e9f0b");
    }]
  })

  .when('/business/category/:category', {
    templateUrl: 'templates/public/show-business-category.html',
    controller: ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
      $scope.selectedCategory = $routeParams.category;
      $scope.showBusinessCategory($routeParams.category);
    }]
  })
  
  //Testing route
  .when('/documentation', {
    templateUrl: 'templates/public/documentation.html',
    controller: ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
      $scope.showAllBusiness();
      $scope.showBusinessProfile("54e36513e4b0e69a3d1e9eb5");
      $scope.showBusinessCity("Magalang");
      $scope.showBusinessCategory("Restaurant");

      $scope.showReviewBusiness("54e36a84e4b0e69a3d1e9f0b");
      $scope.getTotalReview("54e36a84e4b0e69a3d1e9f0b");
    }]
  })

  .otherwise({
    redirectTo: '/'
  });
  
 }]);


