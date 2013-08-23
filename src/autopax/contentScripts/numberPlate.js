chrome.extension.sendRequest({method: "getLocalStorage", key: "numpenabled"}, function(response) {
	if(response && response.data == 'true'){
		doNumPlate(numberPlate);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "numpenabled"){ 			
		doNumPlate(numberPlate);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "numpdisabled"){ 				
		doNumPlate("");
	} 
}); 

function doNumPlate(numberPlate){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	$('input.standard').each(function (idx, ele) {		
		ele.focus();
		if(numberPlate===''){
			ele.value = '';
		}
		else{
			ele.value = numberPlate + suffix(idx);
		}		
	});
}