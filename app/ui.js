$(function() {

	var max = 0;

	$("label").width(max);

	$("#tabs").tabs();

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