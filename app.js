"esversion: 6";

angular
  .module("anguweather", ["ngRoute"])
  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        controller: "RootCtrl",
        templateUrl: "/partials/root.html",
      })
      .when("/weather/:zipcode", {
        controller: "WeatherCtrl",
        templateUrl: "/partials/weather.html",
      })
  })
  .controller('RootCtrl', function($scope, $location) {
    console.log("I am RootCtrl");
    $scope.gotoWeather = () => $location.url(`/weather/${$scope.zip}`)

  })

.controller('WeatherCtrl', function($scope, weatherFactory, $routeParams) {
  console.log("I am WeatherCtrl");
  //   $http.get(`http://api.wunderground.com/api/6072f011a25d8927/conditions/q/{$routeParams.zipcode}.json`)
  //     .then((response) => {
  //       return response.data.current_observation.temp_f
  //     }).then((temp) => {
  //       $scope.temperature = temp
  //     })
  // })

  weatherFactory
    .getWeather($routeParams.zipcode)
    .then((weather) => {
      $scope.temperature = weather.temp
      $scope.city = weather.city
    })
})

.factory("weatherFactory", ($http) => {
  return {
    getWeather(zipcode) {
      return $http
        .get(`http://api.wunderground.com/api/6072f011a25d8927/conditions/q/${zipcode}.json`)
        .then((response) => ({
          // return{
          temp: response.data.current_observation.temp_f,
          city: response.data.current_observation.display_location.full,
        }))
    },
  }
})
