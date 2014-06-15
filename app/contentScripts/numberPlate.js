chrome.extension.sendRequest({method: "getLocalStorage", key: "ls.ConfigOptions", value: "np"}, function(response) {
	if(response && response.data == 'true'){
		doNumPlate(customer);
	}
});

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "numpenabled"){
		doNumPlate(numberPlate);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "numpdisabled"){
		doNumPlate("");
	}
});*/

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