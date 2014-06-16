chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "np"}, function(response) {
	if(response && response.data === true){
		doNumPlate(customer);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		doNumPlate(customer);
	}
	else if(request.data == false){
		doNumPlate(null);
	}
});

function doNumPlate(numberPlate){
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