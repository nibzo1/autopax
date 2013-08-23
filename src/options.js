// Saves options to localStorage.
document.addEventListener('DOMContentLoaded', function () {
	restore_options();  
	document.querySelector('#paxOptions').addEventListener('click', clickHandlerPax);
	document.querySelector('#cardOptions').addEventListener('click', clickHandlerCard);	
});

function clickHandlerPax(e) {	
	save_options_pax();
}

function clickHandlerCard(e) {	
	save_options_card();
}

function save_options_pax() {
	//pax variables
	var firstName = document.getElementById("firstName").value;
    var surname = document.getElementById("surname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var groupName = document.getElementById("groupName").value;
    var contactAddress1 = document.getElementById("contactAddress1").value;
    var contactCity = document.getElementById("contactCity").value;
    var numberPlate = document.getElementById("numberPlate").value;
    var billPostcode = document.getElementById("billPostcode").value;
    var countryIDX = document.getElementById("countryIDX").selectedIndex; 
	
    if(validate_pax_options(firstName,surname,email,phone,groupName,contactAddress1,contactCity,numberPlate,billPostcode,countryIDX)){
		localStorage["firstName"] = firstName;
		localStorage["surname"] = surname;
		localStorage["email"] = email;
		localStorage["phone"] = phone;
		localStorage["groupName"] = groupName;
		localStorage["contactAddress1"] = contactAddress1;
		localStorage["contactCity"] = contactCity;
		localStorage["numberPlate"] = numberPlate;
		localStorage["billPostcode"] = billPostcode;
		localStorage["countryIDX"] = countryIDX;	
		setStatus("Options Saved.","pax");
	}
}

function save_options_card() {
	//card variables
	/* var cardType = document.getElementById("cardType").selectedIndex; */
	var cardType = document.getElementById("cardType").value;
	var cardNumber = document.getElementById("cardNumber").value;
	var cardName = document.getElementById("cardName").value;
	var cardMonth = document.getElementById("cardMonth").selectedIndex; 
	var cardYear = document.getElementById("cardYear").selectedIndex; 
	var cvv = document.getElementById("cvv").value;
	
	if(validate_card_options(cardType, cardNumber,cardName,cardMonth,cardYear,cvv)){
		localStorage["cardType"] = cardType;
		localStorage["cardNumber"] = cardNumber;
		localStorage["cardName"] = cardName;
		localStorage["cardMonth"] = cardMonth;
		localStorage["cardYear"] = cardYear;
		localStorage["cvv"] = cvv;
		setStatus("Options Saved.",'card');
	}
}

function setStatus(txt,type){
	var status = document.getElementById('status-'+type);
	status.innerHTML = txt;
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

function addError(err,type){
	var div = document.getElementById('error-'+type);	
	div.innerHTML = div.innerHTML + '<li>'+err+'</li>';
	setTimeout(function() {
		div.innerHTML = "";
	}, 5000);
}

function validate_pax_options(firstName,surname,email,phone,groupName,contactAddress1,contactCity,numberPlate,billPostcode,countryIDX) {
	var validation = true;	
	var type = 'pax';	
		
	if(firstName === '' ){		
		addError('First name cannot be empty',type);
		validation = false;
	}
	if(surname ==='' || surname==="undefined"){		
		addError('Surname cannot be empty',type);
		validation = false;
	}
	if(email=== ''|| email==="undefined"){		
		addError('Email cannot be empty',type);
		validation = false;
	}
	if(isNaN(phone)){		
		addError('Phone number cannot be empty and must be a number',type);
		validation = false;
	}
	if(groupName==='' || groupName==="undefined"){		
		addError('Group name cannot be empty',type);
		validation = false;
	}
	if(contactAddress1==='' || contactAddress1==="undefined"){		
		addError('Contact address cannot be empty',type);
		validation = false;
	}
	if(contactCity==='' ||contactCity==="undefined"){		
		addError('Contact city cannot be empty',type);
		validation = false;
	}
	if(billPostcode==='' || billPostcode==="undefined"){
		addError('Postcode cannot be empty',type);
		validation = false;
	}	
	if(numberPlate==='' || numberPlate==="undefined"){
		addError('Number Plate cannot be empty',type);
		validation = false;
	}
	if(isNaN(countryIDX) || countryIDX===0 || countryIDX===5){		
		addError('Country must be selected',type);
		validation = false;
	}
	return validation; 
}

function validate_card_options(cardType,cardNumber,cardName,cardMonth,cardYear,cvv) {
	var validation = true;	
	var type = 'card';	
	
	if(cardType === '' || cardType==="undefined"){		
		addError('Card type must be selected',type);
		validation = false;
	}
	if(cardNumber === '' || cardNumber==="undefined"){		
		addError('Credit Card Number cannot be empty',type);
		validation = false;
	}
	if(cardName === '' || cardName==="undefined"){		
		addError('Credit Card Name cannot be empty',type);		
		validation = false;
	}
	if(cardMonth === '' || cardMonth==="undefined"){		
		addError('Credit Month cannot be empty',type);
		validation = false;
	}
	if(cardYear === '' || cardYear==="undefined"){		
		addError('Credit Year cannot be empty',type);
		validation = false;
	}	
	if(cvv === '' || cvv==="undefined"){		
		addError('Credit cvv cannot be empty',type);
		validation = false;
	}
	return validation; 
}
	
// Restores select box state to saved value from localStorage.
function restore_options() {
	//retrieve customer
	var firstName = localStorage["firstName"];
	var surname = localStorage["surname"];
	var email = localStorage["email"];
	var phone = localStorage["phone"];
	var groupName = localStorage["groupName"];
	var contactAddress1 = localStorage["contactAddress1"];
	var contactCity = localStorage["contactCity"];
	var numberPlate = localStorage["numberPlate"];
	var billPostcode = localStorage["billPostcode"];	
	var countryIDX = localStorage["countryIDX"];
	
	//retrieve card
	var cardType = localStorage["cardType"];
	var cardNumber = localStorage["cardNumber"];
	var cardName = localStorage["cardName"];
	var cardMonth = localStorage["cardMonth"];
	var cardYear = localStorage["cardYear"];
	var cvv = localStorage["cvv"];

	//check for null
	if(!firstName || !surname || !email || !phone || !groupName || !contactAddress1 || !contactCity || !numberPlate || !billPostcode || !countryIDX) {
		return;
	}	
	
	//restore customer
    document.getElementById("firstName").value = firstName;
    document.getElementById("surname").value = surname;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    document.getElementById("groupName").value = groupName;
    document.getElementById("contactAddress1").value = contactAddress1;
    document.getElementById("contactCity").value = contactCity;
    document.getElementById("numberPlate").value = numberPlate;
    document.getElementById("billPostcode").value = billPostcode;	
	setSelectIdx(countryIDX,'countryIDX');	
	
	if(!cardType  || !cardNumber  || !cardName  || !cardMonth  || !cardYear  || !cvv) {
		return;
	}
	//restore card
    document.getElementById("cardNumber").value = cardNumber;
    document.getElementById("cardName").value = cardName;
    document.getElementById("cvv").value = cvv; 
    document.getElementById("cardType").value = cardType;
    setSelectIdx(cardMonth,'cardMonth');
	setSelectIdx(cardYear,'cardYear');	
}

function setSelectIdx(localVal, elementStr){
	var select = document.getElementById(elementStr);	
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (i == localVal) {
			child.selected = "true";
			break;
		}
	}
}