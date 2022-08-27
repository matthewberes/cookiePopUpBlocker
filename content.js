let editOn = 0;

chrome.runtime.sendMessage({test: "test"});

chrome.runtime.onMessage.addListener(gotMessage);
chrome.runtime.lastError;

function gotMessage(message, sender, sendResponse){
	//console.log(message.txt);
	//console.log(editOn);	
	editOn = 1;
}

$('div').click(function() {
	if(editOn == 0){
		return
	}
	var c = $(this).attr('class');
	//console.log("selected div = " + c);
	document.getElementsByClassName(c)[0].style.visibility = "hidden";
	editOn = 0;
});