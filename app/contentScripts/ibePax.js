//ibe pax details
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "ibe"}, function(response) {
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
	$('select.gender').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.selectedIndex = 1;
			}
		}
	});
	$('select.titlelarge').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.selectedIndex = 1;
			}
		}
	});
	$('input.xsmall.name').each(function (idx, ele) {
		ele.focus();
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.value = customer.firstName;
			}
			else{
				ele.value = customer.firstName + suffix(idx);
			}
		}
		ele.blur();
	});
	$('input.small.name').each(function (idx, ele) {
		ele.focus();
		if(!$(ele).is(':disabled') ){
			if(customer.surname===''){
				ele.value = customer.surname;
			}
			else{
				ele.value = customer.surname + suffix(idx);
			}
		}
		ele.blur();
	});
	$('select.age').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.selectedIndex = 2
			}
		}
	});
	$('select.medium').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.value = customer.country;
			}
		}
	});
	$('#email1, #email2').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.email===''){
				ele.value = '';
			}
			else{
				ele.value = customer.email;
			}
		}
	});
	$('#phone1').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.phone===''){
				ele.value = '';
			}
			else{
				ele.value = customer.phone;
			}
		}
	});
	$('#contact-address1').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.contactAddress1===''){
				ele.value = '';
			}
			else{
				ele.value = customer.contactAddress1;
			}
		}
	});
	$('#contact-city').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.contactCity===''){
				ele.value = '';
			}
			else{
				ele.value = customer.contactCity;
			}
		}
	});
	$('#bill-postcode').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.billPostcode===''){
				ele.value = '';
			}
			else{
				ele.value = customer.billPostcode;
			}
		}
	});
}