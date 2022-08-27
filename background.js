let editOn = 0;

chrome.runtime.onMessage.addListener(gotMessage);
chrome.runtime.lastError;

function gotMessage(message, sender, sendResponse){
	console.log(message.txt);
	editOn = 1;
	console.log(editOn);
}