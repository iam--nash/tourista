angular.module('TorisDashboard', ['ngRoute', 'toastr']);

angular.module('TorisDashboard')
.config(function(toastrConfig) {
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


angular.module('TorisDashboard')
.config(['$httpProvider', function($httpProvider){

  $httpProvider.defaults.headers.common['X-CSRF-Token'] = window.SAILS_LOCALS._csrf;
}]);


angular.module('TorisDashboard')

.filter('timeAgo', function() {

  var timeAgoFilter = function (date) {
    return moment(date).fromNow();
  };

  return timeAgoFilter;

});



angular.module('TorisDashboard')
.config(['$routeProvider', function($routeProvider) {

  $routeProvider


  .when('/', {
    template: '',
   
    controller: ['$scope', '$location', function($scope, $location) {
      if ($scope.me.isAdmin) {

        $location.path('/users');
        $location.replace();
        return;
      }

      $location.path('/profile');
      $location.replace();
      return;
    }]
  })

  .when('/users', {
    templateUrl: 'templates/dashboard/users.html',
    controller: ['$scope', '$location', '$http', function($scope, $location, $http) {
      if (!$scope.me.isAdmin) {
        $location.path('/');
        $location.replace();
        return;
      }

     
      $scope.userList.loading = true;
      $scope.userList.errorMsg = '';
      io.socket.get('/users', function (data, jwr) {
        if (jwr.error) {
      
          $scope.userList.errorMsg = 'An unexpected error occurred: '+(data||jwr.status);

          $scope.userList.loading = false;
          return;
        }
      
        $scope.userList.contents = data;

        
        var currentUser = _.find($scope.userList.contents, {id: $scope.me.id});
        currentUser.isActive = true;

   
        var activeUsers = _.each($scope.userList.contents, function (user){
          if (user.msUntilInactive > 0){
            user.isActive = true;
          }
        });

  
        $scope.userList.loading = false;

   
        $scope.$apply();
      });
    }]
  })



  .when('/users/:id', {
    templateUrl: 'templates/dashboard/show-user.html',
    controller: ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
  
      if (!$scope.me.isAdmin) {
        $location.path('/');
        $location.replace();
        return;
      }


      $scope.userProfile.loading = false;
      $scope.userProfile.errorMsg = '';
      io.socket.get('/users/'+$routeParams.id, function onResponse(data, jwr){
        if (jwr.error) {
          $scope.userProfile.errorMsg = data||jwr.status;
          $scope.userProfile.loading = false;
          return;
        }
        angular.extend($scope.userProfile.properties, data);
        $scope.userProfile.loading = false;
        $scope.$apply();
      });

    }]
  })


  .when('/users/:id/edit', {
    templateUrl: 'templates/dashboard/edit-user.html',
    controller: ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {

      if (!$scope.me.isAdmin) {
        $location.path('/');
        $location.replace();
        return;
      }


    
      $scope.userProfile.loading = false;
      $scope.userProfile.errorMsg = '';
      $http.get('/users/'+$routeParams.id)
      .then(function onSuccess(res){
        angular.extend($scope.userProfile.properties, res.data);
      })
      .catch(function onError(res){
        $scope.userProfile.errorMsg = res.data||res.status;
      })
      .finally(function eitherWay(){
        $scope.userProfile.loading = false;
      });
    }]
  })


 
  .when('/profile', {
    templateUrl: 'templates/dashboard/my-profile.html',
    controller: ['$scope', '$location', '$http', function($scope, $location, $http) {

     
      $scope.userProfile.loading = false;

     
      io.socket.get('/users/'+$scope.me.id, function onResponse(data, jwr){
        if (jwr.error){
          console.error('Unexpected error from Sails:', jwr.error);
          return;
        }
       
      });

      angular.extend($scope.userProfile.properties, $scope.me);

    }]
  })



  // #/business
  .when('/businesses', {
    templateUrl: 'templates/dashboard/businesses.html',
    controller: ['$scope', '$location', '$http', function($scope, $location, $http) {
      if (!$scope.me.isAdmin) {
        $location.path('/');
        $location.replace();
        return;
      }

      $scope.businessList.loading = true;
      $scope.businessList.errorMsg = '';
      
      io.socket.get('/businesses', function (data, jwr) {
        if (jwr.error) {
          // Display generic error, since there are no expected errors.
          $scope.businessList.errorMsg = 'An unexpected error occurred: '+(data||jwr.status);

          // Hide loading spinner
          $scope.businessList.loading = false;
          return;
        }
        // Populate the userList with the newly fetched users.
        $scope.businessList.contents = data;


        // Hide loading spinner
        $scope.businessList.loading = false;

        // Because `io.socket.on` isn't `io.socket.$on` or something
        // we have to do this to render our changes into the DOM.
        $scope.$apply();
      });
    }]
  })



  // #/?????     (i.e. anything else)
  .otherwise({
    redirectTo: '/'
  });

}]);
