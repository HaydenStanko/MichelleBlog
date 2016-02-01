// public/js/appRoutes.js
angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl:    'app/views/pages/home.html'
        })

        // Samples page that wil use SampleController
        .when('/samples', {
            templateUrl:    'app/views/pages/sample.html',
            controller:     'SampleController',
            controllerAs:   'sample'
        });

    $locationProvider.html5Mode(true);
});

