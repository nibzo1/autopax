angular
	//create contacts module
	.module('autopax', ['LocalStorageModule'])
    .factory('errorService', function () {
        return {
            addErrors: function (err, type) {
            	var div = $('#error-'+type);

				angular.forEach(err, function(i) {
					console.log(i);
					div.html(div.html() + '<li>'+i+'</li>');
				});

				setTimeout(function() {
				   $('#error-'+type).html('');
				}, 5000);
            }
        }
    })
    .factory('ItemListLoaderService', function ($http) {
		var ItemListLoaderService = {};

    	ItemListLoaderService.data = {};

    	//Gets the list of nuclear weapons
   		 ItemListLoaderService.loadList = function (path, file) {

	            $http.get(path + '/' + file)
					.then(function(data) {
						console.log('data.data');
						console.log(data.data);
	                	ItemListLoaderService.data.d = data.data;
	            	});
	            	console.log('data.data2222');
					console.log(ItemListLoaderService.data);
       			 return ItemListLoaderService.data;
	        }
	    return ItemListLoaderService;
    })
	.factory('validationService', function (errorService) {
        return {
            validateCard: function (cardType, cardNumber, cardUser, expMonth, expYear, cvv) {
            	//console.log('in validation service: cardType: '+cardType+' - cardNumber: '+cardNumber+' - cardUser: '+cardUser+' - expMonth: '+expMonth+' - expYear:'+expYear+' - cvv: '+cvv);

            	var errors = [];
            	var validation = true;

				if(typeof cardType === 'undefined' || cardType === ''){
					errors.push('Card type must be selected');
					validation = false;
				}
				if(typeof cardNumber === 'undefined' || cardNumber === ''){
					errors.push('Credit Card Number cannot be empty');
					validation = false;
				}
				if(typeof cardUser === 'undefined' || cardUser === ''){
					errors.push('Credit Card User cannot be empty');
					validation = false;
				}
				if(typeof expMonth === 'undefined' || isNaN(expMonth) || expMonth === 0){
					errors.push('Expiry Month cannot be empty');
					validation = false;
				}
				if(typeof expYear === 'undefined' || isNaN(expYear) || expYear === 0){
					errors.push('Expiry Year cannot be empty');
					validation = false;
				}
				if(typeof cvv === 'undefined' || cvv === ''){
					errors.push('Card CVV cannot be empty');
					validation = false;
				}
				if(!validation){
					errorService.addErrors(errors, "card")
				}
				return validation;
            }
        }
    })
	.controller('Cards', function ($scope, $http, validationService, localStorageService) {

		//card configuration json
		$scope.cardOptions = {
			"cardType" : "",
			"cardNumber" : "",
			"cardUser" : "",
			"expMonth" : "",
			"expYear" : "",
			"cvv" : ""
		};

		//list variables
		$scope.cards = [
			{name: "Visa", type: "VI", number: '4111111111111111'},
			{name: "Visa Electron", type: "VIE", number: '4444333322221111'},
			{name: "Master Card", type: "MCA", number: '343434343434343'},
			{name: "Diners Club", type: "DC", number: '5555555555554444'},
			{name: "American Express", type: "AX", number: '5454545454545454'}
        ];
        $scope.months = [
        	'01',
        	'02',
        	'03',
        	'04',
        	'05',
        	'06',
        	'07',
        	'08',
        	'09',
        	'10',
        	'11',
        	'12'
        ];
        $scope.years = [
        	'2013',
        	'2014',
        	'2015',
        	'2016',
        	'2017',
        	'2018',
        	'2019',
        	'2020',
        	'2021',
        	'2022',
        	'2023',
        	'2024',
        	'2025'
        ];


        //initialise ui scope
		var lsJson = localStorageService.get('CardOptions');
		if(lsJson){

			var cardType = lsJson.cardType;
			var cardIdx = 0;

			angular.forEach($scope.cards, function(value, key) {
				if(value == String(cardType)){
					cardIdx = key;
				}
			});

			$scope.selectedCard = $scope.cards[cardIdx];
			$scope.card_user = lsJson.cardUser;
			$scope.expMonth = lsJson.expMonth;
			$scope.expYear = lsJson.expYear;
			$scope.cvv = lsJson.cvv;
		}else{
			//default card year to next year
			var year = new Date().getFullYear();
			var yearIdx = 0;

			angular.forEach($scope.years, function(value, key) {
				if(value == Number(year)){
					yearIdx = key + 1;
				}
			});
			//default lists to the first item
			$scope.selectedCard = $scope.cards[0];
			$scope.expMonth = $scope.months[0];
			$scope.expYear = $scope.years[yearIdx];
		}

		//save credit card json to local storage
		$scope.submit = function() {
			var cardType = $scope.selectedCard.type;
			var cardNumber = $scope.selectedCard.number;
			var cardUser = $scope.card_user;
			var expMonth = $scope.expMonth;
			var expYear = $scope.expYear;
			var cvv = $scope.cvv;

			if(validationService.validateCard(cardType, cardNumber, cardUser, expMonth, expYear, cvv)){
				$scope.cardOptions.cardType = cardType;
				$scope.cardOptions.cardNumber = cardNumber;
				$scope.cardOptions.cardUser = cardUser;
				$scope.cardOptions.expMonth = expMonth;
				$scope.cardOptions.expYear = expYear;
				$scope.cardOptions.cvv = cvv;

				//update local storage
				localStorageService.clearAll();
				localStorageService.remove('CardOptions');
				localStorageService.set('CardOptions', $scope.cardOptions);
			}
			//console.log($scope.cardOptions);
		};

		/*		console.log('top of the files');
		console.log(itemListLoaderService.loadList('app/conf', 'cards.json'));*/
		//console.log($scope);
	});