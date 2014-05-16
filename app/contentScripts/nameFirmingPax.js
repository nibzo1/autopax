//name firming pax details
chrome.extension.sendRequest({method: "getLocalStorage", key: "nfenabled"}, function(response) {
	if(response && response.data == 'true'){
		doPax(firstName,surname,email,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "nfenabled"){
		doPax(firstName,surname,email,countryIDX);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "nfdisabled"){
		doPax("","","","");
	}
});

function doPax(firstName,surname,email,countryIDX){
	var fc = 0;
	var sc = 0;
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	var Adult = 0;
	var Sen = 0;
	var Child = 0;

	$('div.side-box-section-text').each(function (idx, ele) {
		var ad = new RegExp("Adults");
		var se = new RegExp("Discount");
		var ch = new RegExp("Children");
		if (ad.exec(ele.innerHTML)) {
			if (ele.innerHTML[1] == ' ') {
				Adult = parseInt(ele.innerHTML[0]);
			}
			else {
				Adult = parseInt(ele.innerHTML[0] + ele.innerHTML[1]);
			}
		} else if (se.exec(ele.innerHTML)) {
			if (ele.innerHTML[1] == ' ') {
				Sen = parseInt(ele.innerHTML[0]);
			}
			else {
				Sen = parseInt(ele.innerHTML[0] + ele.innerHTML[1]);
			}
		} else if (ch.exec(ele.innerHTML)) {
			if (ele.innerHTML[1] == ' ') {
				Child = parseInt(ele.innerHTML[0]);
			}
			else {
				Child = parseInt(ele.innerHTML[0] + ele.innerHTML[1]);
			}
		}
	});
	$('#leadPassenger').each(function (idx, ele) {
		if (ele.value == '1') {
			ele.checked = 'yes';
		}
	});
	$('#email1-itin1').each(function (idx, ele) {
		ele.value = email;
	});
	$('input.nameFirming').each(function (idx, ele) {
		var givenName = new RegExp("givenName");
		if (givenName.exec(ele.id)) {
			if(firstName===''){
				ele.value = firstName;
			}
			else if (sc == 25) {
				ele.value = firstName + String.fromCharCode(fc + 65) + String.fromCharCode(sc + 65);
				sc = 0;
				fc++;
			} else {
				ele.value = firstName + String.fromCharCode(fc + 65) + String.fromCharCode(sc + 65);
				sc++;
			}
		}
	});

	var fc = 0;
	var sc = 0;

	$('input.nameFirming').each(function (idx, ele) {

		var ssurname = new RegExp("surname");
		if (ssurname.exec(ele.id)) {

			if(surname===''){
				ele.value = surname;
			}
			else if (sc == 25) {
				ele.value = surname + String.fromCharCode(fc + 65) + String.fromCharCode(sc + 65);
				sc = 0;
				fc++;
			} else {
				ele.value = surname + String.fromCharCode(fc + 65) + String.fromCharCode(sc + 65);
				sc++;
			}
		}
	});

	var Aa = Adult;
	var Ss = Sen;

	$('select.nameFirming').each(function (idx, ele) {
		var pax = new RegExp("paxCode");
		if (pax.exec(ele.id)) {
			if (Aa > 0) {
				Aa--;
			}
			else if (Ss > 0) {
				ele.selectedIndex = 1;
				Ss--;
			}
			else {
				ele.selectedIndex = 2;
			}
		}
	});
	$('input.nameFirming').each(function (idx, ele) {
		var age = new RegExp("age");
		if (age.exec(ele.id)) {

			if(firstName===''){
				ele.value = '';
			}
			else if (Adult > 0) {
				ele.value = 25;
				Adult--;
			}
			else if (Sen > 0) {
				ele.value = 16;
				Sen--;
			}
			else if (Child > 0) {
				ele.value = 5;
				Child--;
			}
			else {
				ele.value = 1;
			}
		}
	});
	$('select.nameFirming').each(function (idx, ele) {
		var n = new RegExp("nationality");
		if (n.exec(ele.id)) {
			ele.selectedIndex = countryIDX;
		}
	});
	$('select.nameFirming').each(function (idx, ele) {
		var g = new RegExp("gender");
		if (g.exec(ele.id)) {
			ele.selectedIndex = 1;
		}
	});
	$('#nameFirmingCopy').click();
}
