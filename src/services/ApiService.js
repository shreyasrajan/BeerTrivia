ApiService.$inject = ['$http', 'ApiBaseUrl'];

function ApiService($http, ApiBaseUrl) {
    function getAllBeers(success, failure) {
        $http.get(ApiBaseUrl).then(function(response) {
            if (success) {
                success(response);
            }
        }, function(errResponse) {
            if (failure) {
                failure(errResponse);
            }
        });
    }

    function getBeersByPage(page, count, success, failure) {
        var url = ApiBaseUrl + "?" + "page=" + page + "&per_page=" + count;

        $http.get(url).then(function(response) {
            if (success) {
                success(response);
            }
        }, function(errorResponse) {
            if (failure) {
                failure(errorResponse);
            }
        });
    }

    function getBeer(id, success, failure) {
        var url = ApiBaseUrl + "/" + id;

        $http.get(url).then(function(response) {
            if (success) {
                success(response);
            }
        }, function(errorResponse) {
            if (failure) {
                failure(errorResponse);
            }
        });
    }

    return {
        GetAllBeers: getAllBeers,
        GetBeersByPage: getBeersByPage,
        GetBeerById: getBeer
    };
}

module.exports = ApiService;