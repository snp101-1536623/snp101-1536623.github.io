$(document).ready(function() {
	jQuery("#submitAnswers").click(function(){
		//this just does a simple form submit, standard behavior
		//jQuery("#lectureQuestions").submit();

	    //set form submit dateTime
	    var d = new Date();
	    var dd = d.toISOString();
	    
	    var submitTimeInputTag = document.getElementById("formSubmitTime");
	    var rtn = submitTimeInputTag.setAttribute("value", dd);
		
		//block screen
		setProgDiv();
		
		/*
		implementation of AJAX style form submit, to address page reload on submit
	
		Note: jQuery.post() is always async, as of jQuery 1.8, there is no synchronous option for running an AJAX exchange
		thus, the solution here is to insert a loading div to block user action, and then remove upon success / failure status
		
		*/
		var subReqXHR = jQuery.post(
			'default.aspx', //server-side handler
			jQuery("#lectureQuestions").serialize() //generate <form> field/input string for POSTing
		)
		.success(function(rtnData) { //this will ONLY fire on success, aka HTTP 200
			//insert server turned HTML into the div area selected below
			//alert(rtnData);
			var markerPos = rtnData.indexOf(":**:");
			var studyPoints = rtnData.substr(0,markerPos);
			
			var rest = rtnData.substr(markerPos +4);
			var markerPos2 = rest.indexOf(":**:");
			var lectureKey = rest.substr(0,markerPos2);
			var globalNav = rest.substr(markerPos2 +4);
			
			//alert(studyPoints);
			
			jQuery("#lectureKey").html(lectureKey);
			jQuery("#studyPoints").html(studyPoints);
			jQuery("#globalNavArea").html(globalNav);
			var setAutoComp = setTimeout("initAutoFill()",100);
			rmProgDiv(); //remove the block screen <div>
		}) 
		.error(function(XHRobj, status, err) { //this will ONLY fire on fail, aka HTTP 500
			jQuery("#formError").reveal(); //zurb framework based modal message
			rmProgDiv(); //remove the block screen <div>
		}); 
		
		return false;
	});
});

// utility function: currently unused; conditional check of all fill-ins on page 
// and return true if all are filled in, if not then return false; may be assiged to var for js check
function chkForm(obj){
	var fillin = obj.find(".fill");
	for (var i=0;i<fillin.length;i++){
		if ( fillin.eq(i).val() == "" ) return false;
	}
	return true;
}

//add the loading <div> for blocking use actions
function setProgDiv(){
	jQuery("body").prepend('<div id="loading"><div class="spinner"></div><p>Submitting your responses...</p></div>');
}

function rmProgDiv(){
	jQuery("#loading").fadeOut(600).remove();
}