//listen for request from script
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

	if(request.method === "getLocalStorage"){
		sendResponse({data: localStorage[request.key]});
	}
	else if (request.method === "getConfig"){
		sendResponse({data: getValue(JSON.parse(localStorage[request.key]), request.value)});
	}
    else{
		sendResponse({});
	}
});

//utility method to get a value from json using key
function getValue(myJSON, test){
    var str = '';
    for (var key in myJSON) {
        if (myJSON.hasOwnProperty(key) && String(test) === String(key)) {
            str = myJSON[key];
        }
    }
    return str;
}

//set values in the localstorage json obj'z
function setValue(jsonID, test, value){
	var myJSON = JSON.parse(localStorage[jsonID]);
    for (var key in myJSON) {
        if (myJSON.hasOwnProperty(key) && String(test) === String(key)) {
            myJSON[key] = value;
        }
    }
    localStorage[jsonID] = JSON.stringify(myJSON);
}

//application controll functions
function checkboxOnClick(info, tab) {
	var id = info.menuItemId;
	setValue('ls.ConfigOptions', id, info.checked);
	doPaxClickEvt('ls.ConfigOptions', id, info.checked);
}

//Toggle populating of data autofilling on the tab the user is on
function doPaxClickEvt(jsonID, id, value) {
	chrome.tabs.getSelected(null, function (tab){
		if(id.length){
			chrome.tabs.sendRequest(tab.id, {data: getValue(JSON.parse(localStorage[jsonID]), id)});
		}
	});
}

function openConfig() {
	chrome.tabs.create({
		url: "options.html"
	});
}