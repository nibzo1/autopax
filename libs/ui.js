$(function() {

	var max = 0;
    $("label").each(function(){
        if ($(this).width() > max)
            max = $(this).width();    
    });
    $("label").width(max);
		
	$( "#accordion" ).accordion();
	
	var availableTags = [
		"4111111111111111",
		"4444333322221111",
		"343434343434343",
		"5555555555554444",
		"5454545454545454",
		"36148900647913"
	];
	$( "#cardNumber" ).autocomplete({
		source: availableTags
	});
	

	
	$( "#button" ).button();
	$( "#radioset" ).buttonset();
	

	
	$( "#tabs" ).tabs();
	

	
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Ok",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});

	// Link to open the dialog
	$( "#dialog-link" ).click(function( event ) {
		$( "#dialog" ).dialog( "open" );
		event.preventDefault();
	});
	

	
	$( "#datepicker" ).datepicker({
		inline: true
	});
	

	
	$( "#slider" ).slider({
		range: true,
		values: [ 17, 67 ]
	});
	

	
	$( "#progressbar" ).progressbar({
		value: 20
	});
	

	// Hover states on the static widgets
	$( "#dialog-link, #icons li" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);
});