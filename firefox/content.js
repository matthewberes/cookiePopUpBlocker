//Matt Beres August 2022
//browser extension to remove elements from a webpage, intended for pop ups
//saves all the elements you want to hide in a unique array for each website in storage and automatically hides them on future visits

let editOn = 0;
var obj;
const url = new URL(document.location.href);
domain = url.hostname;

//checks for saved preference
chrome.storage.local.get(obj, function(data){
	//if there is saved data for this website in storage
	if(data[domain]){
		//if the stored data exists (is not null)
		if(document.getElementsByClassName(data[domain][0])[0]){
			//hide each element from array saved in storage
			for (var i = 0; i < data[domain].length; i++) {
				document.getElementsByClassName(data[domain][i])[0].style.visibility = "hidden";
			}
		}
	}
});
//listens for message from popup control panel
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){	
	//turn on edit mode, add css hover file
	if(message.txt == "edit"){	
		editOn = 1;
		document.body.style.cursor = "crosshair";
		chrome.runtime.sendMessage({txt: "insert"});
	}
	//turn off edit mode, remove css hover file
	if(message.txt == "exit"){
		editOn = 0;
		document.body.style.cursor = "";
		chrome.runtime.sendMessage({txt: "remove"});
	}
	//erase storage for the current website
	if(message.txt == "remove"){
		obj = {};
		obj[domain] = [];
		chrome.storage.local.set(obj);
	}
	//save quick click changes to storage
	if(message.txt == "qc"){
		obj = {};
		obj["quickClick"] = message.value;
		chrome.storage.local.set(obj);
	}
}
//clicked on page element
$('div').click(function() {
	//if edit mode is off, do nothing
	if(editOn == 0){
		return
	}
	//get the class name of the element clicked
	var c = $(this).attr('class');
	//hide element
	document.getElementsByClassName(c)[0].style.visibility = "hidden";
	//reset cursor
	document.body.style.cursor = "";
	//turn off edit mode
	editOn = 0;
	chrome.runtime.sendMessage({txt: "remove"});
	//saves element's class name in an array in storage to remove the element automatically on future visits
	chrome.storage.local.get(obj, function(data){
		//if there is no array for this website, make one
		if(!data[domain]){
			data[domain] = [];
		}
		//add element to array for this website
		data[domain].push(c);
		//save array
		chrome.storage.local.set(data);
	});
});