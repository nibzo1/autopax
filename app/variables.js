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