// public/js/services/SampleService.js
angular.module('SampleService', [])

.factory('Sample', ['$http', function($http) {
    return {
        // call to get all Samples
        get : function() {
            return $http.get('/api/samples');
        },

        // These will work when more api routes are defined on node side
        // call to POST and create a new Sample
        create : function(sampleData) {
            return $http.post('/api/nerds', nerdData);
        },

        // call to DELETE a Sample
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    };
}]);
