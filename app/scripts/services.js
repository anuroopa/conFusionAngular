'use strict';

angular.module('confusionApp')
  .constant("baseURL", "http://localhost:3000/")
  .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getDishes = function () {
      return $resource(baseURL + "dishes/:id", null, {
        'update': {
          method: 'PUT'
        }
      });
    };

    // implement a function named getPromotion
    // that returns a selected promotion.
    this.getPromotion = function (index) {
      return $resource(baseURL + "promotions/:id", null)
        .get({
          id: index
        });
    };

}])


.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

  var corpfac = {};

  var leaders = $resource(baseURL + "leadership/:id", null);

  // Implement two functions, one named getLeaders,
  // the other named getLeader(index)
  // Remember this is a factory not a service
  corpfac.getLeaders = function () {
    return leaders;
  };

  corpfac.getLeader = function (index) {
    return leaders.get({
      id: index
    });
  };

  return corpfac;
}])

.service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

  this.getFeedbacks = function () {
    return $resource(baseURL + "feedback/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  };

}])

;
