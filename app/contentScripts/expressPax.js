//express pax details


chrome.extension.sendRequest({method: "getLocalStorage", key: "expenabled"}, function(response) {
	if(response && response.data == 'true'){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "expenabled"){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "expdisabled"){
		doPax("","","","","","","","");
	}
});

function doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX){

	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('select[id$=-Gender]').each(function (idx, ele) {
		if($(ele).val() === ''){
			if(firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = 1;
			}
		}
	});
	$('input[id$=-GivenName]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(firstName===''){
				ele.value = firstName;
			}else{
				ele.value = firstName + suffix(idx);
			}
		}
		ele.blur()
	});
	$('input[id$=-Surname]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(surname===''){
				ele.value = surname;
			}else{
				ele.value = surname + suffix(idx);
			}
		}
		ele.blur()
	});
	$('select[id$=-Age]').each(function (idx, ele) {
		if($(ele).val() === ''){
			if(firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = 2;
			}
		}
	});
	$('#Passenger1-Email').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = email;
		}
	});
	$('#Passenger1-PhoneNumber').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = phone;
		}
	});
	$('#Passenger1-AddressLine1').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = contactAddress1;
		}
	});
	$('#Passenger1-CityName').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = contactCity;
		}
	});
	$('#Passenger1-PostalCode').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = billPostcode;
		}
	});
	$('input[id$=-Nationality]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.selectedIndex = countryIDX;
			}
		}
		ele.blur()
	});
}
