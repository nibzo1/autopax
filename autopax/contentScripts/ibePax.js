//ibe pax details
chrome.extension.sendRequest({method: "getLocalStorage", key: "ibeenabled"}, function(response) {
	if(response && response.data == 'true'){
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "ibeenabled"){ 			
		doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "ibedisabled"){ 				
		doPax("","","","","","","","");
	} 
}); 

function doPax(firstName,surname,email,phone,contactAddress1,contactCity,billPostcode,countryIDX){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('select.gender').each(function (idx, ele) {		
		if(firstName===''){
			ele.selectedIndex = 0;
		}
		else{
			ele.selectedIndex = 1;
		}		
	});
	$('select.titlelarge').each(function (idx, ele) {
		if(firstName===''){
			ele.selectedIndex = 0;
		}
		else{
			ele.selectedIndex = 1;
		}				
	});
	$('input.xsmall.name').each(function (idx, ele) {
		ele.focus();
		if(firstName===''){
			ele.value = firstName;			
		}
		else{
			ele.value = firstName + suffix(idx);
		}		
		ele.blur()
	});
	$('input.small.name').each(function (idx, ele) {
		ele.focus();		
		if(surname===''){
			ele.value = surname;			
		}
		else{
			ele.value = surname + suffix(idx);
		}
		ele.blur()
	});
	$('select.age').each(function (idx, ele) {		
		if(firstName===''){
			ele.selectedIndex = 0;
		}
		else{
			ele.selectedIndex = 2
		}		
	});
	$('select.medium').each(function (idx, ele) {		
		if(countryIDX == 0){
			ele.selectedIndex = 0; 			
		}
		else{
			ele.selectedIndex = countryIDX; 
		}		
	});
	$('#email1, #email2').each(function (idx, ele) {		
		if(surname===''){
			ele.value = '';			
		}
		else{
			ele.value = email;
		}
	});
	$('#phone1').each(function (idx, ele) {
		if(phone===''){
			ele.value = '';			
		}
		else{
			ele.value = phone;
		}		
	});
	$('#contact-address1').each(function (idx, ele) {		
		if(contactAddress1===''){
			ele.value = '';			
		}
		else{
			ele.value = contactAddress1;
		}		
	});
	$('#contact-city').each(function (idx, ele) {		
		if(contactCity===''){
			ele.value = '';			
		}
		else{
			ele.value = contactCity;
		}		
	});
	$('#bill-postcode').each(function (idx, ele) {		
		if(billPostcode===''){
			ele.value = '';			
		}
		else{
			ele.value = billPostcode;
		}		
	});
}