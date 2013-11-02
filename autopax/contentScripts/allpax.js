chrome.extension.sendRequest({method: "getLocalStorage", key: "allpaxenabled"}, function(response) {
	if(response && response.data == 'true'){
		doTac(true);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "allpaxenabled"){ 			
		doTac(true);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "allpaxdisabled"){ 				
		doTac(false);
	} 
}); 

function doTac(status){
	if(status){			
		$('#continue-btn').live('click', function(){
			$('.allPax').each(function(){
			  $(this).click()
			});
		});	
	}	
}