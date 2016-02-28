// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 

      /* 
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ ) 
      */

      appId: '193770967654652', 

      /* 
       Adding a Channel File improves the performance 
       of the javascript SDK, by addressing issues 
       with cross-domain communication in certain browsers. 
      */

      channelUrl: 'app/channel.html', 

      /* 
       Set if you want to check the authentication status
       at the start up of the app 
      */

      status: true, 

      /* 
       Enable cookies to allow the server to access 
       the session 
      */

      cookie: true, 

      /* Parse XFBML */

      xfbml: true 
    });

    sAuth.watchAuthenticationStatusChange();

  };

  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

  (function(d){
    // load the Facebook javascript SDK

    var js, 
    id = 'facebook-jssdk', 
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.5";

    ref.parentNode.insertBefore(js, ref);

  }(document));
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

   $ionicConfigProvider.backButton.text('').previousTitleText(false);

    $stateProvider
        .state('menu', {
            url : '/menu',
            templateUrl : 'templates/menu-abstract.html',
            abstract : true,
            controller : 'MenuController'
        })
        .state('menu.home', {
            url: '/home',
            views: {
                'view-content': {
                    templateUrl: 'templates/home.html',
                    controller : 'HomeController'
                }
            }
        })


        .state('menu.bouncer-b', {
            url: '/bouncer-b',
            views: {
                'view-content': {
                    templateUrl: 'templates/bouncer-b.html',
                    controller : 'BouncerController'
                }
            }
        })
        .state('menu.bouncer-c', {
            url: '/bouncer-c',
            views: {
                'view-content': {
                    templateUrl: 'templates/bouncer-c.html',
                    controller : 'BouncerController'
                }
            }
        })
        .state('menu.clubber-c', {
            url: '/clubber-c',
            views: {
                'view-content': {
                    templateUrl: 'templates/clubber-c.html',
                    controller : 'BouncerController'
                }
            }
        })
        .state('menu.clubber-b', {
            url: '/clubber-b',
            views: {
                'view-content': {
                    templateUrl: 'templates/clubber-b.html',
                    controller : 'BouncerController'
                }
            }
        });

    $urlRouterProvider.otherwise('/menu/home');
}])
.controller('HomeController', function($scope, $ionicLoading, $ionicSideMenuDelegate, facebookService) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  google.maps.event.addDomListener(window, 'load', function() {
    var SFMarket = [37.785326, -122.405696]
    var myLatlng = new google.maps.LatLng(SFMarket[0], SFMarket[1]);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Get users current location
    navigator.geolocation.getCurrentPosition(function (pos) {
      var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      map.setCenter(currentLocation);

      // Create a draggable circle centered on the map
      // var radiusInKm = 0.5;
      // var circle = new google.maps.Circle({
      //   strokeColor: "#6D3099",
      //   strokeOpacity: 0.7,
      //   strokeWeight: 1,
      //   fillColor: "#B650FF",
      //   fillOpacity: 0.35,
      //   map: map,
      //   center: currentLocation,
      //   radius: ((radiusInKm) * 1000),
      //   draggable: true
      // });

      var myLocation = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title: 'My Location'
      });
    });

    $scope.map = map;

    // $scope.getMyLastName = function() {
    //    facebookService.getMyLastName() 
    //      .then(function(response) {
    //        $scope.last_name = response.last_name;
    //      }
    //    );
    // };
    $scope.last_name='temp';
    facebookService.getMyLastName() 
       .then(function(response) {
         $scope.last_name = response.last_name;
         // console.log(response)
       }
     );

  });    
})

.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
.controller('BouncerController', function($scope, $ionicLoading, $ionicSideMenuDelegate) {
  
})
.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});
