$(document).ready(function() {
	let params = {
		active: true,
		currentWindow: true
	}
	var obj;

	//storage get quickClick
	chrome.storage.local.get(obj, function(data){
		var myD = data;
		if(myD["quickClick"]){
			document.getElementById("quickClick").value = myD["quickClick"];
			if(document.getElementById("quickClick").value == "yes"){
				document.getElementById("prompt").innerHTML = "Click on the pop up to hide it";
				document.getElementById("editMode").style.display = "none";
				document.getElementById("cancel").style.display = "block";
				//send message to content script
				chrome.tabs.query(params, gotTabs);
				function gotTabs(tabs){	
					chrome.tabs.sendMessage(tabs[0].id, {tab: tabs[0].id, tabs: tabs, txt: "edit"});
				}
			}
		}
	});

	document.getElementById("editMode").onclick = function() {EDIT()};
	function EDIT(){
		document.getElementById("prompt").innerHTML = "Click on the pop up to hide it";
		document.getElementById("editMode").style.display = "none";
		document.getElementById("cancel").style.display = "block";
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {tab: tabs[0].id, tabs: tabs, txt: "edit"});
		}
	}
	document.getElementById("cancel").onclick = function() {CANCEL()};
	function CANCEL(){
		//send message to content script
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {tab: tabs[0].id, tabs: tabs, txt: "exit"});
		}
		window.close();
	}
	document.getElementById("remove").onclick = function() {REMOVE()};
	function REMOVE(){
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {tab: tabs[0].id, tabs: tabs, txt: "remove"});
			chrome.tabs.reload(tabs[0].id);
		}
		window.close();
	}
	document.getElementById("gearIn").onclick = function() {SETTINGS()};
	function SETTINGS(){
		document.getElementById("home").style.display = "none";
		document.getElementById("settings").style.display = "block";
	}
	document.getElementById("homeIcon").onclick = function() {HOME()};
	function HOME(){
		document.getElementById("home").style.display = "block";
		document.getElementById("settings").style.display = "none";
	}
	document.getElementById("question").onclick = function() {HELP()};
	function HELP(){
		document.getElementById("help").style.display = "block";
		document.getElementById("settings").style.display = "none";
	}
	document.getElementById("back").onclick = function() {BACK()};
	function BACK(){
		document.getElementById("settings").style.display = "block";
		document.getElementById("help").style.display = "none";
	}	
	document.getElementById("quickClick").onchange = function() {QC()};
	function QC(){
		chrome.tabs.query(params, gotTabs);
		function gotTabs(tabs){	
			chrome.tabs.sendMessage(tabs[0].id, {tab: tabs[0].id, tabs: tabs, txt: "qc", value: document.getElementById("quickClick").value});
			chrome.tabs.reload(tabs[0].id);
			window.close();
		}
	}
});