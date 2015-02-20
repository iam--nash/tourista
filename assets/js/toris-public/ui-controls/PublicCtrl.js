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

  $scope.reviewForm = {
    loading: false,
    topLevelErrorMessage: ''
  };

  //Business List - home.html
  $scope.businessList = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.selectedCategory = '';

  //Business Profile - show-business.html
  $scope.businessProfile = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  //Review List - show-business.html
  $scope.reviewList = {
    loading: false,
    errorMsg: '',
    contents: []
  };
  $scope.reviewListbyBusiness = 
  {
    loading: false,
    errorMsg: '',
    contents: []
  };

  //Total Review - show-business.html
  $scope.totalReview = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.AveRating = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.userInfo = {
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

  $scope.showUserProfile = function(id, index){

      io.socket.get('/users/'+ id, function onResponse(data, jwr){
        if (jwr.error) {
          return;
        }
        console.log(index);        
        $("#username-" + index).append(data.name);

        
        console.log("Show Single User By Id\n\n");
        console.log(JSON.stringify(data.name,null,4));
      });
  };

  $scope.submitReviewForm = function(){
    
    $http.post('/reviews/new', {
      
      userid: $scope.reviewForm.userId,
      businessid: $scope.reviewForm.businessId,
      review: $scope.reviewForm.review,
      rating: $scope.reviewForm.rating
    })
    .then(function onSuccess (){
      console.log("Success");
    })
    .catch(function onError(sailsResponse) {

      console.log(sailsResponse);
      
    })
    .finally(function eitherWay(){
 
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

        console.log("Show ALL Business\n\n");
        console.log(JSON.stringify(data,null,4));
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

        console.log("Show Single Business By Id\n\n");
        console.log(JSON.stringify(data,null,4));
      });
  };

  $scope.showBusinessCity = function(city){
      if(city === ""){
        city = "Angeles City";
      }

      io.socket.get('/businesses/city/'+ city, function onResponse(data, jwr){
        console.log("Show Business By City\n\n");
        console.log(JSON.stringify(data,null,4));
      });
     
  };

  $scope.showBusinessCategory = function(category){
    if(category === "")
      {
        category = "Restaurant"
      }
    io.socket.get('/businesses/category/'+ category, function onResponse(data, jwr){
        $scope.businessList.contents = data;
        $scope.$apply();
        console.log("Show Business By Category\n\n");
        console.log(JSON.stringify(data,null,4));
    });
  };

  $scope.showAllReviews = function (){
      $scope.reviewList.loading = true;
      $scope.reviewList.errorMsg = '';
      
      io.socket.get('/reviews', function (data, jwr) {
        if (jwr.error) {
          $scope.reviewList.errorMsg = 'An unexpected error occurred: '+(data||jwr.status);
          $scope.reviewList.loading = false;
          return;
        }
        $scope.reviewList.contents = data;
        $scope.reviewList.loading = false;
        
        $scope.$apply();

        console.log("Show ALL Reviews\n\n");
        console.log(JSON.stringify(data,null,4));
      });
  };

  $scope.showReviewBusiness = function(id){
    $scope.reviewListbyBusiness.loading = true;
    $scope.reviewListbyBusiness.errorMsg = '';

    io.socket.get('/reviews/business/'+ id, function onResponse(data, jwr){
        if (jwr.error) {
          $scope.reviewListbyBusiness.errorMsg = 'An unexpected error occurred: '+(data||jwr.status);
          $scope.reviewListbyBusiness.loading = false;
          return;
        }
        
        $scope.reviewListbyBusiness.contents = data;
        $scope.reviewListbyBusiness.loading = false;
        $scope.$apply();

        console.log("Show Review By Business\n\n");
        console.log(JSON.stringify(data,null,4));
    });
    
  };

  $scope.getTotalReview = function(id){

    io.socket.get('/reviews/business/count/'+ id, function onResponse(data, jwr){
        $scope.totalReview.contents = data;
        $scope.$apply();

        console.log("Show Business Review Count\n\n");
        console.log(JSON.stringify(data,null,4));
    });
  };

  $scope.getAverageRating = function(id){
    io.socket.get('/reviews/business/rating/'+ id, function onResponse(data, jwr){
        $scope.AveRating.contents = data;
        $scope.$apply();

        console.log("Show Business Average Rating\n\n");
        console.log(JSON.stringify(data,null,4));
    });
  };

}]);
