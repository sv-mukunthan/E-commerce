ecommerceApp.controller("addBookController", ['$scope', '$http', '$rootScope', '$state', function ($scope, $http, $rootScope, $state) {

    $scope.productDetails = {}

    $scope.navList = [

        {
            title: "User Details",
            navUrl: "#/home",
            state: "home"
        },
        {
            title: "productname",
            navUrl: "#/addBook",
            state: "addBook"
        }

    ];

    if ($rootScope.role == 'Normal') {
        $scope.navList = [


            {
                title: "productname",
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
                title: "Add products",
                navUrl: "#/add_product",
                state: "addBook"
            }

        ]

        $scope.editField = false
        $scope.deleteField = false
    }


    $scope.saveproductDetails = function () {
        console.log("save is clicked");

        $scope.fieldValidation = true;
        if ($scope.productDetails.name == null || $scope.productDetails.name == "") {
            alert("ProductName can't be blank");
            $scope.fieldValidation = false;
            return false;
        }

        if ($scope.productDetails.brand == null || $scope.productDetails.brand == "") {
            alert("Brand Name can't be blank");
            $scope.fieldValidation = false;
            return false;
        }
        if ($scope.productDetails.description == null || $scope.productDetails.description == "") {
            alert("description can't be blank");

            $scope.fieldValidation = false;
            return false;
        }

        if ($scope.productDetails.price== null || $scope.productDetails.price== "") {


            alert("price can't be blank");

            $scope.fieldValidation = false;
            return false;

         } else {
            if (/\D/.test($scope.productDetails.price)) {

                alert("price should be number");

                $scope.fieldValidation = false;
                return false;
            }
        }


        if ($scope.fieldValidation) {
            var req_data = {
                productname: $scope.productDetails.name,
                price: $scope.productDetails.price,
                brand: $scope.productDetails.brand,
                description: $scope.productDetails.description


            };
            $http.post('/add_product', req_data)

                .then(function (response) {
                    var responseObject = response.data;

                    if (responseObject.status) {
                        $scope.product_info = "product added successfully";

                        setTimeout(function () {

                            $state.go('addBook')

                        }, 3000);

                    } else {
                        if (responseObject.statusCode == 100) {
                            $scope.product_info = responseObject.message;
                        } else {
                            $scope.product_info = "Not able to add";
                        }

                    }


                });
        };
    }


    $scope.logout = function () {

        var req_data = {
            email: $rootScope.email


        };

        console.log("req_data", req_data);
        $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };

}]);
