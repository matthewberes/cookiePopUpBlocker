let editOn = 0;
var currTab = "";
var result = "";
var domain = "";
var obj;
const url = new URL(document.location.href);
domain = url.hostname;

//checks for saved preference
chrome.storage.local.get(obj, function(data){
	if(data[domain]){
		if(document.getElementsByClassName(data[domain][0])[0]){
			for (var i = 0; i < data[domain].length; i++) {
				document.getElementsByClassName(data[domain][i])[0].style.visibility = "hidden";
			}
		}
	}
});

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){	
	currTab = message.tab;
	const url = new URL(message.tabs[0].url);
	domain = url.hostname;
	if(message.txt == "edit"){	
		editOn = 1;
		document.body.style.cursor = "crosshair";
		chrome.runtime.sendMessage({txt: "insert"});
	}if(message.txt == "exit"){
		editOn = 0;
		document.body.style.cursor = "";
		chrome.runtime.sendMessage({txt: "remove"});
	}if(message.txt == "remove"){
		obj = {};
		obj[domain] = [];
		chrome.storage.local.set(obj);
	}if(message.txt == "qc"){
		obj = {};
		obj["quickClick"] = message.value;
		chrome.storage.local.set(obj);
	}
}

$('div').click(function() {
	if(editOn == 0){
		return
	}
	var c = $(this).attr('class');
	document.getElementsByClassName(c)[0].style.visibility = "hidden";
	document.body.style.cursor = "";
	editOn = 0;
	chrome.runtime.sendMessage({txt: "remove"});
	//handle storage object creation
	//make json from domain and c	
	chrome.storage.local.get(obj, function(data){
		if(!data[domain]){
			data[domain] = [];
		}
		data[domain].push(c);
		chrome.storage.local.set(data);
	});
});