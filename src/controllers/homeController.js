var Beer = require('../model/beer');

HomeController.$inject = ['$scope', '$state', '$stateParams', 'ApiService'];

function HomeController($scope, $state, $stateParams, ApiService) {
    const noOfBeersPerPage = 10;

    $scope.PageNumber = 0;
    $scope.Beers = [];
    $scope.First = navigateToFirstPage;
    $scope.NextPage = navigateToNextPage;
    $scope.PrevPage = navigateToPrevPage;
    $scope.IsPrevFirstVisible = isPrevFirstVisible;
    $scope.Sort = sortBeers;
    $scope.NavigateToDetail = navigateToDetail;

    function init() {
        var pageNo = $stateParams.pageNumber;
        navigateToPage(pageNo);
    }

    function setBeers(defaultSort) {
        ApiService.GetBeersByPage($scope.PageNumber, noOfBeersPerPage, function(response) {
                var beerData = response.data;
                $scope.Beers = beerData.map(b => new Beer(b));

                if (defaultSort) {
                    sortBeers(0, 0);
                }
            },
            function(errResponse) {
                console.log("Error encountered: " + errResponse);
            });
    }

    function setPage(pageNo) {
        $scope.PageNumber = pageNo;
    }

    function navigateToFirstPage() {
        navigateToPage(1);
    }

    function navigateToPage(pageNo, defaultSort) {
        setPage(pageNo);
        setBeers(defaultSort);
    }

    function navigateToNextPage(defaultSort) {
        var pageNo = $scope.PageNumber;
        pageNo += 1;

        navigateToPage(pageNo, defaultSort);
    }

    function navigateToPrevPage(defaultSort) {
        var pageNo = $scope.PageNumber;
        pageNo -= 1;

        if (pageNo < 1) {
            init();
        } else {
            navigateToPage(pageNo, defaultSort);
        }
    }

    function isPrevFirstVisible() {
        return $scope.PageNumber > 1;
    }

    function sortBeers(columnIndex, sortOrder) {
        var beers = $scope.Beers;
        var condLess, condGreater;

        beers.sort(function(beerA, beerB) {
            switch (columnIndex) {
                case 1:
                    condLess = beerA.tagLine < beerB.tagLine;
                    condGreater = beerA.tagLine > beerB.tagLine;
                    break;
                case 2:
                    condLess = beerA.description < beerB.description;
                    condGreater = beerA.description > beerB.description;
                    break;
                case 3:
                    return beerA.abv - beerB.abv;
                case 4:
                    return beerA.ibu - beerB.ibu;
                case 5:
                    return beerA.ph - beerB.ph;
                case 6:
                    var dateA = parseDate(beerA.firstBrewed);
                    var dateB = parseDate(beerB.firstBrewed);
                    return dateA - dateB;
                case 7:
                    condLess = beerA.brewersTips < beerB.brewersTips;
                    condGreater = beerA.brewersTips > beerB.brewersTips;
                    break;
                default:
                    condLess = beerA.name < beerB.name;
                    condGreater = beerA.name > beerB.name;
            }

            if (condLess) {
                return -1;
            }
            if (condGreater) {
                return 1;
            }
            return 0;
        });

        if (sortOrder == 1) {
            beers.reverse();
        }

        $scope.Beers = beers;
    }

    function navigateToDetail(beer) {
        var jsonVal = JSON.stringify(beer);
        $state.go('detail', {
            beerJson: jsonVal,
            currentPage: $scope.PageNumber
        }, {
            location: true
        });
    }

    init();
}

function parseDate(dateVal) {
    var dateArr = dateVal.split('/');
    return Date.parse(dateArr[0] + '/' + '01' + '/' + dateArr[1]);
}

module.exports = HomeController;