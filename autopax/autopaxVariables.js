var firstName = getProperty('firstName');
var surname = getProperty('surname');
var email = getProperty('email');
var phone = getProperty('phone');
var groupName = getProperty('groupName');
var contactAddress1 = getProperty('contactAddress1');
var contactCity = getProperty('contactCity');
var billPostcode = getProperty('billPostcode');
var countryIDX = getProperty('countryIDX');
var numberPlate = getProperty('numberPlate');
var cardType = getProperty('cardType');
var cardNumber = getProperty('cardNumber');
var cardName = getProperty('cardName');
var cardMonth = getProperty('cardMonth');
var cardYear = getProperty('cardYear');
var cvv = getProperty('cvv');


function getProperty(property){
	chrome.extension.sendRequest({method: "getLocalStorage", key: property}, function(response) {		
		if(response && response.data != ''){
			return response.data;
		}
	});
	return '';	
}

if (firstName === '' || surname === '' || email === '' || phone === '' ||  groupName === '' ||  contactAddress1 === '' ||  contactCity === '' ||  billPostcode === '' ||  countryIDX === '' ||  cardType === '' ||   cardNumber === '' ||  cardName === '' ||  cardMonth === '' ||  cardYear === '' ||  cvv === '' ) {
	firstName = 'firstName';
	surname = 'surName';
	email = 'a@a.com';
	phone = '123456789';
	groupName = 'Group';
	contactAddress1 = 'Galway';
	contactCity = 'Galway';
	billPostcode = '0000';
	countryIDX = 110;  //ireland
	
	cardType = '1';	
	cardNumber = '5434699878988745';	
	cardName = 'test';
	cardMonth = '10';
	cardYear = '15';
	cvv = '123';
}
