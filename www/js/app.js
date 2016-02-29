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

  // $window.fbAsyncInit = function() {
  //   // Executed when the SDK is loaded

  //   FB.init({ 

  //     /* 
  //      The app id of the web app;
  //      To register a new app visit Facebook App Dashboard
  //      ( https://developers.facebook.com/apps/ ) 
  //     */

  //     appId: '193770967654652', 

  //     /* 
  //      Adding a Channel File improves the performance 
  //      of the javascript SDK, by addressing issues 
  //      with cross-domain communication in certain browsers. 
  //     */

  //     channelUrl: 'app/channel.html', 

  //     /* 
  //      Set if you want to check the authentication status
  //      at the start up of the app 
  //     */

  //     status: true, 

       
  //      Enable cookies to allow the server to access 
  //      the session 
      

  //     cookie: true, 

  //     /* Parse XFBML */

  //     xfbml: true
  //   });

  //   sAuth.watchAuthenticationStatusChange();

  // };

  // // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

  // (function(d){
  //   // load the Facebook javascript SDK

  //   var js, 
  //   id = 'facebook-jssdk', 
  //   ref = d.getElementsByTagName('script')[0];

  //   if (d.getElementById(id)) {
  //     return;
  //   }

  //   js = d.createElement('script'); 
  //   js.id = id; 
  //   js.async = true;
  //   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.5";

  //   ref.parentNode.insertBefore(js, ref);

  // }(document));
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
// .controller('HomeController', function($scope, $ionicLoading, $ionicSideMenuDelegate, facebookService) {
.controller('HomeController', function($scope, $ionicLoading, $ionicSideMenuDelegate) {  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  google.maps.event.addDomListener(window, 'load', function() {
    var SFMarket = [37.785326, -122.405696]
    var myLatlng = new google.maps.LatLng(SFMarket[0], SFMarket[1]);

    var mapOptions = {
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Get users current location
    navigator.geolocation.getCurrentPosition(function (pos) {
      var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      map.setCenter(currentLocation);

      var myLocation = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title: 'My Location',
        draggable: true,
        icon: 'img/kurt.png'
      });

      var cX = currentLocation.lat(),
          cY = currentLocation.lng();

      var user1 = new google.maps.Marker({
        position: { lat: 37.804065698932575, lng: -122.41985571904905 },
        map: map,
        draggable: true,
        title: 'User1',
        icon: '/img/alicia.png'
      });
      google.maps.event.addListener(user1, "mouseover", function(mark) {
          infowindow1.open(map, this);
      });
      google.maps.event.addListener(user1, "mouseout", function(mark) {
          infowindow1.close();
      });

      var user2 = new google.maps.Marker({
        position: { lat: cX - 0.009, lng: cY + 0.001 },
        map: map,
        draggable: true,
        title: 'User2',
        icon: '/img/brenda.png'
      });
      google.maps.event.addListener(user2, "mouseover", function(mark) {
          infowindow2.open(map, this);
      });
      google.maps.event.addListener(user2, "mouseout", function(mark) {
          infowindow2.close();
      });

      var user3 = new google.maps.Marker({
        position: { lat: cX - 0.007, lng: cY - 0.009 },
        map: map,
        draggable: true,
        title: 'User3',
        icon: '/img/jennifer.png'
      });
      google.maps.event.addListener(user3, "mouseover", function(mark) {
          infowindow3.open(map, this);
      });
      google.maps.event.addListener(user3, "mouseout", function(mark) {
          infowindow3.close();
      });

      var infowindow1 =  new google.maps.InfoWindow({
        content: '<div style="text-align:center;z-index:100"><b>Paola Perez</b><br /><i>Investment Banking</i><br/><p>Interests: Water skiing, books<br><p>Will be at my favorite chocolate shop  @8pm</p><div class="message"><a href="javascript:void(0)">message</a></div></div>',
        map: map
      });
      var infowindow2 =  new google.maps.InfoWindow({
        content: '<div style="text-align:center"><b>Amanda Vegas</b><br /><i>Nurse</i><br/><p>Interests: Hiking, working out<br><p>Hey, going for a coffee @2pm</p><div class="message"><a href="javascript:void(0)">message</a></div></div>',
        map: map,
        disableAutoPan: true
      });
      var infowindow3 =  new google.maps.InfoWindow({
        content: '<div style="text-align:center"><b>Jessica Nubi</b><br /><i>Startup Founder</i><br><p>Interests: Volunteering, Money</p><br><p>Hi, Available to meet @5pm</p><div class="message"><a href="javascript:void(0)">message</a></div></div>',
        map: map,
        disableAutoPan: true
      });

      infowindow1.close();
      infowindow2.close();
      infowindow3.close();

      var input = document.getElementById('pac-input');
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', function() {
          // infowindow.close();
          myLocation.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }

          myLocation.setPosition(place.geometry.location);
          myLocation.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
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
    // $scope.last_name='temp';
    // facebookService.getMyLastName() 
    //    .then(function(response) {
    //      $scope.last_name = response.last_name;
    //    }
    //  );

  });    
})

.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
// .factory('facebookService', function($q) {
//     return {
//         getMyLastName: function() {
//             var deferred = $q.defer();
//             FB.api('/me', {
//                 fields: 'last_name'
//             }, function(response) {
//                 if (!response || response.error) {
//                     deferred.reject('Error occured');
//                 } else {
//                     deferred.resolve(response);
//                 }
//             });
//             return deferred.promise;
//         }
//     }
// });
