//default enabled content scripts
status("ibeenabled");
status("grpenabled");
status("nfenabled");
status("expenabled");
status("crdenabled");
status("numpenabled");
status("tacenabled");
status("allpaxenabled");

//listen for request from script
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage"){
		sendResponse({data: localStorage[request.key]});
	}
    else{
		sendResponse({});
	}
});

//application controll functions
function checkboxOnClick(info, tab) {
	var id = info.menuItemId;
	if(info.checked == true){
		setLocalStore("true", id);
		doPaxClickEvt("enabled",id);
	}
	else{
		setLocalStore("false", id);
		doPaxClickEvt("disabled",id);
	}
}

function doPaxClickEvt(typ,id) {
	chrome.tabs.getSelected(null, function (tab){
		if(id.length){
			chrome.tabs.sendRequest(tab.id, id+typ);
		}
	});
}

function isChecked(typ) {
	if(localStorage[typ] == "true"){
		return true;
	}
	else{
		return false;
	}
}

function openConfig() {
	chrome.tabs.create({
		url: "options.html"
	});
}

function setLocalStore(val, id){
	if(id.length){
		localStorage[id+"enabled"] = val;
	}
}

function status(typ) {
	var local = localStorage[typ];
	if(local == 'undifined'){
		localStorage[typ] = "false";
	}
}