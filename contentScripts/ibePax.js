//ibe pax details
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "ibe"}, function(response) {
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

	$('input[name$=Gender]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){

			}
			else{
				if ($(ele).val() === 'M' && customer.gender === 'male') {
					$(ele).prop('checked', true);
					$(ele).attr('checked','checked');
				}
				else if ($(ele).val() === 'F' && customer.gender === 'female') {
					$(ele).prop('checked', true);
					$(ele).attr('checked','checked');
				}
			}
		}
		ele.blur();
	});


	$('select[name$=Gender]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.selectedIndex = 1;
				triggerChange('xpath', 'select[name="'+$(ele).attr('name')+'"]', 'change');
			}
		}
		ele.blur();
	});


	$('select[name$=NamePrefix]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.selectedIndex = 1;
				triggerChange('xpath', 'select[name="'+$(ele).attr('name')+'"]', 'change');
			}
		}
		ele.blur();
	});


	$('[name$=GivenName]').each(function (idx, ele) {
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

  $('[name$=Surname]').each(function (idx, ele) {
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


	$('[name$=BirthDate]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.val('');
			}
			else{
				$(ele).val('01-01-' + getPaxYear($(ele).attr("paxtype")));
			}
		}
	});


	$('[name$=Nationality]').each(function (idx, ele) {
		if(!$(ele).is(':disabled') ){
			if(customer.firstName===''){
				ele.selectedIndex = 0;
			}
			else{
				ele.value = customer.country;
				triggerChange('xpath', 'select[name="'+$(ele).attr('name')+'"]', 'change');
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