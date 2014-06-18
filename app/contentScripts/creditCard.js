//credit card auto populate
chrome.extension.sendRequest({method: "getConfig", key: "ls.ConfigOptions", value: "card"}, function(response) {
	if(response && response.data === true){
		runScript(card)
	}
});

//handle script being enabled/disabled from context menu checkbox
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.data == true){
		runScript(card);
	}
	else if(request.data == false){
		runScript(null);
		//wipe out json
		var myJSON = card;
		for (var key in myJSON) {
			if (myJSON.hasOwnProperty(key)) {
				myJSON[key] = '';
			}
		}
		runScript(myJSON);
	}
});

function runScript(card){
	var suffix = function (idx) {
		return String.fromCharCode(idx + 65);
	};
	if($('[name="CVC"]').length || $('[name="cardNumber"]').length || $('[name="cardHolderName"]').length || $('[name="expiryMonth"]').length || $('[name="expiryYear"]').length){
		$('[name="cardNumber"]').val(card.cardNumber);
		$('[name="cardHolderName"]').val(card.cardUser);
		$('[name="expiryMonth"]').val(card.expMonth);
		$('[name="expiryYear"]').val(card.expYear);
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