//profile pax details
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "prof"}, function(response) {
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
		runScript(customer);
	}
});

function runScript(customer){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};

	$('[name="Profile/Customer/PersonName/GivenName"]').val(customer.firstName);
	$('[name="Profile/Customer/PersonName/Surname"]').val(customer.surname);
	$('[name="Profile/Customer/Telephone$1$/@AreaCityCode"]').val(087);
	$('[name="Profile/Customer/Telephone$1$/@PhoneNumber"]').val(123456);
	$('[name="Profile/Customer/Telephone$1$/@CountryAccessCode"]').prop('selectedIndex', 2);
	$('[id="genderF"]').attr('checked','checked');
	$('[id="genderF"]').val('checked');
	$('[name$="Gender"]').prop('selectedIndex', 1);
	$('[id$="BirthDate_day"]').prop('selectedIndex', 18);
	$('[id$="BirthDate_month"]').prop('selectedIndex', 12);
	$('[id$="BirthDate_year"]').prop('selectedIndex', 40);
	$('[id$="BirthDate"]').val('1974-12-05');
	$('[name="Profile/Customer/Address/CountryName/@Code"]').val(customer.country);
	$('[name="Profile/Customer/@Nationality"]').val(customer.nationality);
	$('[name="Profile/Customer/Address/AddressLine$1$"]').val(customer.contactAddress1);
	$('[name="Profile/Customer/Address/CityName"]').val(customer.contactCity);
	$('[name="Profile/Customer/Address/PostalCode"]').val(customer.billPostcode);
	$('[name="Profile/Customer/Email"]').val(customer.email);


	//trigger change to update the UI
	triggerChange('xpath', 'select[name="Profile/TPA_Extensions/Gender"]', 'change');
	triggerChange('id', 'BirthDate_day', 'change');
	triggerChange('id', 'BirthDate_month', 'change');
	triggerChange('id', 'BirthDate_year', 'change');
	triggerChange('xpath', 'select[name="Profile/Customer/Telephone$1$/@CountryAccessCode"]', 'change');
	triggerChange('xpath', 'select[name="Profile/Customer/Address/CountryName/@Code"]', 'change');
	triggerChange('xpath', 'select[name="Profile/Customer/@Nationality"]', 'change');


	if(customer.newsletter){
		$('#emailCheckbox').prop('checked', true);
		$('#emailCheckbox').attr('checked','checked');
		$('#emailCheckbox').val('checked');
		$('#emailCheckbox-hidden').prop('disabled', true);
	}
	$('[name="confirmEmail"]').val(customer.email);

	$('#checkout.contactDetails.countryList').each(function (idx, ele) {
		ele.selectedIndex = customer.country;
	});

	$('#checkout.contactDetails.merchantCountryList').each(function (idx, ele) {
		ele.selectedIndex = customer.country;
	});

	$('#mobile_free_membership').each(function (idx, ele) {
		if($(this).val() === customer.profileType){
			$(this).prop("checked", true);
			$(this).prop("checked", 'checked')
		}else{
			$(this).removeAttr("checked");
		}
	});
}