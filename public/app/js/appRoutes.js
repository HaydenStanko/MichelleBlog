// public/js/appRoutes.js
angular.module('appRoutes', [])

.config('$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {
    $routeProvider

    // home page
    .when('/', {
        templateUrl:    'views/home.html',
        controller:     'MainController'
    })

    // Samples page that wil use SampleController
    .when('/samples', {
        templateUrl:    'views/sample.html',
        controller:     'SampleController'
    });

    $locationProvider.html5Mode(true);
});

