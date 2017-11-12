routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            params: {
                pageNumber: 1
            },
            template: require('./views/home.html'),
            controller: require('./controllers/homeController.js'),
            abstract: true
        })
        .state('home.pageNav', {
            url: '',
            parent: 'home',
            views: {
                "pageNav@home": {
                    template: require('./views/pageNav.html')
                }
            }
        })
        .state('detail', {
            url: '/detail',
            params: {
                beerJson: '',
                currentPage: 1,
            },
            template: require('./views/detail.html'),
            controller: require('./controllers/detailController.js')
        });
}

module.exports = routes;