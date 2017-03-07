var card = {};
var customer = {};

chrome.extension.sendRequest({method: "getLocalStorage", key: "ls.CustomerOptions"}, function(response) {
	if(response && response.data != ''){
		customer = JSON.parse(response.data);
	}
});

chrome.extension.sendRequest({method: "getLocalStorage", key: "ls.CardOptions"}, function(response) {
	if(response && response.data != ''){
		card = JSON.parse(response.data);
	}
});


//inject function to trigger a change event on countryList to enable defaulting of merchant country ect..
/*var s = document.createElement('script');
s.textContent = "ns(document).ready(function() {merchantCountryHandler(ns('#checkout.contactDetails.countryList')); })";
s.onload = function() {
    this.parentNode.removeChild(this);
};
document.head.appendChild(s);*/

//trigger changes on selectboxes using javascript, jquery has a freak out
function triggerChange(queryType, query, event, val){

	if(queryType === 'class'){
		query = '.' + query;
	}
	else if(queryType === 'id'){
		query = '#' + query;
	}
	else if(queryType === 'xpath'){
		query = query;
	}

	var elements = document.querySelector(query);
	var evt = document.createEvent("HTMLEvents");
	if(elements){
		evt.initEvent(event, true, true);
		elements.dispatchEvent(evt);
	}
}

// calculate the approprite year to each pax type
function getPaxYear(paxType){

	var year = new Date().getFullYear();
	if (typeof paxType === 'undefined' || paxType === '') {
		return year;
	}
	else{
		if (paxType === 'INF') {
			year = (year - 3);
		}
		else if (paxType === 'CHD') {
			year = (year - 14);
		}
		else if (paxType === 'ADT' || paxType === 'SEN') {
			year = (year - 18);
		}
		return year;
	}
}