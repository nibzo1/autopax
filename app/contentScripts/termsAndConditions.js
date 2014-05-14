chrome.extension.sendRequest({method: "getLocalStorage", key: "tacenabled"}, function(response) {
	if(response && response.data == 'true'){
		doTac(true);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "tacenabled"){ 			
		doTac(true);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "tacdisabled"){ 				
		doTac(false);
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