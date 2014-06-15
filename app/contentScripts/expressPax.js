//express pax details
chrome.extension.sendRequest({method: "getLocalStorage", key: "ls.ConfigOptions", value: "exp"}, function(response) {
	if(response && response.data == 'true'){
		doPax(customer);
	}
});

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "expenabled"){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "expdisabled"){
		doPax("","","","","","","","");
	}
});*/

function doPax(customer){

	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('select[id$=-Gender]').each(function (idx, ele) {
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = 1;
			}
		}
	});
	$('input[id$=-GivenName]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.value = customer.firstName;
			}else{
				ele.value = customer.firstName + suffix(idx);
			}
		}
		ele.blur()
	});
	$('input[id$=-Surname]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(customer.surname===''){
				ele.value = customer.surname;
			}else{
				ele.value = customer.surname + suffix(idx);
			}
		}
		ele.blur()
	});
	$('select[id$=-Age]').each(function (idx, ele) {
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = 2;
			}
		}
	});
	$('#Passenger1-Email').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.email;
		}
	});
	$('#Passenger1-PhoneNumber').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.phone;
		}
	});
	$('#Passenger1-AddressLine1').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.contactAddress1;
		}
	});
	$('#Passenger1-CityName').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.contactCity;
		}
	});
	$('#Passenger1-PostalCode').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.billPostcode;
		}
	});
	$('input[id$=-Nationality]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = customer.countryIDX;
			}
		}
		ele.blur()
	});
}
