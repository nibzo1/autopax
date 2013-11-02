chrome.extension.sendRequest({method: "getLocalStorage", key: "allpaxenabled"}, function(response) {
	if(response && response.data == 'true'){
		doAutopax(true);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "allpaxenabled"){ 			
		doAutopax(true);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "allpaxdisabled"){ 				
		doAutopax(false);
	} 
}); 

function doAutopax(status){
	if(status){			
		$('#continue-btn').live('click', function(){
			$('.allPax').each(function(){
			  $(this).click()
			});
		});	
	}	
}