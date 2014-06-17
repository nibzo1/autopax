chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "np"}, function(response) {
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

function runScript(numberPlate){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('input.standard').each(function (idx, ele) {
		ele.focus();
		if(customer.numberPlate===''){
			ele.value = '';
		}
		else{
			ele.value = customer.numberPlate + suffix(idx);
		}
	});
}