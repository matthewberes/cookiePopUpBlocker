$(document).ready(function() {

	document.getElementById("editMode").onclick = function() {EDIT()};
	function EDIT(){
		document.getElementById("prompt").innerHTML = "Click on the pop up to hide it";
		document.getElementById("editMode").style.display = "none";
		document.getElementById("cancel").style.display = "block";
		//send message to content script
		let params = {
			active: true,
			currentWindow: true
		}
		chrome.tabs.query(params, gotTabs);

		function gotTabs(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {txt: "edit"});
		}
	}
	document.getElementById("cancel").onclick = function() {CANCEL()};
	function CANCEL(){
		document.getElementById("prompt").innerHTML = "Click here to remove a page element";
		document.getElementById("cancel").style.display = "none";
		document.getElementById("editMode").style.display = "block";
	}
});