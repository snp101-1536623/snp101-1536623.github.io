$(document).ready(function () {
    jQuery(".ajaxButton").click(function () {
        var targetKey = $(this).attr("data");
        //this just does a simple form submit, standard behavior
        //jQuery("#lectureQuestions").submit();
        alert(targetKey);
        //block screen
        setProgDiv();

        /*
        implementation of AJAX style form submit, to address page reload on submit
		
        Note: jQuery.post() is always async, as of jQuery 1.8, there is no synchronous option for running an AJAX exchange
        thus, the solution here is to insert a loading div to block user action, and then remove upon success / failure status
		
        */
        var subReqXHR = jQuery.post(
			'default.aspx', //server-side handler
            targetKey
        //jQuery("#ajaxForm").serialize() //generate <form> field/input string for POSTing
		)
		.success(function (rtnData) { //this will ONLY fire on success, aka HTTP 200
		    //insert server turned HTML into the div area selected below
		    //var markerPos = rtnData.indexOf(":**:")
		    var output = rtnData
		    //var lectureKey = rtnData.substr(markerPos +4)
		    //var studyPoints = rtnData.substr(0,markerPos)
		    jQuery("#ajaxTarget").html(output);
		    //jQuery("#lectureQuestions .vocab .content").html(studyPoints);
		    //var setAutoComp = setTimeout("initAutoFill()",100);
		    rmProgDiv(); //remove the block screen <div>
		})
		.error(function (XHRobj, status, err) { //this will ONLY fire on fail, aka HTTP 500
		    //jQuery("#ajaxError").reveal(); //zurb framework based modal message
		    rmProgDiv(); //remove the block screen <div>
		});

        return false;
    });
});

// utility function: currently unused; conditional check of  allfill-ins on page 
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