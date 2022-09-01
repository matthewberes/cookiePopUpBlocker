//Matt Beres August 2022
//browser extension to remove elements from a webpage, intended for pop ups
//saves all the elements you want to hide in a unique array for each website in storage and automatically hides them on future visits

//handles control panel interaction
$(document).ready(function() {
	//arguments for query calls
	let params = {
		active: true,
		currentWindow: true
	}
	//user data
	var obj;

	//storage get quickClick setting
	chrome.storage.local.get(obj, function(data){
		//if quickClick setting data exists
		if(data["quickClick"]){
			//set value in control panel
			document.getElementById("quickClick").value = data["quickClick"];
			//if quickClick is on, begin edit mode right away
			if(document.getElementById("quickClick").value == "yes"){
				document.getElementById("prompt").innerHTML = "Click on the pop up to hide it";
				document.getElementById("editMode").style.display = "none";
				document.getElementById("cancel").style.display = "block";
				//send message to content script
				chrome.tabs.query(params, gotTabs);
				function gotTabs(tabs){	
					chrome.tabs.sendMessage(tabs[0].id, {txt: "edit"});
				}
			}
		}
	});
	//sends message to turn on crosshair and highlight elements on hover
	document.getElementById("editMode").onclick = function() {EDIT()};
	function EDIT(){
		document.getElementById("prompt").innerHTML = "Click on the pop up to hide it";
		document.getElementById("editMode").style.display = "none";
		document.getElementById("cancel").style.display = "block";
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {txt: "edit"});
		}
	}
	//sends message to turn off crosshair, and the element highlight on hover
	document.getElementById("cancel").onclick = function() {CANCEL()};
	function CANCEL(){
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {txt: "exit"});
		}
		window.close();
	}
	//changed quick click setting, sends message to save change in storage	
	document.getElementById("quickClick").onchange = function() {QC()};
	function QC(){
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {txt: "qc", value: document.getElementById("quickClick").value});
			chrome.tabs.reload(tabs[0].id);
			window.close();
		}
	}
	//handles the reset data button, sends message to empty storage
	document.getElementById("remove").onclick = function() {REMOVE()};
	function REMOVE(){
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {txt: "remove"});
			chrome.tabs.reload(tabs[0].id);
			window.close();
		}
	}
	//open settings
	document.getElementById("gear").onclick = function() {SETTINGS()};
	function SETTINGS(){
		document.getElementById("home").style.display = "none";
		document.getElementById("settings").style.display = "block";
	}
	//back to homepage
	document.getElementById("homeIcon").onclick = function() {HOME()};
	function HOME(){
		document.getElementById("home").style.display = "block";
		document.getElementById("settings").style.display = "none";
	}
	//open settings help page
	document.getElementById("question").onclick = function() {HELP()};
	function HELP(){
		document.getElementById("help").style.display = "block";
		document.getElementById("settings").style.display = "none";
	}
	//back to settings
	document.getElementById("back").onclick = function() {BACK()};
	function BACK(){
		document.getElementById("settings").style.display = "block";
		document.getElementById("help").style.display = "none";
	}
});