let editOn = 0;
var currTab = "";

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){	
	currTab = message.tab;
	if(message.txt == "edit"){	
		editOn = 1;
		document.body.style.cursor = "crosshair";
		chrome.runtime.sendMessage({tabId: message.tab, txt: "insert"});
	}if(message.txt == "exit"){
		editOn = 0;
		document.body.style.cursor = "";
		chrome.runtime.sendMessage({tabId: message.tab, txt: "remove"});
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
	chrome.runtime.sendMessage({tabId: currTab, txt: "remove"});
});