	function enableBeforeUnload() {
    	window.onbeforeunload = function (e) {
       	 return "Discard changes?";
    	};
	}
	function disableBeforeUnload() {
	    window.onbeforeunload = null;
	}
	function advanceQ() {
		var current = document.querySelector('[data-done=current]');
		var next = document.querySelector('[data-done=false]');
		var button = document.getElementById("nextButton")
		if(!next){
			//last one submit
			//debounce button
			button.disabled = true;
		    disableBeforeUnload();
			document.getElementById("qf").submit();

		}else{
			current.setAttribute("data-done", "true");
			current.setAttribute("style", "display:none;")
			var all = document.querySelectorAll('[data-done]');
			var allCount = all.length;
			var dones = document.querySelectorAll('[data-done=true]');
			var doneCount = dones.length;
			document.getElementById("numDone").innerHTML = doneCount + 1;
			next.setAttribute("data-done", "current");
			next.setAttribute("style", "display:block;")
			last = document.querySelector('[data-done=false]');
			if(allCount==doneCount+1){button.innerHTML="submit answers"}
		}
	}

$(document).ready(function() {
	$("#nextButton").click(advanceQ);

});
