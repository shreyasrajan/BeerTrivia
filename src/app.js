var angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    routes = require('./routes'),
    ApiService = require('./services/ApiService');

//using dependency injection to configure baseURL so that we do it only at one place
const ApiBaseUrl = "https://api.punkapi.com/v2/beers";

var app = angular.module('beerTrivia', [uiRouter])
    .config(routes)
    .value("ApiBaseUrl", ApiBaseUrl)
    .service("ApiService", ApiService);

module.exports = app;