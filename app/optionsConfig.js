// Saves options to localStorage.
document.addEventListener('DOMContentLoaded', function () {
	restore_config_options();

	if($('#configer').length){
		document.querySelector('#configer').addEventListener('click', openConfiger);
	}

	var inputs = $('input[type="checkbox"][rel="config"]');
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('click', configHandler);
	}

	$('#cardType').on('click', function(){

	});
});

function configHandler(e) {
	if($(this).prop("checked")){
		setLocalStore1("true", $(this).attr('id'));
	}
	else{
		setLocalStore1("false", $(this).attr('id'));
	}
}

function setLocalStore1(val, id){
	if(id.length){
		localStorage[id+"enabled"] = val;
	}
}

// Restores select box state to saved value from localStorage.
function restore_config_options() {

	//restore config options
	var inputs = $('input[type="checkbox"][rel="config"]');
	for(var i = 0; i < inputs.length; i++) {
		if(isChecked($(inputs[i]).attr('id')+"enabled")){
			$(inputs[i]).prop("checked", "true");
		}
		else{
			$(inputs[i]).removeAttr('checked');
		}
	}
}

function isChecked(typ) {
	if(localStorage[typ] == "true"){
		return true;
	}
	else{
		return false;
	}
}

function openConfiger() {
	chrome.tabs.create({
		url: "options.html"
	});
}