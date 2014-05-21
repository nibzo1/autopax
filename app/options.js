// Saves options to localStorage.
$(document).ready(function(){
	restore_options();
	$('#paxOptions').on('click', function(){
		save_options_pax();
	});
	$('#cardOptions').on('click', function(){
		save_options_card();
	});
});

function save_options_pax() {
	//pax variables
	var firstName = $('#firstName').val();
	var surname = $('#surname').val();
	var email = $('#email').val();
	var phone = $('#phone').val();
	var groupName = $('#groupName').val();
	var contactAddress1 = $('#contactAddress1').val();
	var contactCity = $('#contactCity').val();
	var numberPlate = $('#numberPlate').val();
	var billPostcode = $('#billPostcode').val();
	var countryIDX = $('#countryIDX').prop('selectedIndex');
	var emailChecked = $('#newsletter').prop('checked');
	var nationalityIDX = $('#nationalityIDX').prop('selectedIndex');
	var profileType = $('#profileType').val();

	if(validate_pax_options(firstName,surname,email,phone,groupName,contactAddress1,contactCity,numberPlate,billPostcode,countryIDX,profileType,nationalityIDX)){
		localStorage['firstName'] = firstName;
		localStorage['surname'] = surname;
		localStorage['email'] = email;
		localStorage['phone'] = phone;
		localStorage['groupName'] = groupName;
		localStorage['contactAddress1'] = contactAddress1;
		localStorage['contactCity'] = contactCity;
		localStorage['numberPlate'] = numberPlate;
		localStorage['billPostcode'] = billPostcode;
		localStorage['countryIDX'] = countryIDX;
		localStorage['nationalityIDX'] = nationalityIDX;
		localStorage['emailChecked'] = emailChecked;
		localStorage['profileType'] = profileType;
		setStatus('Options Saved.','pax');
	}
}

function save_options_card() {
	//card variables
	var cardType = $('#cardType').val();
	var cardNumber = $('#cardNumber').val();
	var cardName = $('#cardName').val();
	var cardMonth = $('#cardMonth').prop('selectedIndex');
	var cardYear = $('#cardYear').prop('selectedIndex');
	var cvv = $('#cvv').val();

	if(validate_card_options(cardType, cardNumber,cardName,cardMonth,cardYear,cvv)){
		localStorage['cardType'] = cardType;
		localStorage['cardNumber'] = cardNumber;
		localStorage['cardName'] = cardName;
		localStorage['cardMonth'] = cardMonth;
		localStorage['cardYear'] = cardYear;
		localStorage['cvv'] = cvv;
		setStatus('Options Saved.','card');
	}
}

function setStatus(txt,type){
	var status = $('#status-'+type);
	status.html(txt);
	setTimeout(function() {
		status.html('');
	}, 750);
}

function addError(err,type){
	var div = $('#error-'+type);
	div.html(div.html() + '<li>'+err+'</li>');
	setTimeout(function() {
		div.html('');
	}, 5000);
}

function validate_pax_options(firstName,surname,email,phone,groupName,contactAddress1,contactCity,numberPlate,billPostcode,countryIDX,profileType,nationalityIDX) {
	var validation = true;
	var type = 'pax';

	if(firstName === '' ){
		addError('First name cannot be empty',type);
		validation = false;
	}
	if(surname ==='' || surname==='undefined'){
		addError('Surname cannot be empty',type);
		validation = false;
	}
	if(email=== ''|| email==='undefined'){
		addError('Email cannot be empty',type);
		validation = false;
	}
	if(isNaN(phone)){
		addError('Phone number cannot be empty and must be a number',type);
		validation = false;
	}
	if(groupName==='' || groupName==='undefined'){
		addError('Group name cannot be empty',type);
		validation = false;
	}
	if(contactAddress1==='' || contactAddress1==='undefined'){
		addError('Contact address cannot be empty',type);
		validation = false;
	}
	if(contactCity==='' ||contactCity==='undefined'){
		addError('Contact city cannot be empty',type);
		validation = false;
	}
	if(billPostcode==='' || billPostcode==='undefined'){
		addError('Postcode cannot be empty',type);
		validation = false;
	}
	if(numberPlate==='' || numberPlate==='undefined'){
		addError('Number Plate cannot be empty',type);
		validation = false;
	}
	if(profileType==='*' || profileType==='undefined'){
		addError('You must select a profile',type);
		validation = false;
	}
	if(isNaN(countryIDX) || countryIDX===0 || countryIDX===5){
		addError('Country must be selected',type);
		validation = false;
	}
	if(isNaN(nationalityIDX) || nationalityIDX===0 || nationalityIDX===5){
		addError('Nationality must be selected',type);
		validation = false;
	}
	return validation;
}

function validate_card_options(cardType,cardNumber,cardName,cardMonth,cardYear,cvv) {
	var validation = true;
	var type = 'card';

	if(cardType === '' || cardType==='undefined'){
		addError('Card type must be selected',type);
		validation = false;
	}
	if(cardNumber === '' || cardNumber==='undefined'){
		addError('Credit Card Number cannot be empty',type);
		validation = false;
	}
	if(cardName === '' || cardName==='undefined'){
		addError('Credit Card Name cannot be empty',type);
		validation = false;
	}
	if(cardMonth === '' || cardMonth==='undefined'){
		addError('Credit Month cannot be empty',type);
		validation = false;
	}
	if(cardYear === '' || cardYear==='undefined'){
		addError('Credit Year cannot be empty',type);
		validation = false;
	}
	if(cvv === '' || cvv==='undefined'){
		addError('Credit cvv cannot be empty',type);
		validation = false;
	}
	return validation;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	//retrieve customer
	var firstName = localStorage['firstName'];
	var surname = localStorage['surname'];
	var email = localStorage['email'];
	var phone = localStorage['phone'];
	var groupName = localStorage['groupName'];
	var contactAddress1 = localStorage['contactAddress1'];
	var contactCity = localStorage['contactCity'];
	var numberPlate = localStorage['numberPlate'];
	var billPostcode = localStorage['billPostcode'];
	var countryIDX = localStorage['countryIDX'];
	var nationalityIDX = localStorage['nationalityIDX'];
	var emailChecked = localStorage['emailChecked'];
	var profileType = localStorage['profileType'];

	//retrieve card
	var cardType = localStorage['cardType'];
	var cardNumber = localStorage['cardNumber'];
	var cardName = localStorage['cardName'];
	var cardMonth = localStorage['cardMonth'];
	var cardYear = localStorage['cardYear'];
	var cvv = localStorage['cvv'];

	//check for null
	if(!firstName || !surname || !email || !phone || !groupName || !contactAddress1 || !contactCity || !numberPlate || !billPostcode || !countryIDX || !nationalityIDX || !emailChecked|| !profileType) {
		return;
	}

	//restore customer
	$('#firstName').val(firstName);
	$('#surname').val(surname);
	$('#email').val(email);
	$('#phone').val(phone);
	$('#groupName').val( groupName);
	$('#contactAddress1').val(contactAddress1);
	$('#contactCity').val(contactCity);
	$('#numberPlate').val(numberPlate);
	$('#billPostcode').val(billPostcode);
	$('#newsletter').prop('checked', emailChecked);
	$('#profileType').val(profileType);
	setSelectIdx(countryIDX,'countryIDX');
	setSelectIdx(nationalityIDX,'nationalityIDX');

	if(!cardType  || !cardNumber  || !cardName  || !cardMonth  || !cardYear  || !cvv) {
		return;
	}
	//restore card
	$('#cardNumber').val(cardNumber);
	$('#cardName').val(cardName);
	$('#cvv').val(cvv);
	$('#cardType').val(cardType);
	setSelectIdx(cardMonth,'cardMonth');
	setSelectIdx(cardYear,'cardYear');
}

function setSelectIdx(idx, elementStr){
	$('#'+elementStr).children('option').each(function(i){
		if(i == idx){
			$(this).prop('selected', 'true');
			return true;
		}
	});
}