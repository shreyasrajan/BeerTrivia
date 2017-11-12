DetailController.$inject = ['$scope', '$stateParams'];

function DetailController($scope, $stateParams) {
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //make sure to navigate to the current page
        if (toState.parent === 'home') {
            toParams.pageNumber = $stateParams.currentPage;
        }
    });

    function init() {
        var beer;
        var beerJSON = $stateParams.beerJson;

        if (beerJSON) {
            beer = JSON.parse(beerJSON);
            sessionStorage["beerJSON"] = beerJSON;
        } else {
            beer = JSON.parse(sessionStorage["beerJSON"]);
        }

        $scope.VM = beer;
    }

    init();
}

module.exports = DetailController;