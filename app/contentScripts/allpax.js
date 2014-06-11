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
/*	console.log("int he places statrus = "+status);

	if(status){
		console.log("made it in status");
		$(document).ready(function(){
			$('#continue-btn').on('click', function(){
				console.log("in click handler");
			allPax();
				$('.allPax').each(function (){
					console.log("in .each");


					$(this).click();
					$(this).trigger("click");
				});

				$('.allPax').each(function(){$(this).click()});
			});
		});
	}*/
}