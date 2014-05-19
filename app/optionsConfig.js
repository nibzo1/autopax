// Saves options to localStorage.
$(document).ready(function(){
	restore_config_options();

	$('#configer').on('click', function(){
		openConfiger();
	});
	$('input[type="checkbox"][rel="config"]').on('click', function(){
		configHandler($(this));
	});
});

function configHandler(e) {
	if(e.prop('checked')){
		setLocalStoreConfig('true', e.attr('id'));
	}
	else{
		setLocalStoreConfig('false', e.attr('id'));
	}
}

function setLocalStoreConfig(val, id){
	if(id.length){
		localStorage[id+'enabled'] = val;
	}
}

// Restores checkbox state to saved value from localStorage.
function restore_config_options() {
	$('input[type="checkbox"][rel="config"]').each(function(){
		var e = $(this);
		if(isChecked(e.attr('id')+'enabled')){
			e.prop('checked', 'true');
		}
		else{
			e.removeAttr('checked');
		}
	});
}

function isChecked(typ) {
	if(localStorage[typ] == 'true'){
		return true;
	}
	else{
		return false;
	}
}

function openConfiger() {
	chrome.tabs.create({
		url: 'options.html'
	});
}