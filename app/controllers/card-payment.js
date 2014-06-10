angular
	//create contacts module
	.module('autopax', ['LocalStorageModule'])
    /*.factory('errorService', function () {
        return {
            addErrors: function (err, type) {
            	var div = $('#error-'+type);

				angular.forEach(err, function(i) {
					console.log(i);
					div.html(div.html() + '<li>'+i+'</li>');
				});

				setTimeout(function() {
				   div.html('');
				}, 5000);
            }
        }
    })
    .factory('setStatusService', function () {
        return {
            setStatus: function (txt, type) {

				var status = $('#status-'+type);
				status.html(txt);
				setTimeout(function() {
					status.html('');
				}, 750);
            }
        }
    })*/
    /*.factory('ItemListLoaderService', function ($http) {
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
    })*/
	.factory('validationService', function () {
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
            },
            setStatus: function (txt, type) {

				var status = $('#status-'+type);
				status.html(txt);
				setTimeout(function() {
					status.html('');
				}, 750);
            },
            addErrors: function (err, type) {
            	var div = $('#error-'+type);

				angular.forEach(err, function(i) {
					console.log(i);
					div.html(div.html() + '<li>'+i+'</li>');
				});

				setTimeout(function() {
				   div.html('');
				}, 5000);
            }
        }
    })
	.controller('Cards', function ($scope, $http, ModelService, CardsListService, localStorageService) {

		//set scope variables
		$scope.cardOptions = ModelService.cardOptions();
		//list variables
		$scope.cards = CardsListService.getCards();
        $scope.months = CardsListService.getMonths();
        $scope.years = CardsListService.getYears();


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
				validationService.setStatus('Options Saved.','card');
			}
			//console.log($scope.cardOptions);
		};

		/*		console.log('top of the files');
		console.log(itemListLoaderService.loadList('app/conf', 'cards.json'));*/
		//console.log($scope);
	})
	.controller('Customer', function ($scope, $http, ModelService, CustomerListService, validationService, localStorageService) {

		//set scope variables
		$scope.customer = ModelService.customer();
		//list variables
		$scope.countries = CustomerListService.getCountries();
		$scope.customerTypes = CustomerListService.getCustomerTypes();


		console.log($scope.customerTypes);

		$scope.profileType = $scope.customerTypes[0];


		/*console.log($scope.profileType.value);*/
		console.log($scope);
	})
	.factory('ModelService', function () {
 		return {
	 		cardOptions: function() {
		 		var cardOptions = {
					"cardType" : "",
					"cardNumber" : "",
					"cardUser" : "",
					"expMonth" : "",
					"expYear" : "",
					"cvv" : ""
				};
				return cardOptions;
			},
			customer: function() {
		 		var customer = {
					/*"cardType" : "",
					"cardNumber" : "",
					"cardUser" : "",
					"expMonth" : "",
					"expYear" : "",
					"cvv" : ""*/
				};
				return customer;
			}
 		}
	})
	.factory('CardsListService', function () {
    	return {
    		getCards: function(){
    			var cards = [
					{name: "Visa", type: "VI", number: '4111111111111111'},
					{name: "Visa Electron", type: "VIE", number: '4444333322221111'},
					{name: "Master Card", type: "MCA", number: '343434343434343'},
					{name: "Diners Club", type: "DC", number: '5555555555554444'},
					{name: "American Express", type: "AX", number: '5454545454545454'}
		        ];
		        return cards;
	    	},
	    	getMonths: function(){
    			var months = [
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
		        return months;
	    	},
			getYears: function(){
    			var years = [
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
		        return years;
	    	}
        };
    })
    .factory('CustomerListService', function () {
    	return {
	    	getCustomerTypes: function(){
    			var customerTypes = [
					{id: "profileOnly", text: "Profile Only"},
					{id: "colorClub", text: "Color Club"}
				];
		        return customerTypes;
	    	},
	    	getCountries: function(){
    			var countries = [
					{id : "*", country: "Select country..."},
					{id : "DK", country: "Denmark"},
					{id : "DE", country: "Germany"},
					{id : "NO", country: "Norway"},
					{id : "SE", country: "Sweden"},
					{id : "-", country: " - - - - - -"},
					{id : "AF", country: "Afghanistan"},
					{id : "AL", country: "Albania"},
					{id : "DZ", country: "Algeria"},
					{id : "AS", country: "American Samoa"},
					{id : "AD", country: "Andorra"},
					{id : "AO", country: "Angola"},
					{id : "AI", country: "Anguilla"},
					{id : "AQ", country: "Antarctica"},
					{id : "AG", country: "Antigua/Barbuda"},
					{id : "AR", country: "Argentina"},
					{id : "AM", country: "Armenia"},
					{id : "AW", country: "Aruba"},
					{id : "AU", country: "Australia"},
					{id : "AT", country: "Austria"},
					{id : "AZ", country: "Azerbaijan"},
					{id : "BS", country: "Bahamas"},
					{id : "BH", country: "Bahrain"},
					{id : "BD", country: "Bangladesh"},
					{id : "BB", country: "Barbados"},
					{id : "BY", country: "Belarus"},
					{id : "BE", country: "Belgium"},
					{id : "BZ", country: "Belize"},
					{id : "BJ", country: "Benin"},
					{id : "BM", country: "Bermuda"},
					{id : "BT", country: "Bhutan"},
					{id : "BO", country: "Bolivia"},
					{id : "BA", country: "Bosnia"},
					{id : "BW", country: "Botswana"},
					{id : "BV", country: "Bouvet Island"},
					{id : "BR", country: "Brazil"},
					{id : "IO", country: "British Ind. Ocn Terr."},
					{id : "WI", country: "British West Indies"},
					{id : "BN", country: "Brunei Darussalam"},
					{id : "BG", country: "Bulgaria"},
					{id : "BF", country: "Burkina Faso"},
					{id : "BU", country: "Burma	"},
					{id : "BI", country: "Burundi"},
					{id : "KH", country: "Cambodia"},
					{id : "CM", country: "Cameroon	"},
					{id : "CA", country: "Canada"},
					{id : "CV", country: "Cape Verde"},
					{id : "KY", country: "Cayman Islands"},
					{id : "CF", country: "Central Africa"},
					{id : "TD", country: "Chad"},
					{id : "CL", country: "Chile"},
					{id : "CN", country: "China"},
					{id : "CX", country: "Christmas Island"},
					{id : "CC", country: "Cocos Islands"},
					{id : "CO", country: "Colombia"},
					{id : "KM", country: "Comoros"},
					{id : "CG", country: "Congo"},
					{id : "CK", country: "Cook Islands"},
					{id : "CR", country: "Costa Rica"},
					{id : "CI", country: "Cote D'Ivoire"},
					{id : "HR", country: "Croatia"},
					{id : "CU", country: "Cuba"},
					{id : "CY", country: "Cyprus"},
					{id : "CZ", country: "Czech Republic"},
					{id : "DJ", country: "Djibouti"},
					{id : "DM", country: "Dominica"},
					{id : "DO", country: "Dominican Republic"},
					{id : "TP", country: "East Timor"},
					{id : "EC", country: "Ecuador"},
					{id : "EG", country: "Egypt"},
					{id : "SV", country: "El Salvador"},
					{id : "GQ", country: "Equatorial Guinea"},
					{id : "ER", country: "Eritrea	"},
					{id : "EE", country: "Estonia"},
					{id : "ET", country: "Ethiopia"},
					{id : "FO", country: "Faeroe Islands"},
					{id : "FK", country: "Falkland Islands"},
					{id : "FJ", country: "Fiji"},
					{id : "FI", country: "Finland"},
					{id : "FR", country: "France"},
					{id : "PF", country: "French Polynesia"},
					{id : "TF", country: "French Southern Terr."},
					{id : "GA", country: "Gabon"},
					{id : "GM", country: "Gambia"},
					{id : "XA", country: "Gaza"},
					{id : "GE", country: "Georgia"},
					{id : "GH", country: "Ghana"},
					{id : "GI", country: "Gibraltar"},
					{id : "GR", country: "Greece"},
					{id : "GL", country: "Greenland"},
					{id : "GD", country: "Grenada"},
					{id : "GP", country: "Guadeloupe"},
					{id : "GU", country: "Guam"},
					{id : "GT", country: "Guatemala"},
					{id : "GF", country: "Guiana"},
					{id : "GN", country: "Guinea"},
					{id : "GW", country: "Guinea-Bissau"},
					{id : "GY", country: "Guyana"},
					{id : "HT", country: "Haiti"},
					{id : "HM", country: "Heard &amp; McDnld Isl."},
					{id : "XH", country: "Held Territories"},
					{id : "HN", country: "Honduras"},
					{id : "HK", country: "Hong Kong"},
					{id : "HU", country: "Hungary"},
					{id : "IS", country: "Iceland"},
					{id : "IN", country: "India"},
					{id : "XI", country: "Indian Ocean Islands"},
					{id : "ID", country: "Indonesia"},
					{id : "IR", country: "Iran"},
					{id : "IQ", country: "Iraq"},
					{id : "IE", country: "Ireland"},
					{id : "IL", country: "Israel"},
					{id : "IT", country: "Italy"},
					{id : "JM", country: "Jamaica"},
					{id : "JP", country: "Japan"},
					{id : "JO", country: "Jordan"},
					{id : "KZ", country: "Kazakhstan"},
					{id : "KE", country: "Kenya"},
					{id : "KI", country: "Kiribati"},
					{id : "KR", country: "Korea"},
					{id : "KW", country: "Kuwait"},
					{id : "KG", country: "Kyrgyzstan"},
					{id : "LA", country: "Laos"},
					{id : "LV", country: "Latvia"},
					{id : "LB", country: "Lebanon"},
					{id : "LS", country: "Lesotho"},
					{id : "LR", country: "Liberia"},
					{id : "LY", country: "Libya"},
					{id : "LI", country: "Liechtenstein"},
					{id : "LT", country: "Lithuania"},
					{id : "LU", country: "Luxembourg"},
					{id : "MO", country: "Macau"},
					{id : "MK", country: "Macedonia"},
					{id : "MG", country: "Madagascar"},
					{id : "MW", country: "Malawi"},
					{id : "MY", country: "Malaysia"},
					{id : "MV", country: "Maldives"},
					{id : "ML", country: "Mali"},
					{id : "MT", country: "Malta"},
					{id : "MH", country: "Marshall Islands"},
					{id : "MQ", country: "Martinique"},
					{id : "MR", country: "Mauritania"},
					{id : "MU", country: "Mauritius"},
					{id : "YT", country: "Mayotte"},
					{id : "MX", country: "Mexico"},
					{id : "FM", country: "Micronesia"},
					{id : "MD", country: "Moldova"},
					{id : "MC", country: "Monaco"},
					{id : "MN", country: "Mongolia"},
					{id : "MS", country: "Montserrat"},
					{id : "MA", country: "Morocco"},
					{id : "MZ", country: "Mozambique"},
					{id : "MM", country: "Myanmar"},
					{id : "NA", country: "Namibia"},
					{id : "NR", country: "Nauru"},
					{id : "NP", country: "Nepal"},
					{id : "NL", country: "Netherlands"},
					{id : "AN", country: "Netherlands Antilles"},
					{id : "NC", country: "New Caledonia"},
					{id : "NZ", country: "New Zealand"},
					{id : "NI", country: "Nicaragua"},
					{id : "NE", country: "Niger"},
					{id : "NG", country: "Nigeria"},
					{id : "NU", country: "Niue"},
					{id : "NF", country: "Norfolk Island"},
					{id : "KP", country: "North Korea"},
					{id : "XB", country: "Northern Ireland"},
					{id : "MP", country: "Northern Mariana Isl."},
					{id : "OM", country: "Oman"},
					{id : "PK", country: "Pakistan"},
					{id : "PW", country: "Palau"},
					{id : "PA", country: "Panama"},
					{id : "PG", country: "Papua New Guinea"},
					{id : "PY", country: "Paraguay"},
					{id : "PE", country: "Peru"},
					{id : "PH", country: "Philippines"},
					{id : "PN", country: "Pitcairn"},
					{id : "PL", country: "Poland"},
					{id : "PT", country: "Portugal"},
					{id : "PR", country: "Puerto Rico"},
					{id : "QA", country: "Qatar"},
					{id : "RE", country: "Reunion"},
					{id : "RO", country: "Romania"},
					{id : "RU", country: "Russia"},
					{id : "RW", country: "Rwanda"},
					{id : "LC", country: "Saint Lucia"},
					{id : "SM", country: "San Marino"},
					{id : "ST", country: "Sao Tome And Principe"},
					{id : "SA", country: "Saudi Arabia"},
					{id : "WY", country: "Scotland"},
					{id : "SN", country: "Senegal"},
					{id : "SC", country: "Seychelles"},
					{id : "SL", country: "Sierra Leone"},
					{id : "SG", country: "Singapore"},
					{id : "SK", country: "Slovak Republic"},
					{id : "SI", country: "Slovenia"},
					{id : "SB", country: "Solomon Islands"},
					{id : "SO", country: "Somalia"},
					{id : "ZA", country: "South Africa"},
					{id : "GS", country: "South Georgia"},
					{id : "ES", country: "Spain"},
					{id : "LK", country: "Sri Lanka"},
					{id : "SH", country: "St. Helena"},
					{id : "KN", country: "St. Kitts &amp; Nevis"},
					{id : "PM", country: "St. Pierre"},
					{id : "VC", country: "St. Vinc. &amp; The Grndns"},
					{id : "SD", country: "Sudan"},
					{id : "SR", country: "Suriname"},
					{id : "SJ", country: "Svlbrd &amp; Jn Myn Isl."},
					{id : "SZ", country: "Swaziland"},
					{id : "CH", country: "Switzerland"},
					{id : "SY", country: "Syria"},
					{id : "TW", country: "Taiwan"},
					{id : "TJ", country: "Tajikistan"},
					{id : "TZ", country: "Tanzania"},
					{id : "TH", country: "Thailand"},
					{id : "TG", country: "Togo"},
					{id : "TK", country: "Tokelau"},
					{id : "TO", country: "Tonga"},
					{id : "TT", country: "Trinidad And Tobago"},
					{id : "TN", country: "Tunisia"},
					{id : "TR", country: "Turkey"},
					{id : "TM", country: "Turkmenistan"},
					{id : "TC", country: "Turks And Caicos Isl."},
					{id : "TV", country: "Tuvalu"},
					{id : "UM", country: "U.S. Minor Outlying Isl."},
					{id : "UG", country: "Uganda"},
					{id : "UA", country: "Ukraine"},
					{id : "AE", country: "United Arab Emirates"},
					{id : "GB", country: "United Kingdom"},
					{id : "US", country: "United States"},
					{id : "UY", country: "Uruguay"},
					{id : "UZ", country: "Uzbekistan"},
					{id : "VU", country: "Vanuatu"},
					{id : "VA", country: "Vatican City State"},
					{id : "VE", country: "Venezuela"},
					{id : "VN", country: "Viet Nam"},
					{id : "VG", country: "Virgin Islands (British)"},
					{id : "VI", country: "Virgin Islands (U.S.)"},
					{id : "WX", country: "Wales"},
					{id : "WF", country: "Wallis &amp; Futuna Isl."},
					{id : "EH", country: "Western Sahara"},
					{id : "WS", country: "Western Samoa"},
					{id : "YE", country: "Yemen"},
					{id : "YU", country: "Yugoslavia"},
					{id : "ZM", country: "Zambia"},
					{id : "ZW", country: "Zimbabwe"}
				];
		        return countries;
	    	}
        };
    });