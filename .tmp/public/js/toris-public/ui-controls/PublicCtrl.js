angular.module('TorisPublic').controller('PublicCtrl', ['$scope', '$http', '$location', 'toastr', function($scope, $http, $location, toastr) {

  $scope.signupForm = {
    loading: false,
    topLevelErrorMessage: '',
    validationErrors: []
  };

  $scope.loginForm = {
    loading: false,
    topLevelErrorMessage: ''
  };

  //Business List - home.html
  $scope.businessList = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  //Business Profile - show-business.html
  $scope.businessProfile = {
    loading: false,
    errorMsg: '',
    contents: []
  };


  $scope.submitLoginForm = function (){
    $scope.loginForm.loading = true;
    $scope.loginForm.topLevelErrorMessage = null;

    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      console.log(sailsResponse);

      if (sailsResponse.status === 400 || 404) {
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

      // Otherwise, display generic error if the error is unrecognized.
      // $scope.loginForm.topLevelErrorMessage = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);

    })
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  };



  $scope.submitSignupForm = function (){
    $scope.signupForm.loading = true;
    $scope.signupForm.validationErrors = [];
    $scope.signupForm.topLevelErrorMessage = null;

    $http.post('/signup', {
      name: $scope.signupForm.name,
      title: $scope.signupForm.title,
      email: $scope.signupForm.email,
      password: $scope.signupForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      console.log(sailsResponse);
      var emailAddressAlreadyInUse = sailsResponse.status == 409;
      if (emailAddressAlreadyInUse) {
        toastr.error('That email address has already been taken, please try again.', 'Error');
        // $scope.signupForm.topLevelErrorMessage = 'Email address already in use.';
        return;
      }

      if (sailsResponse.data.raw.code === 11000) {
        toastr.error('That email address has already been taken, please try again.', 'Error');
      }

      // Otherwise, display generic error if the error is unrecognized.
      // $scope.signupForm.topLevelErrorMessage = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);

      // toastr.error('That email address has already been taken, please try again.', 'Error');
        // console.log("made it here");
    })
    .finally(function eitherWay(){
      $scope.signupForm.loading = false;
    });
  };

  $scope.showAllBusiness = function (){
      $scope.businessList.loading = true;
      $scope.businessList.errorMsg = '';
      
      io.socket.get('/businesses', function (data, jwr) {
        if (jwr.error) {
          $scope.businessList.errorMsg = 'An unexpected error occurred: '+(data||jwr.status);
          $scope.businessList.loading = false;
          return;
        }
        $scope.businessList.contents = data;
        $scope.businessList.loading = false;
        $scope.$apply();

        console.log(JSON.stringify($scope.businessList.contents,null,4));
      });
  };

  $scope.showBusinessProfile = function(id){
      $scope.businessProfile.loading = true;
      $scope.businessProfile.errorMsg = '';
      io.socket.get('/businesses/'+ id, function onResponse(data, jwr){
        if (jwr.error) {
          $scope.businessProfile.errorMsg = data||jwr.status;
          $scope.businessProfile.loading = false;
          return;
        }
        $scope.businessProfile.contents = data;
        $scope.businessProfile.loading = false;
        $scope.$apply();

        console.log(JSON.stringify($scope.businessProfile.contents,null,4));
      });
  }

}]);
