//Matt Beres August 2022
//browser extension to remove elements from a webpage, intended for pop ups
//saves all the elements you want to hide in a unique array for each website in storage and automatically hides them on future visits

//injects css for edit mode, index.css highlights all page elements with diagonal lines when you hover over them with your cursor
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){
	//inject index.css, turn on highlight hover
	if(message.txt == "insert"){
		chrome.scripting.insertCSS({ target: {tabId: sender.tab.id}, files: ["index.css"]});
	}
	//remove index.css, turn off highlight hover
	if(message.txt == "remove"){
		chrome.scripting.removeCSS({ target: {tabId: sender.tab.id}, files: ["index.css"]});
	}
}