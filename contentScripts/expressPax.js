//express pax details
//check to see if the script is enabled
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "exp"}, function(response) {
	if(response && response.data === true){
		runScript(customer);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		runScript(customer);
	}
	else if(request.data == false){
		//wipe out json
		var myJSON = customer;
		for (var key in myJSON) {
			if (myJSON.hasOwnProperty(key)) {
				myJSON[key] = '';
			}
		}
		runScript(myJSON);
	}
});

function runScript(customer){

	console.log(customer)

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

	$('[name$=DateofBirth]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.val('');
			}
			else{
				$(ele).click().focus();
				$(ele).val('01-01-' + getPaxYear($(ele).attr("passengertype")));
				$(ele).blur();
			}
		}
	});


	$('input[name$=Gender]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){

			}
			else{
				if ($(ele).val() === 'M' && customer.gender === 'male') {
					$(ele).prop('checked', true);
					$(ele).attr('checked','checked');
					$(ele).val('checked');
				}
				else if ($(ele).val() === 'F' && customer.gender === 'female') {
					$(ele).prop('checked', true);
					$(ele).attr('checked','checked');
					$(ele).val('checked');
				}
			}
		}
	});
	$('#Passenger1-Email').each(function (idx, ele) {
		if($(ele).val() === ''){
			ele.value = customer.email;
		}
		ele.blur();
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
	$('select[id$=-Nationality]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.value = customer.nationality;
			}
		}
		ele.blur()
	});
	$('select[id$=-CountryName]').each(function (idx, ele) {
		ele.focus();
		if($(ele).val() === ''){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}else{
				ele.value = customer.country;
			}
		}
		ele.blur()
	});
}
