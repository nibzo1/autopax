chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "ap"}, function(response) {
	if(response && response.data === true){
		runScript(true);
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		runScript(true);
	}
	else if(request.data == false){
		runScript(false);
	}
});

function runScript(status){
	if(status){
		$(document).ready(function(){
			$('#continue-btn').on('click', function(){

				//get the links and click each
				var elements = document.querySelectorAll('.allPax');
				if(elements){
					var evt = null;
					$(elements).each(function(i, e){
						var evt = document.createEvent("HTMLEvents");
						if(evt){
							evt.initEvent('click', true, true);
							e.dispatchEvent(evt);
						}
					});
				}
			});
		});
	}
}