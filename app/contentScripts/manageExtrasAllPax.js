chrome.extension.sendRequest({method: "getLocalStorage", key: "allpaxenabled"}, function(response) {
	if(response && response.data == 'true'){
		allPax(true);
	}
});

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "allpaxenabled"){
		allPax(true);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "allpaxdisabled"){
		allPax(false);
	}
});*/

function allPax(status){
	/*if(status){
		$('#continue-btn').live('click', function(){
			$('.allPax').each(function(){
			  $(this).click();
			});
		});
	}*/
}