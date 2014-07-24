angular
//create contacts module
.module('autopax', ['LocalStorageModule'])
.controller('Config', function ($scope, $http, ModelService, CardsListService, validationService, localStorageService, utilsService) {

	var model = ModelService;

	$scope.config = model.config();
	$scope.configOpts = {};
	$scope.configOpts.ibe = false;
	$scope.configOpts.grp = false;
	$scope.configOpts.nf = false;
	$scope.configOpts.exp = false;
	$scope.configOpts.prof = false;
	$scope.configOpts.card = false;
	$scope.configOpts.np = false;
	$scope.configOpts.tc = false;
	$scope.configOpts.ap = false;

	//initialise ui scope
	var lsJson = localStorageService.get('ConfigOptions');
	if(lsJson){
		$scope.configOpts.exp = lsJson.exp;
		$scope.configOpts.ibe = lsJson.ibe;
		$scope.configOpts.grp = lsJson.grp;
		$scope.configOpts.nf = lsJson.nf;
		$scope.configOpts.prof = lsJson.prof;
		$scope.configOpts.card = lsJson.card;
		$scope.configOpts.np = lsJson.np;
		$scope.configOpts.tc = lsJson.tc;
		$scope.configOpts.ap = lsJson.ap;
	}

	//save credit card json to local storage
	$scope.change = function() {

		localStorageService.remove('ConfigOptions');
		localStorageService.set('ConfigOptions', JSON.stringify($scope.configOpts));
	};

	//open config options from popup
	$scope.openConfig = function() {
		chrome.tabs.create({
			url: 'options.html'
		});
	};
})
.controller('Cards', function ($scope, $http, ModelService, CardsListService, validationService, localStorageService, utilsService) {

	//set scope variables
	$scope.cardOptions = ModelService.cardOptions();
	$scope.cards = CardsListService.getCards();
	$scope.months = CardsListService.getMonths();
	$scope.years = CardsListService.getYears();

	//initialise ui scope
	var lsJson = localStorageService.get('CardOptions');
	if(lsJson){
		var cardIdx = utilsService.idxSelect($scope.cards, lsJson.cardType, 'str', 'type');

		$scope.selectedCard = $scope.cards[cardIdx];
		$scope.card_user = lsJson.cardUser;
		$scope.expMonth = lsJson.expMonth;
		$scope.expYear = lsJson.expYear;
		$scope.cvv = lsJson.cvv;
	}else{
		//default card year to next year
		var yearIdx = utilsService.idxSelect($scope.years, new Date().getFullYear(), 'str', null);

		//default lists to the first item
		$scope.selectedCard = $scope.cards[0];
		$scope.expMonth = $scope.months[0];
		$scope.expYear = $scope.years[yearIdx + 1];
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
			localStorageService.remove('CardOptions');
			localStorageService.set('CardOptions', $scope.cardOptions);
			validationService.setStatus('Options Saved.', 'card');
		}
	};

	//clear customer json from local storage
	$scope.clear = function() {
		var yearIdx = utilsService.idxSelect($scope.years, new Date().getFullYear(), 'str', null);
		$scope.cardOptions = ModelService.cardOptions();
		$scope.selectedCard = $scope.cards[0];
		$scope.expMonth = $scope.months[0];
		$scope.expYear = $scope.years[yearIdx + 1];
		$scope.card_user = '';
		$scope.cvv = '';
		localStorageService.remove('CardOptions');
	};
})
.controller('Customer', function ($scope, $http, ModelService, CustomerListService, validationService, localStorageService, utilsService) {

	//set scope variables
	$scope.customer = ModelService.customer();
	$scope.countries = CustomerListService.getCountries();
	$scope.customerTypes = CustomerListService.getCustomerTypes();

	//initialise ui scope
	var lsJson = localStorageService.get('CustomerOptions');
	if(lsJson){

		//get the countries
		var countryIDX = utilsService.idxSelect($scope.countries, lsJson.country, 'str', 'id');
		var nationalityIDX = utilsService.idxSelect($scope.countries, lsJson.nationality, 'str', 'id');
		var paxTypeIDX = utilsService.idxSelect($scope.customerTypes, lsJson.profileType, 'str', 'id');

		$scope.customer.firstName = lsJson.firstName;
		$scope.customer.surname = lsJson.surname;
		$scope.customer.email = lsJson.email;
		$scope.customer.phone = lsJson.phone;
		$scope.customer.groupName = lsJson.groupName;
		$scope.customer.contactAddress1 = lsJson.contactAddress1;
		$scope.customer.contactCity = lsJson.contactCity;
		$scope.customer.billPostcode = lsJson.billPostcode;
		$scope.customer.numberPlate = lsJson.numberPlate;
		$scope.customer.newsletter = lsJson.newsletter;
		$scope.customer.profileType = $scope.customerTypes[paxTypeIDX].id;
		$scope.customer.nationality = $scope.countries[nationalityIDX].id;
		$scope.customer.country = $scope.countries[countryIDX].id;
		$scope.profileType = $scope.customerTypes[paxTypeIDX];
		$scope.nationality = $scope.countries[nationalityIDX];
		$scope.country = $scope.countries[countryIDX];
	}else{
		//default lists to the first item
		$scope.profileType = $scope.customerTypes[0];
		$scope.country = $scope.countries[0];
		$scope.nationality = $scope.countries[0];
	}

	//save customer json to local storage
	$scope.submit = function() {
		var firstName = $scope.customer.firstName;
		var surname = $scope.customer.surname;
		var email = $scope.customer.email;
		var phone = $scope.customer.phone;
		var groupName = $scope.customer.groupName;
		var contactAddress1 = $scope.customer.contactAddress1;
		var contactCity = $scope.customer.contactCity;
		var billPostcode = $scope.customer.billPostcode;
		var numberPlate = $scope.customer.numberPlate;
		var newsletter = $scope.customer.newsletter;
		var profileType = $scope.profileType.id;
		var nationalityIDX = $scope.nationality.id;
		var countryIDX = $scope.country.id;

		//validate
		if(validationService.validateCustomer(firstName, surname, email, phone, groupName, contactAddress1, contactCity, billPostcode, numberPlate, newsletter, profileType, nationalityIDX, countryIDX)){

			$scope.customer.profileType = profileType;
			$scope.customer.nationality = nationalityIDX;
			$scope.customer.country = countryIDX;

			//update local storage
			localStorageService.remove('CustomerOptions');
			localStorageService.set('CustomerOptions', $scope.customer);
			validationService.setStatus('Options Saved.','pax');
		}
	};

	//clear customer json from local storage
	$scope.clear = function() {
		$scope.customer = ModelService.customer();
		$scope.profileType = $scope.customerTypes[0];
		$scope.country = $scope.countries[0];
		$scope.nationality = $scope.countries[0];
		localStorageService.remove('CustomerOptions');
	};
})
.factory('utilsService', function () {
	return {
		/*
			list: The data to loop on
			test: The value to look for
			type: Data type to check for
			param: Data object parameter e.g. obj.id
		*/
		idxSelect: function (list, test, type, param) {
			var idx = 0;
			angular.forEach(list, function(value, key) {
				if(type === 'num' && value === Number(test) || type === 'str' && value === String(test)){
					idx = key;
				}
				else if(param === 'id' && (type === 'num' && value.id === String(test) ||  type === 'str' && value.id === String(test))){
					idx = key;
				}
				else if(param === 'type' && (type === 'num' && value.type == String(test) ||  type === 'str' && value.type === String(test))){
					idx = key;
				}
			});
			return idx;
		},
		isChecked: function (list, type, id) {
			var checked = false;
			angular.forEach(list, function(value, key) {
				if(value.type === type && value.id === id && value.enabled === 'true'){
					checked = 'true';
				}
			});
			return checked;
		}
	}
})
.factory('validationService', function () {
	return {
		validateCustomer: function (firstName, surname, email, phone, groupName, contactAddress1, contactCity, billPostcode, numberPlate, newsletter, profileType, nationalityIDX, countryIDX) {
			var validation = true;
			var errors = [];

			if(typeof firstName === 'undefined' || firstName === ''){
				errors.push('First name cannot be empty');
				validation = false;
			}
			if(typeof surname === 'undefined' || surname === ''){
				errors.push('Surname cannot be empty');
				validation = false;
			}
			if(typeof email === 'undefined' || email === ''){
				errors.push('Email cannot be empty');
				validation = false;
			}
			if(isNaN(phone)){
				errors.push('Phone number cannot be empty and must be a number');
				validation = false;
			}
			if(typeof groupName === 'undefined' || groupName === ''){
				errors.push('Group name cannot be empty');
				validation = false;
			}
			if(typeof contactAddress1 === 'undefined' || contactAddress1 === ''){
				errors.push('Contact address cannot be empty');
				validation = false;
			}
			if(typeof contactCity === 'undefined' || contactCity === ''){
				errors.push('Contact city cannot be empty');
				validation = false;
			}
			if(typeof billPostcode === 'undefined' || billPostcode === ''){
				errors.push('Postcode cannot be empty');
				validation = false;
			}
			if(typeof numberPlate === 'undefined' || numberPlate === ''){
				errors.push('Number Plate cannot be empty');
				validation = false;
			}
			if(typeof profileType === 'undefined' || profileType === '*'){
				errors.push('You must select a profile');
				validation = false;
			}
			if(typeof countryIDX === 'undefined' || countryIDX === '*'  || countryIDX === ''){
				errors.push('Country must be selected');
				validation = false;
			}
			if(typeof nationalityIDX === 'undefined' || nationalityIDX === '*' || nationalityIDX === ''){
				errors.push('Nationality must be selected');
				validation = false;
			}
			if(!validation){
				this.addErrors(errors, 'pax');
				errors = [];
			}
			return validation;
		},
		validateCard: function (cardType, cardNumber, cardUser, expMonth, expYear, cvv) {
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
				this.addErrors(errors, 'card')
			}
			return validation;
		},
		setStatus: function (txt, type) {
			var lbl = $('#status-'+type);
			lbl.html(txt);
			setTimeout(function() {
				lbl.html('');
			}, 750);
		},
		addErrors: function (err, type) {
			var ul = $('#error-'+type);
			angular.forEach(err, function(i) {
				ul.html(ul.html() + '<li>'+i+'</li>');
			});

			setTimeout(function() {
			   ul.html('');
			}, 5000);
		}
	}
})
.factory('ModelService', function () {
		return {
			cardOptions: function() {
				var cardOptions = {
					'cardType' : '',
					'cardNumber' : '',
					'cardUser' : '',
					'expMonth' : '',
					'expYear' : '',
					'cvv' : ''
				};
				return cardOptions;
			},
			customer: function() {
				var customer = {
					'firstName' : '',
					'surname' : '',
					'email' : '',
					'phone' : '',
					'groupName' : '',
					'contactAddress1' : '',
					'contactCity' : '',
					'billPostcode' : '',
					'numberPlate' : '',
					'newsletter' : '',
					'profileType' : '',
					'nationality' : '',
					'country' : ''
				};
				return customer;
			},
			config: function() {
				var config = [
					{type: 'customer', id: 'ibe', enabled: 'false', text: 'IBE'},
					{type: 'customer', id: 'grp', enabled: 'false', text: 'Group'},
					{type: 'customer', id: 'nf', enabled: 'false', text: 'Name Firming'},
					{type: 'customer', id: 'exp', enabled: 'false', text: 'Express'},
					{type: 'profile', id: 'prof', enabled: 'false', text: 'Profile'},
					{type: 'payment', id: 'card', enabled: 'false', text: 'Card Payments'},
					{type: 'misc', id: 'np', enabled: 'false', text: 'Number Plate'},
					{type: 'misc', id: 'tc', enabled: 'false', text: 'Terms & Conditions'},
					{type: 'misc', id: 'ap', enabled: 'false', text: 'All Pax'}
				];

				return config;
			}
		}
})
.factory('CardsListService', function () {
	return {
		getCards: function(){
			var cards = [
				{name: 'Visa', type: 'VI', number: '4111111111111111'},
				{name: 'Visa Electron', type: 'VIE', number: '4444333322221111'},
				{name: 'Master Card', type: 'MCA', number: '5454545454545454'},
				{name: 'Diners Club', type: 'DC', number: '5555555555554444'},
				{name: 'American Express', type: 'AX', number: '343434343434343'}
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
				{id: 'profileOnly', text: 'Profile Only'},
				{id: 'colorClub', text: 'Color Club'}
			];
			return customerTypes;
		},
		getCountries: function(){
			var countries = [
				{id : '*', country: 'Select country...'},
				{id : 'DK', country: 'Denmark'},
				{id : 'DE', country: 'Germany'},
				{id : 'NO', country: 'Norway'},
				{id : 'SE', country: 'Sweden'},
				{id : '-', country: ' - - - - - -'},
				{id : 'AF', country: 'Afghanistan'},
				{id : 'AL', country: 'Albania'},
				{id : 'DZ', country: 'Algeria'},
				{id : 'AS', country: 'American Samoa'},
				{id : 'AD', country: 'Andorra'},
				{id : 'AO', country: 'Angola'},
				{id : 'AI', country: 'Anguilla'},
				{id : 'AQ', country: 'Antarctica'},
				{id : 'AG', country: 'Antigua/Barbuda'},
				{id : 'AR', country: 'Argentina'},
				{id : 'AM', country: 'Armenia'},
				{id : 'AW', country: 'Aruba'},
				{id : 'AU', country: 'Australia'},
				{id : 'AT', country: 'Austria'},
				{id : 'AZ', country: 'Azerbaijan'},
				{id : 'BS', country: 'Bahamas'},
				{id : 'BH', country: 'Bahrain'},
				{id : 'BD', country: 'Bangladesh'},
				{id : 'BB', country: 'Barbados'},
				{id : 'BY', country: 'Belarus'},
				{id : 'BE', country: 'Belgium'},
				{id : 'BZ', country: 'Belize'},
				{id : 'BJ', country: 'Benin'},
				{id : 'BM', country: 'Bermuda'},
				{id : 'BT', country: 'Bhutan'},
				{id : 'BO', country: 'Bolivia'},
				{id : 'BA', country: 'Bosnia'},
				{id : 'BW', country: 'Botswana'},
				{id : 'BV', country: 'Bouvet Island'},
				{id : 'BR', country: 'Brazil'},
				{id : 'IO', country: 'British Ind. Ocn Terr.'},
				{id : 'WI', country: 'British West Indies'},
				{id : 'BN', country: 'Brunei Darussalam'},
				{id : 'BG', country: 'Bulgaria'},
				{id : 'BF', country: 'Burkina Faso'},
				{id : 'BU', country: 'Burma	'},
				{id : 'BI', country: 'Burundi'},
				{id : 'KH', country: 'Cambodia'},
				{id : 'CM', country: 'Cameroon	'},
				{id : 'CA', country: 'Canada'},
				{id : 'CV', country: 'Cape Verde'},
				{id : 'KY', country: 'Cayman Islands'},
				{id : 'CF', country: 'Central Africa'},
				{id : 'TD', country: 'Chad'},
				{id : 'CL', country: 'Chile'},
				{id : 'CN', country: 'China'},
				{id : 'CX', country: 'Christmas Island'},
				{id : 'CC', country: 'Cocos Islands'},
				{id : 'CO', country: 'Colombia'},
				{id : 'KM', country: 'Comoros'},
				{id : 'CG', country: 'Congo'},
				{id : 'CK', country: 'Cook Islands'},
				{id : 'CR', country: 'Costa Rica'},
				{id : 'CI', country: 'Cote D\'Ivoire'},
				{id : 'HR', country: 'Croatia'},
				{id : 'CU', country: 'Cuba'},
				{id : 'CY', country: 'Cyprus'},
				{id : 'CZ', country: 'Czech Republic'},
				{id : 'DJ', country: 'Djibouti'},
				{id : 'DM', country: 'Dominica'},
				{id : 'DO', country: 'Dominican Republic'},
				{id : 'TP', country: 'East Timor'},
				{id : 'EC', country: 'Ecuador'},
				{id : 'EG', country: 'Egypt'},
				{id : 'SV', country: 'El Salvador'},
				{id : 'GQ', country: 'Equatorial Guinea'},
				{id : 'ER', country: 'Eritrea	'},
				{id : 'EE', country: 'Estonia'},
				{id : 'ET', country: 'Ethiopia'},
				{id : 'FO', country: 'Faeroe Islands'},
				{id : 'FK', country: 'Falkland Islands'},
				{id : 'FJ', country: 'Fiji'},
				{id : 'FI', country: 'Finland'},
				{id : 'FR', country: 'France'},
				{id : 'PF', country: 'French Polynesia'},
				{id : 'TF', country: 'French Southern Terr.'},
				{id : 'GA', country: 'Gabon'},
				{id : 'GM', country: 'Gambia'},
				{id : 'XA', country: 'Gaza'},
				{id : 'GE', country: 'Georgia'},
				{id : 'GH', country: 'Ghana'},
				{id : 'GI', country: 'Gibraltar'},
				{id : 'GR', country: 'Greece'},
				{id : 'GL', country: 'Greenland'},
				{id : 'GD', country: 'Grenada'},
				{id : 'GP', country: 'Guadeloupe'},
				{id : 'GU', country: 'Guam'},
				{id : 'GT', country: 'Guatemala'},
				{id : 'GF', country: 'Guiana'},
				{id : 'GN', country: 'Guinea'},
				{id : 'GW', country: 'Guinea-Bissau'},
				{id : 'GY', country: 'Guyana'},
				{id : 'HT', country: 'Haiti'},
				{id : 'HM', country: 'Heard &amp; McDnld Isl.'},
				{id : 'XH', country: 'Held Territories'},
				{id : 'HN', country: 'Honduras'},
				{id : 'HK', country: 'Hong Kong'},
				{id : 'HU', country: 'Hungary'},
				{id : 'IS', country: 'Iceland'},
				{id : 'IN', country: 'India'},
				{id : 'XI', country: 'Indian Ocean Islands'},
				{id : 'ID', country: 'Indonesia'},
				{id : 'IR', country: 'Iran'},
				{id : 'IQ', country: 'Iraq'},
				{id : 'IE', country: 'Ireland'},
				{id : 'IL', country: 'Israel'},
				{id : 'IT', country: 'Italy'},
				{id : 'JM', country: 'Jamaica'},
				{id : 'JP', country: 'Japan'},
				{id : 'JO', country: 'Jordan'},
				{id : 'KZ', country: 'Kazakhstan'},
				{id : 'KE', country: 'Kenya'},
				{id : 'KI', country: 'Kiribati'},
				{id : 'KR', country: 'Korea'},
				{id : 'KW', country: 'Kuwait'},
				{id : 'KG', country: 'Kyrgyzstan'},
				{id : 'LA', country: 'Laos'},
				{id : 'LV', country: 'Latvia'},
				{id : 'LB', country: 'Lebanon'},
				{id : 'LS', country: 'Lesotho'},
				{id : 'LR', country: 'Liberia'},
				{id : 'LY', country: 'Libya'},
				{id : 'LI', country: 'Liechtenstein'},
				{id : 'LT', country: 'Lithuania'},
				{id : 'LU', country: 'Luxembourg'},
				{id : 'MO', country: 'Macau'},
				{id : 'MK', country: 'Macedonia'},
				{id : 'MG', country: 'Madagascar'},
				{id : 'MW', country: 'Malawi'},
				{id : 'MY', country: 'Malaysia'},
				{id : 'MV', country: 'Maldives'},
				{id : 'ML', country: 'Mali'},
				{id : 'MT', country: 'Malta'},
				{id : 'MH', country: 'Marshall Islands'},
				{id : 'MQ', country: 'Martinique'},
				{id : 'MR', country: 'Mauritania'},
				{id : 'MU', country: 'Mauritius'},
				{id : 'YT', country: 'Mayotte'},
				{id : 'MX', country: 'Mexico'},
				{id : 'FM', country: 'Micronesia'},
				{id : 'MD', country: 'Moldova'},
				{id : 'MC', country: 'Monaco'},
				{id : 'MN', country: 'Mongolia'},
				{id : 'MS', country: 'Montserrat'},
				{id : 'MA', country: 'Morocco'},
				{id : 'MZ', country: 'Mozambique'},
				{id : 'MM', country: 'Myanmar'},
				{id : 'NA', country: 'Namibia'},
				{id : 'NR', country: 'Nauru'},
				{id : 'NP', country: 'Nepal'},
				{id : 'NL', country: 'Netherlands'},
				{id : 'AN', country: 'Netherlands Antilles'},
				{id : 'NC', country: 'New Caledonia'},
				{id : 'NZ', country: 'New Zealand'},
				{id : 'NI', country: 'Nicaragua'},
				{id : 'NE', country: 'Niger'},
				{id : 'NG', country: 'Nigeria'},
				{id : 'NU', country: 'Niue'},
				{id : 'NF', country: 'Norfolk Island'},
				{id : 'KP', country: 'North Korea'},
				{id : 'XB', country: 'Northern Ireland'},
				{id : 'MP', country: 'Northern Mariana Isl.'},
				{id : 'OM', country: 'Oman'},
				{id : 'PK', country: 'Pakistan'},
				{id : 'PW', country: 'Palau'},
				{id : 'PA', country: 'Panama'},
				{id : 'PG', country: 'Papua New Guinea'},
				{id : 'PY', country: 'Paraguay'},
				{id : 'PE', country: 'Peru'},
				{id : 'PH', country: 'Philippines'},
				{id : 'PN', country: 'Pitcairn'},
				{id : 'PL', country: 'Poland'},
				{id : 'PT', country: 'Portugal'},
				{id : 'PR', country: 'Puerto Rico'},
				{id : 'QA', country: 'Qatar'},
				{id : 'RE', country: 'Reunion'},
				{id : 'RO', country: 'Romania'},
				{id : 'RU', country: 'Russia'},
				{id : 'RW', country: 'Rwanda'},
				{id : 'LC', country: 'Saint Lucia'},
				{id : 'SM', country: 'San Marino'},
				{id : 'ST', country: 'Sao Tome And Principe'},
				{id : 'SA', country: 'Saudi Arabia'},
				{id : 'WY', country: 'Scotland'},
				{id : 'SN', country: 'Senegal'},
				{id : 'SC', country: 'Seychelles'},
				{id : 'SL', country: 'Sierra Leone'},
				{id : 'SG', country: 'Singapore'},
				{id : 'SK', country: 'Slovak Republic'},
				{id : 'SI', country: 'Slovenia'},
				{id : 'SB', country: 'Solomon Islands'},
				{id : 'SO', country: 'Somalia'},
				{id : 'ZA', country: 'South Africa'},
				{id : 'GS', country: 'South Georgia'},
				{id : 'ES', country: 'Spain'},
				{id : 'LK', country: 'Sri Lanka'},
				{id : 'SH', country: 'St. Helena'},
				{id : 'KN', country: 'St. Kitts &amp; Nevis'},
				{id : 'PM', country: 'St. Pierre'},
				{id : 'VC', country: 'St. Vinc. &amp; The Grndns'},
				{id : 'SD', country: 'Sudan'},
				{id : 'SR', country: 'Suriname'},
				{id : 'SJ', country: 'Svlbrd &amp; Jn Myn Isl.'},
				{id : 'SZ', country: 'Swaziland'},
				{id : 'CH', country: 'Switzerland'},
				{id : 'SY', country: 'Syria'},
				{id : 'TW', country: 'Taiwan'},
				{id : 'TJ', country: 'Tajikistan'},
				{id : 'TZ', country: 'Tanzania'},
				{id : 'TH', country: 'Thailand'},
				{id : 'TG', country: 'Togo'},
				{id : 'TK', country: 'Tokelau'},
				{id : 'TO', country: 'Tonga'},
				{id : 'TT', country: 'Trinidad And Tobago'},
				{id : 'TN', country: 'Tunisia'},
				{id : 'TR', country: 'Turkey'},
				{id : 'TM', country: 'Turkmenistan'},
				{id : 'TC', country: 'Turks And Caicos Isl.'},
				{id : 'TV', country: 'Tuvalu'},
				{id : 'UM', country: 'U.S. Minor Outlying Isl.'},
				{id : 'UG', country: 'Uganda'},
				{id : 'UA', country: 'Ukraine'},
				{id : 'AE', country: 'United Arab Emirates'},
				{id : 'GB', country: 'United Kingdom'},
				{id : 'US', country: 'United States'},
				{id : 'UY', country: 'Uruguay'},
				{id : 'UZ', country: 'Uzbekistan'},
				{id : 'VU', country: 'Vanuatu'},
				{id : 'VA', country: 'Vatican City State'},
				{id : 'VE', country: 'Venezuela'},
				{id : 'VN', country: 'Viet Nam'},
				{id : 'VG', country: 'Virgin Islands (British)'},
				{id : 'VI', country: 'Virgin Islands (U.S.)'},
				{id : 'WX', country: 'Wales'},
				{id : 'WF', country: 'Wallis &amp; Futuna Isl.'},
				{id : 'EH', country: 'Western Sahara'},
				{id : 'WS', country: 'Western Samoa'},
				{id : 'YE', country: 'Yemen'},
				{id : 'YU', country: 'Yugoslavia'},
				{id : 'ZM', country: 'Zambia'},
				{id : 'ZW', country: 'Zimbabwe'}
			];
			return countries;
		}
	};
});