//credit card auto populate
chrome.extension.sendRequest({method: "getLocalStorage", key: "ls.ConfigOptions", value: "card"}, function(response) {
	if(response && response.data == 'true'){
		doCard(card)
	}
});

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "grpenabled"){
		doCard(cardNumber,cardName,cardMonth,cardYear,cvv,cardType);
	}
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request == "grpdisabled"){
		doPax("","","","","","");
	}
});*/

function doCard(card){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	if($('[name="CVC"]').length || $('[name="cardNumber"]').length || $('[name="cardHolderName"]').length || $('[name="expiryMonth"]').length || $('[name="expiryYear"]').length){
		$('[name="cardNumber"]').val(card.cardNumber);
		$('[name="cardHolderName"]').val(card.cardName);
		$('[name="expiryMonth"]').prop('selectedIndex', card.cardMonth);
		$('[name="expiryYear"]').prop('selectedIndex', card.cardYear);
		$('[name="CVC"]').val(card.cvv);
	}
	if($('[name="paymentTypes"]').length){
		$('[name="paymentTypes"]').children("option").each(function(){
			$(this).removeAttr("selected");
		});

		$('[name="paymentTypes"]').children("option").each(function(){
			if($(this).val() == card.cardType){
				$(this).prop('selected', 'true');
			}
		});
	}

	//profile payment screen
	if($('.radio-container').length){
		$('.radio-container').children().children("input").each(function(){
			$(this).prop("checked", false);
			$(this).removeAttr("checked");
		});
		$('.radio-container').children().children("input").each(function(){
			if($(this).val() == card.cardType){
				$(this).prop("checked", true);
				$(this).attr('checked', 'checked');
			}
		});
	}
}