//group details auto populate
chrome.extension.sendRequest({method: "getLocalStorage", key: "grpenabled"}, function(response) {
	if(response && response.data == 'true'){
		doPax(groupName,firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "grpenabled"){
		doPax(groupName,firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "grpdisabled"){
		doPax("","","","","","","","","");
	}
});

function doPax(groupName,firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('#groupName').each(function (idx, ele) {
		ele.value = groupName;
	});
	$('input.firstName').each(function (idx, ele) {
		ele.value = firstName;
	});
	$('input.surname').each(function (idx, ele) {
		ele.value = surname;
	});
	$('#email1').each(function (idx, ele) {
		ele.value = email;
	});
	$('#phone1').each(function (idx, ele) {
		ele.value = phone;
	});
	$('#contact-address1').each(function (idx, ele) {
		ele.value = contactAddress1;
	});
	$('#contact-city').each(function (idx, ele) {
		ele.value = contactCity;
	});
	$('#bill-postcode').each(function (idx, ele) {
		ele.value = billPostcode;
	});
	$('#bill-country').each(function (idx, ele) {
		ele.selectedIndex = countryIDX;
	});
}