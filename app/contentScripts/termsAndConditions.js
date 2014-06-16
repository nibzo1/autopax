chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "tc"}, function(response) {
	if(response && response.data === true){
		doTac(true);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		doPax(true);
	}
	else if(request.data == false){
		doPax(false);
	}
});

function doTac(status){
	if(status){
		$('input[type="checkbox"]').prop("checked", "true");
		$('#ferry-information-agree').val("true");
	}
	else{
		$('input[type="checkbox"]').removeAttr('checked');
		$('#ferry-information-agree').val("false");
	}
}