chrome.extension.sendRequest({method: "getConfig", key: "allpaxenabled"}, function(response) {
	if(response && response.data === true){
		doAutopax(true);
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