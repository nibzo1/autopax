$(function() {

	var cards = {
		"VI" : "4111111111111111",
		"VIE" : "4444333322221111",
		"MCA" : "5454545454545454",
		"DC" : "5555555555554444",
		"AX" : "343434343434343",
		"VI2" : "36148900647913"
	};

	$('#cardType').on('change', function(){
		 for (var key in cards) {
        	if (cards.hasOwnProperty(key) && key === $(this).val()) {
            	$("#cardNumber").val(cards[key]);
            }
        }
	});


	var max = 0;

	$("label").width(max);

	$("#tabs").tabs();

    /*$("label").each(function(){
        if ($(this).width() > max)
            max = $(this).width();
    });*/

	$("#accordion").accordion();

	$("#button").button();

	$("#radioset").buttonset();

	$("#dialog").dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Ok",
				click: function() {
					$(this).dialog("close");
				}
			},
			{
				text: "Cancel",
				click: function() {
					$(this).dialog("close");
				}
			}
		]
	});

	// Link to open the dialog
	$("#dialog-link").click(function(event) {
		$("#dialog").dialog("open");
		event.preventDefault();
	});

	$("#datepicker").datepicker({
		inline: true
	});

	$("#slider").slider({
		range: true,
		values: [17, 67]
	});

	$("#progressbar").progressbar({
		value: 20
	});

	// Hover states on the static widgets
	$( "#dialog-link, #icons li" ).hover(
		function() {
			$(this).addClass("ui-state-hover");
		},
		function() {
			$(this).removeClass("ui-state-hover");
		}
	);
});