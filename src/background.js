status("ibeenabled");
status("grpenabled");
status("nfenabled");
status("expenabled");
status("crdenabled");
status("numpenabled");
status("tacenabled");

function status(typ) {  
	var local = localStorage[typ];	
	if(local == 'undifined'){
		localStorage[typ] = "false";		
	}
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {	
	if (request.method == "getLocalStorage"){		
		sendResponse({data: localStorage[request.key]});
	}	
    else{
		sendResponse({}); 
	}
});

function setLocalStore(val, id){
	if(id == "grp"){		
		localStorage["grpenabled"] = val;
	}
	else if(id == "ibe"){
		localStorage["ibeenabled"] = val;		
	}
	else if(id == "nf"){
		localStorage["nfenabled"] = val;
	}	
	else if(id == "exp"){
		localStorage["expenabled"] = val;
	}	
	else if(id == "crd"){
		localStorage["crdenabled"] = val;
	}
	else if(id == "nump"){
		localStorage["numpenabled"] = val;
	}
	else if(id == "tac"){
		localStorage["tacenabled"] = val;
	}		
}

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
		if(id == "grp"){			
			chrome.tabs.sendRequest(tab.id, "grp"+typ);
		}
		else if(id == "ibe"){
			chrome.tabs.sendRequest(tab.id, "ibe"+typ);
		}
		else if(id == "nf"){
			chrome.tabs.sendRequest(tab.id, "nf"+typ); 	
		}			
		else if(id == "exp"){
			chrome.tabs.sendRequest(tab.id, "exp"+typ); 	
		}	
		else if(id == "crd"){
			chrome.tabs.sendRequest(tab.id, "crd"+typ); 	
		}		
		else if(id == "nump"){
			chrome.tabs.sendRequest(tab.id, "nump"+typ); 	
		}
		else if(id == "tac"){
			chrome.tabs.sendRequest(tab.id, "tac"+typ); 	
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

var ibe = chrome.contextMenus.create({
	"title": "Enable ibe", "id" : "ibe", "type": "checkbox", "checked" : isChecked("ibeenabled"), "onclick":checkboxOnClick
});
var grp = chrome.contextMenus.create({
	"title": "Enable group", "id" : "grp", "type": "checkbox", "checked" :  isChecked("grpenabled"),  "onclick":checkboxOnClick
});
var nameFirm = chrome.contextMenus.create({
	"title": "Enable NameFirming", "id" : "nf", "type": "checkbox", "checked" : isChecked("nfenabled"), "onclick":checkboxOnClick
});
var exp = chrome.contextMenus.create({
	"title": "Enable Express", "id" : "exp", "type": "checkbox", "checked" : isChecked("expenabled"), "onclick":checkboxOnClick
});
var crd = chrome.contextMenus.create({
	"title": "Enable Credit Card", "id" : "crd", "type": "checkbox", "checked" : isChecked("crdenabled"), "onclick":checkboxOnClick
});
var nump = chrome.contextMenus.create({
	"title": "Enable Number Plate", "id" : "nump", "type": "checkbox", "checked" : isChecked("numpenabled"), "onclick":checkboxOnClick
});
var tac = chrome.contextMenus.create({
	"title": "Enable T&Cs", "id" : "tac", "type": "checkbox", "checked" : isChecked("tacenabled"), "onclick":checkboxOnClick
});
var opts = chrome.contextMenus.create({
	"title": "Open Config", "id" : "config", "onclick":openConfig
});