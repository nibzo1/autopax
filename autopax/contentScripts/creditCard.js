//credit card auto populate
chrome.extension.sendRequest({method: "getLocalStorage", key: "crdenabled"}, function(response) {
	if(response && response.data == 'true'){
		doCard(cardNumber,cardName,cardMonth,cardYear,cvv,cardType)
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "grpenabled"){ 		
		doCard(cardNumber,cardName,cardMonth,cardYear,cvv,cardType);
	} 
}); 

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){ 
	if(request == "grpdisabled"){ 				
		doPax("","","","","","");
	} 
}); 

function doCard(cardNumber,cardName,cardMonth,cardYear,cvv,cardType){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	if($('[name="CVC"]').length || $('[name="cardNumber"]').length || $('[name="cardHolderName"]').length || $('[name="expiryMonth"]').length || $('[name="expiryYear"]').length){
		$('[name="cardNumber"]').val(cardNumber);
		$('[name="cardHolderName"]').val(cardName);	
		$('[name="expiryMonth"]').prop('selectedIndex', cardMonth);
		$('[name="expiryYear"]').prop('selectedIndex', cardYear);
		$('[name="CVC"]').val(cvv);
	}
	if($('[name="paymentTypes"]').length){
		$('[name="paymentTypes"]').children("option").each(function(){
			$(this).removeAttr("selected");
		});
		
		$('[name="paymentTypes"]').children("option").each(function(){
			if($(this).val() == cardType){
				$(this).prop('selected', 'true');
			}		
		});		
	}	
}