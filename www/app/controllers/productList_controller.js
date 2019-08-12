ecommerceApp.controller("bookController", ['$scope', '$http', '$rootScope', '$state', function ($scope, $http, $rootScope, $state) {

    $scope.page = 1;
    $scope.limit = 5;
    $scope.disableBtn = false;
    $scope.previousButton = false;


    if ($rootScope.role == 'Normal') {
        $scope.navList = [


            {
                title: "products",
                navUrl: "#/book",
                state: "book"
            }

        ];
        $scope.editField = true
        $scope.deleteField = true

    } else {
        $scope.navList = [

            {
                title: "User Details",
                navUrl: "#/home",
                state: "home"
            },

            {
                title: "products",
                navUrl: "#/book",
                state: "book"
            },
            {
                title: "Add Products",
                navUrl: "#/add_product",
                state: "addBook"
            }


        ];

        $scope.editField = false
        $scope.deleteField = false
    }


    $scope.sortFindorderByID = 2;

    $scope.orderByID = function (m) {

        $scope.sortFindorderByID += 1;
        function isEven(n) {
            return n % 2 == 0;
        }
        if (isEven($scope.sortFindorderByID)) {
            $scope.bookList.sort(function(a, b){
                if(a[m] < b[m]) { return -1; }
                if(a[m] > b[m]) { return 1; }
                return 0;
            })
        } else {
            $scope.bookList.sort(function(a, b){
                if(a[m] < b[m]) { return 1; }
                if(a[m] > b[m]) { return -1; }
                return 0;
            })
        }

    };
    $scope.sortFindorderByName = 2;

    $scope.orderByName = function (m) {

        $scope.sortFindorderByName += 1;
        function isEven(n) {
            return n % 2 == 0;
        }
        if (isEven($scope.sortFindorderByName)) {
            $scope.bookList.sort(function(a, b){
                if(a[m] < b[m]) { return -1; }
                if(a[m] > b[m]) { return 1; }
                return 0;
            })
        } else {
            $scope.bookList.sort(function(a, b){
                if(a[m] < b[m]) { return 1; }
                if(a[m] > b[m]) { return -1; }
                return 0;
            })
        }
    };

    $scope.sortprice = 2;

    $scope.orderByprice = function (m) {

        $scope.sortprice += 1;
        function isEven(n) {
            return n % 2 == 0;
        }
        if (isEven($scope.sortprice)) {


            $scope.bookList.sort(function(a, b){
                return a[m] < b[m] ? -1 : (a[m]  >  b[m] ? 1 : 0);
            });
        } else {

            $scope.bookList.sort(function(a, b){
                if(a[m] < b[m]) { return 1; }
                if(a[m] > b[m]) { return -1; }
                return 0;
            })
        }


    };


    $scope.deleteBook = function (m) {
        console.log(m.list)
        if (m.list) {
            console.log(m.list.BookID);
            $http({

                method: 'DELETE',

                url: '/deleteBook',

                params: {BookID: m.list.BookID}

            }).then(function success(response) {
                location.reload();
                if (response.status) {
                    $scope.book_delete = "product deleted successfully";

                } else {
                    $scope.book_delete = " product not deleted";
                }
            })
        }

    }

    $scope.getBookList = function () {


        var req_data = {
            limit: $scope.limit,
            page: $scope.page
        };

        $http({

            method: 'GET',

            url: '/bookList',

            params: req_data

        })
            .then(function success(response) {
                console.log("response",response);

                var responseObject = response.data.data;
                $scope.pageNum = true
                $scope.bookList = responseObject

                if ($scope.page == 1) {

                    $scope.totalCount = Number(response.data.count)
                    $scope.totalPage = Math.ceil($scope.totalCount / $scope.limit)

                    console.log($scope.totalPage);

                    if ($scope.totalPage == 0) {
                        $scope.totalPage += 1;
                    }


                }


                if (($scope.totalPage < $scope.page) || ($scope.totalPage == $scope.page)) {
                    $scope.nextButton = true
                } else {
                    $scope.nextButton = false
                }


                if (($scope.page == 1) || ($scope.page == 0)) {

                    $scope.previousButton = true
                } else {
                    $scope.previousButton = false
                }


            });
    };
    $scope.getBookList()


    $scope.previous_question = function () {
        $scope.page -= 1;
        $scope.getBookList()


    }

    $scope.next_question = function () {
        $scope.page += 1;
        $scope.getBookList()


    }


    $scope.logout = function () {

        var req_data = {
            email: $rootScope.email


        };
        $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };
}]);
