chrome.extension.sendRequest({method: "getConfig", key: "allpaxenabled"}, function(response) {
	if(response && response.data === true){
		allPax(true);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		allPax(customer);
	}
	else if(request.data == false){
		allPax(null);
	}
});


function allPax(status){
	/*if(status){
		$('#continue-btn').live('click', function(){
			$('.allPax').each(function(){
			  $(this).click();
			});
		});
	}*/
}