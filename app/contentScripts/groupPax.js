//group details auto populate
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "grp"}, function(response) {
	if(response && response.data === true){
		doPax(customer);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		doPax(customer);
	}
	else if(request.data == false){
		doPax(null);
	}
});

function doPax(customer){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('#groupName').each(function (idx, ele) {
		ele.value = customer.groupName;
	});
	$('input.firstName').each(function (idx, ele) {
		ele.value = customer.firstName;
	});
	$('input.surname').each(function (idx, ele) {
		ele.value = customer.surname;
	});
	$('#email1').each(function (idx, ele) {
		ele.value = customer.email;
	});
	$('#phone1').each(function (idx, ele) {
		ele.value = customer.phone;
	});
	$('#contact-address1').each(function (idx, ele) {
		ele.value = customer.contactAddress1;
	});
	$('#contact-city').each(function (idx, ele) {
		ele.value = customer.contactCity;
	});
	$('#bill-postcode').each(function (idx, ele) {
		ele.value = customer.billPostcode;
	});
	$('#bill-country').each(function (idx, ele) {
		ele.value = customer.country;
	});
}