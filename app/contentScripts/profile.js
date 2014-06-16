//profile pax details
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "prof"}, function(response) {
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

	$('[name="Profile/Customer/PersonName/GivenName"]').val(customer.firstName);
	$('[name="Profile/Customer/PersonName/Surname"]').val(customer.surname);
	$('[name="Profile/Customer/Telephone$1$/@AreaCityCode"]').val(087);
	$('[name="Profile/Customer/Telephone$1$/@PhoneNumber"]').val(123456);
	$('[name="Profile/Customer/Telephone$1$/@CountryAccessCode"]').prop('selectedIndex', 2);
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

	if(customer.emailChecked){
		$('#emailCheckbox').prop('checked', true);
		$('#emailCheckbox').attr('checked','checked');
		$('#emailCheckbox-hidden').prop('disabled', true);
	}
	$('[name="confirmEmail"]').val(customer.email);

	$('#checkout.contactDetails.countryList').each(function (idx, ele) {
		ele.selectedIndex = customer.country;
	});

	$('#checkout.contactDetails.merchantCountryList').each(function (idx, ele) {
		ele.selectedIndex = customer.country;
	});

	$('#MemberLevelSelection').each(function (idx, ele) {
		if($(this).val() === customer.profileType){
			$(this).prop("checked", true);
			$(this).prop("checked", 'checked')
		}else{
			$(this).removeAttr("checked");
		}
	});
}

//inject function to trigger a change event on countryList to enable defaulting of merchant country ect..
var s = document.createElement('script');
s.textContent = "ns(document).ready(function() {merchantCountryHandler(ns('#checkout.contactDetails.countryList')); })";
s.onload = function() {
    this.parentNode.removeChild(this);
};
document.head.appendChild(s);