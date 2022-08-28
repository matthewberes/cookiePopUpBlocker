chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){
	if(message.txt == "remove"){
		chrome.scripting.removeCSS({ target: {tabId: message.tabId}, files: ["index.css"]});
	}
	if(message.txt == "insert"){
		chrome.scripting.insertCSS({ target: {tabId: message.tabId}, files: ["index.css"]});
	}
}


