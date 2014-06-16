//context menu
var ibe = chrome.contextMenus.create({
	"title": "Enable ibe",
	"id": "ibe",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "ibe"),
	"onclick": checkboxOnClick
});
var grp = chrome.contextMenus.create({
	"title": "Enable group",
	"id": "grp",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "grp"),
	"onclick": checkboxOnClick
});
var nameFirm = chrome.contextMenus.create({
	"title": "Enable NameFirming",
	"id": "nf",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "nf"),
	"onclick": checkboxOnClick
});
var exp = chrome.contextMenus.create({
	"title": "Enable Express",
	"id": "exp",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "exp"),
	"onclick": checkboxOnClick
});
var crd = chrome.contextMenus.create({
	"title": "Enable Credit Card",
	"id": "card",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "card"),
	"onclick": checkboxOnClick
});
var nump = chrome.contextMenus.create({
	"title": "Enable Number Plate",
	"id": "np",
	"type": "checkbox",
	"checked" : getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "np"),
	"onclick": checkboxOnClick
});
var profile = chrome.contextMenus.create({
	"title": "Enable Profile",
	"id": "prof",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "prof"),
	"onclick": checkboxOnClick
});
var tac = chrome.contextMenus.create({
	"title": "Enable T&Cs",
	"id": "tc",
	"type": "checkbox",
	"checked": getValue(JSON.parse(localStorage["ls.ConfigOptions"]), "tc"),
	"onclick": checkboxOnClick
});
/*var allpax = chrome.contextMenus.create({
	"title": "Enable All Pax", "id" : "allpax", "type": "checkbox", "checked" : isChecked("allpaxenabled"), "onclick":checkboxOnClick
});*/
var opts = chrome.contextMenus.create({
	"title": "Open Config",
	"id": "config",
	"onclick": openConfig
});