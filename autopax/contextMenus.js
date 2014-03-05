
//context menu
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
var nump = chrome.contextMenus.create({
	"title": "Enable Profile", "id" : "nump", "type": "checkbox", "checked" : isChecked("profileenabled"), "onclick":checkboxOnClick
});
var tac = chrome.contextMenus.create({
	"title": "Enable T&Cs", "id" : "tac", "type": "checkbox", "checked" : isChecked("tacenabled"), "onclick":checkboxOnClick
});
var allpax = chrome.contextMenus.create({
	"title": "Enable All Pax", "id" : "allpax", "type": "checkbox", "checked" : isChecked("allpaxenabled"), "onclick":checkboxOnClick
});
var opts = chrome.contextMenus.create({
	"title": "Open Config", "id" : "config", "onclick":openConfig
});