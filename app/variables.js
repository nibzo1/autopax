var firstName = '';
var surname = '';
var email = '';
var phone = '';
var groupName = '';
var contactAddress1 = '';
var contactCity = '';
var billPostcode = '';
var countryIDX = '';
var nationalityIDX = '';
var numberPlate = '';
var emailChecked = '';
var profileType = '';
var cardType = '';
var cardNumber = '';
var cardName = '';
var cardMonth = '';
var cardYear = '';
var cvv = '';

chrome.extension.sendRequest({method: "getLocalStorage", key: "emailChecked"}, function(response) {
	if(response && response.data != ''){
		emailChecked = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "profileType"}, function(response) {
	if(response && response.data != ''){
		profileType = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cardType"}, function(response) {
	if(response && response.data != ''){
		cardType = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cardNumber"}, function(response) {
	if(response && response.data != ''){
		cardNumber = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cardName"}, function(response) {
	if(response && response.data != ''){
		cardName = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cardMonth"}, function(response) {
	if(response && response.data != ''){
		cardMonth = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cvv"}, function(response) {
	if(response && response.data != ''){
		cvv = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "cardYear"}, function(response) {
	if(response && response.data != ''){
		cardYear = response.data;
	}
});

chrome.extension.sendRequest({method: "getLocalStorage", key: "firstName"}, function(response) {
	if(response && response.data != ''){
		firstName = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "surname"}, function(response) {
	if(response && response.data != ''){
		surname = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "email"}, function(response) {
	if(response && response.data != ''){
		email = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "phone"}, function(response) {
	if(response && response.data != ''){
		phone = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "groupName"}, function(response) {
	if(response && response.data != ''){
		groupName = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "contactAddress1"}, function(response) {
	if(response && response.data != ''){
		contactAddress1 = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "contactCity"}, function(response) {
	if(response && response.data != ''){
		contactCity = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "billPostcode"}, function(response) {
	if(response && response.data != ''){
		billPostcode = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "countryIDX"}, function(response) {
	if(response.data != ''){
		countryIDX = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "nationalityIDX"}, function(response) {
	if(response.data != ''){
		nationalityIDX = response.data;
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "numberPlate"}, function(response) {
	if(response.data != ''){
		numberPlate = response.data;
	}
});