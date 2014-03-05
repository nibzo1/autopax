//profile pax details
chrome.extension.sendRequest({method: "getLocalStorage", key: "profileenabled"}, function(response) {
	if(response && response.data == 'true'){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "profileenabled"){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "profiledisabled"){
		doPax("","","","","","","","");
	}
});

function doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};

	//password,dobday, dobmonth, dobyear, profiletype,
	//organise the order of processing

	var profileType = 'colorClub';

	$('[name="Profile/Customer/PersonName/GivenName"]').val(firstName);
	$('[name="Profile/Customer/PersonName/Surname"]').val(surname);
	$('[name="Profile/Customer/Telephone$1$/@CountryAccessCode"]').prop('selectedIndex', 2);
	$('[name$="Gender"]').prop('selectedIndex', 1);
	$('[id$="BirthDate_day"]').prop('selectedIndex', 18);
	$('[id$="BirthDate_month"]').prop('selectedIndex', 12);
	$('[id$="BirthDate_year"]').prop('selectedIndex', 40);
	$('[id$="BirthDate"]').val('1974-12-05');
	$('[name$="AreaCityCode"]').val(087);
	$('[name$="PhoneNumber"]').val(123456);
	$('[name="Profile/Customer/Address/CountryName/@Code"]').prop('selectedIndex', countryIDX);
	$('[name="Profile/Customer/Address/AddressLine$1$"]').val(contactAddress1);
	$('[name="Profile/Customer/Address/CityName"]').val(contactCity);
	$('[name="Profile/Customer/Address/PostalCode"]').val(billPostcode);
	$('[name="Profile/Customer/Email"]').val(email);
	$('[name="confirmEmail"]').val(email);
	/*$('[name="Profile/TPA_Extensions/Password"]').val('password');
	$('[name="confirmPassword"]').val('password');*/

	if(profileType === 'colorClub'){
		$('[name="Profile/@hasLoyaltyAccount"]').prop("checked", "true");
	}

	$('#checkout.contactDetails.countryList').each(function (idx, ele) {
		ele.selectedIndex = countryIDX;
		ele.change();
	});

	$('#checkout.contactDetails.merchantCountryList').each(function (idx, ele) {
		ele.selectedIndex = countryIDX;
	});

	$('#MemberLevelSelection').each(function (idx, ele) {
		if($(this).val()===profileType){
			$(this).prop("checked", "true")
		}else{
			$(this).removeAttr("checked");
		}
	});

	$('[name="termsAndConditions"]').prop("checked", "true");

}