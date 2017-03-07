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

	if($('[name="securityCode"]').length || $('[name="cardNumber"]').length || $('[name="cardholderName"]').length || $('[name="expiryMonth"]').length || $('[name="expiryYear"]').length){
		$('[name="cardNumber"]').click().focus().val(card.cardNumber).blur();
		$('[name="cardholderName"]').click().focus().val(card.cardUser).blur();
		$('[name="expiryDate.expiryMonth"]').click().focus().val(card.expMonth).blur();
		$('[name="expiryDate.expiryYear"]').click().focus().val(card.expYear).blur();
		$('[name="securityCode"]').click().focus().val(card.cvv).blur();
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

	if($('input[name="agreeAndReserve"]').length){
		$('input[name="agreeAndReserve"]').prop("checked", "checked");
		$('input[name="agreeAndReserve"]').attr("checked", "checked");
	}
	else{
		$('input[name="agreeAndReserve", type="checkbox"]').removeAttr('checked');
		$('input[name="agreeAndReserve", type="checkbox"]').val("false");
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