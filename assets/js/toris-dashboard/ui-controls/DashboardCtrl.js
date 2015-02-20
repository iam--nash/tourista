angular.module('TorisDashboard').controller('DashboardCtrl', ['$scope', '$http', 'toastr', '$interval', function($scope, $http, toastr, $interval) {


  SCOPE=$scope;


  $scope.userProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false
  };

  $scope.userList = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.businessList = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.changePasswordForm = {
    saving: false,
    errorMsg: '',
    properties: {}
  };

  $scope.selectedCategory = "";

  $scope.businessProfile = {
    loading: false,
    errorMsg: '',
    contents: []
  };

  $scope.editbusinessProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false
  };

  //Review List - show-business.html
  $scope.reviewList = {
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


  $scope.me = window.SAILS_LOCALS.me;


  io.socket.put('/me/online', {
    _csrf: window.SAILS_LOCALS._csrf
  }, function (unused,jwr){
    if (jwr.error){
      console.error('Error announcing new socket connection to Sails:',jwr);
      return;
    }


  });


  var REFRESH_ONLINE_STATUS_INTERVAL = 250;
  $interval(function refreshOnlineStatus(){


    _.each($scope.userList.contents, function (user){

   
      user.msUntilInactive = user.msUntilInactive || 0;
      user.msUntilInactive -= REFRESH_ONLINE_STATUS_INTERVAL;
      if (user.msUntilInactive < 0) {
        user.msUntilInactive = 0;
      }

      if (user.msUntilInactive > 0) {
     
        user.isActive = true;
    
      }
      else {
        user.isActive = false;
   
      }
    });

  }, REFRESH_ONLINE_STATUS_INTERVAL);


  io.socket.on('user', function (event){
    console.log(event);

    if (event.verb === 'updated') {


      var foundUser = _.find($scope.userList.contents, {id: event.id});
      if (foundUser) {
       
        _.extend(foundUser, event.data);
      }

      var message;
    
      if (event.data.justBecameActive) {

    
        if (foundUser) {
          foundUser.msUntilInactive = event.data.msUntilInactive;

      
          if (!foundUser.isActive) {
            toastr.info((event.data.name||'A user')+' just became active.', undefined, {closeButton: true});
            document.getElementById('chatAudio').play();
          }
        }
      }
   
      else if (event.data.justLoggedOut){

  
        toastr.info((event.data.name||'A user')+' just logged out.');

        document.getElementById('chatAudio').play();
      }
    
      else {

       
        if (event.id === $scope.me.id) {
          _.extend($scope.me, event.data);
        }

  
        if (event.id === $scope.userProfile.properties.id) {
          _.extend($scope.userProfile.properties, event.data);
        }


        toastr.success((event.data.name||'A user')+ ' has been updated.');

        document.getElementById('chatAudio').play();
      }


      $scope.$apply();
      return;
    }

    if (event.verb === 'created') {
      $scope.userList.contents.push(event.data);

      toastr.success((event.data.name||'A user')+ ' has been created.');

      $scope.$apply();
      return;
    }

    if (event.verb === 'destroyed') {
  
      _.remove($scope.userList.contents, {id: event.id});

      
      toastr.success((event.previous.name||'A user')+ ' has been deleted.');
      document.getElementById('chatAudio').play();

    
      $scope.$apply();
      return;
    }

    throw new Error('Unexpected/unknown socket event: "'+event.verb+'" received from Sails.');
  });





  $(window).mousemove(_.throttle(function whenMouseMoves (){

 
    io.socket.put('/me/online', {
      _csrf: window.SAILS_LOCALS._csrf
    }, function (unused,jwr){
      if (jwr.error){
        console.error('Error announcing new socket connection to Sails:',jwr);
        return;
      }

    });
  }, 3000));


  $scope.editMyProfile = function (){


    $scope.userProfile.saving = true;
    $scope.userProfile.errorMsg = '';

    return $http.put('/me', {
      name: $scope.userProfile.properties.name,
      title: $scope.userProfile.properties.title,
      email: $scope.userProfile.properties.email,
      admin: $scope.userProfile.properties.admin
    })
    .then(function onSuccess(sailsResponse){
      console.log(sailsResponse);

      $scope.me.name = sailsResponse.data.name;

    })
    .catch(function onError(sailsResponse){

      var emailAddressAlreadyInUse = !sailsResponse.data && sailsResponse.data.error !== 'E_VALIDATION';
      if (emailAddressAlreadyInUse) {
        $scope.userProfile.errorMsg = 'Email address already in use.';
        return;
      }
     
      $scope.userProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);
    })
    .finally(function eitherWay(){
      $scope.userProfile.saving = false;
    });
  };


  $scope.changeMyPassword = function (){
  
    $scope.changePasswordForm.saving = true;
    $scope.changePasswordForm.errorMsg = '';

 
    return $http.put('/me', {
      password: $scope.changePasswordForm.properties.password
    })
    .then(function onSuccess(sailsResponse){
      // Everything is OK.
    })
    .catch(function onError(sailsResponse){
      $scope.changePasswordForm.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);
    })
    .finally(function eitherWay(){
      $scope.changePasswordForm.saving = false;
    });
  };



  $scope.editUser = function (userId){

 
    $scope.userProfile.saving = true;
    $scope.userProfile.errorMsg = '';

    return $http.put('/users/'+userId, {
      name: $scope.userProfile.properties.name,
      title: $scope.userProfile.properties.title,
      email: $scope.userProfile.properties.email,
      admin: $scope.userProfile.properties.admin
    })
    .then(function onSuccess(sailsResponse){
   
    })
    .catch(function onError(sailsResponse){

     
      var emailAddressAlreadyInUse = !sailsResponse.data && sailsResponse.data.error !== 'E_VALIDATION';
      if (emailAddressAlreadyInUse) {
        $scope.userProfile.errorMsg = 'Email address already in use.';
        return;
      }

   
      $scope.userProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);
    })
    .finally(function eitherWay(){
      $scope.userProfile.saving = false;
    });
  };


  $scope.deleteUser = function (otherUserId){

   
    var $otherUser = _.find($scope.userList.contents, { id: otherUserId });


    $otherUser.deleting = true;

  
    $http.delete('/users/'+otherUserId)
    .then(function onSuccess(sailsResponse){

  
      _.remove($scope.userList.contents, {
        id: otherUserId
      });
    })
    .catch(function onError(sailsResponse){
     
      var errMsg = ''+(sailsResponse.data||sailsResponse.status);
      toastr.error(errMsg);
    })
    .finally(function eitherWay(){
  
      if (!$otherUser) return;
      $otherUser.deleting = false;
    });
  };


  //=============================================================================================
  $scope.showUserProfile = function(id){
      io.socket.get('/users/'+ id, function onResponse(data, jwr){
        if (jwr.error) {
          
          return;
        }
        $scope.userInfo.contents = data;
        $scope.$apply();

        //return data.name;

        console.log("Show Single User By Id\n\n");
        console.log(JSON.stringify(data.name,null,4));
      });
  };

  $scope.getTotalReview = function(id){

    io.socket.get('/reviews/business/count/'+ id, function onResponse(data, jwr){
        $scope.totalReview.contents = data;
        $scope.$apply();

        console.log("Show Business Review Count\n\n");
        console.log(JSON.stringify(data,null,4));
    });
  }

  $scope.getAverageRating = function(id){
    io.socket.get('/reviews/business/rating/'+ id, function onResponse(data, jwr){
        $scope.AveRating.contents = data;
        $scope.$apply();

        console.log("Show Business Average Rating\n\n");
        console.log(JSON.stringify(data,null,4));
    });
  }

  $scope.showBusinessCategory = function(category){
    if(category === ""){
      category = "Restaurant"
    }
    io.socket.get('/businesses/category/'+ category, function onResponse(data, jwr){
        $scope.businessList.contents = data;
        $scope.$apply();
        console.log("Show Business By Category\n\n");
        console.log(JSON.stringify(data,null,4));
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

    io.socket.get('/reviews/business/'+ id, function onResponse(data, jwr){
        $scope.reviewList.contents = data;
        $scope.$apply();
        console.log("Show Review By Business\n\n");
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

  $scope.editBusiness = function (businessId){

 
    $scope.editbusinessProfile.saving = true;
    $scope.editbusinessProfile.errorMsg = '';

    return $http.put('/businesses/'+businessId, {
      name: $scope.editbusinessProfile.properties.name,
      description: $scope.editbusinessProfile.properties.description,
      streetaddress: $scope.editbusinessProfile.properties.street,
      city: $scope.editbusinessProfile.properties.city,
      province: $scope.editbusinessProfile.properties.province,
      category: $scope.editbusinessProfile.properties.category
    })
    .then(function onSuccess(){
        $scope.editbusinessProfile.saving = false;
    })
    .catch(function onError(sailsResponse){
      $scope.editbusinessProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);
    })
    .finally(function eitherWay(){
      $scope.editbusinessProfile.saving = false;
    });
  };

  $scope.deleteBusiness = function (businessId){

  
    $http.delete('/businesses/'+ businessId)
    .then(function onSuccess(sailsResponse){

    })
    .catch(function onError(sailsResponse){
     
      var errMsg = ''+(sailsResponse.data||sailsResponse.status);
      toastr.error(errMsg);
    })
    .finally(function eitherWay(){
  
    });
  };

}]);

