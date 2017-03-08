// 
// online now
// self constructing module
// note! this script must be after #online-now html
// 
(function () {



	// 
	// global variables
	// 

	// slider/thumbs
	var $parent = $('#online-now');
	var $slider = $parent.find('.slider');
	var $container = $slider.find('.thumbs');
	var $slideLeftButton = $parent.find('.thumb-control.left');
	var $slideRightButton = $parent.find('.thumb-control.right');

	// thumb popovers
	var $popoverParent = $('#online-popovers-parent');
	var popoverIDs = [];
	



	// 
	// slider sliding
	// 

	(function () {
		var distance = 3;
		var isSliding = false;
		function slide(direction) {
			// go no go
			if (!isSliding) {return;}
			// how far already
			var current = $slider.scrollLeft();
			// left or right
			switch (direction) {
				case 'left':
					$slider.scrollLeft(current - distance);
					break;
				case 'right':
					$slider.scrollLeft(current + distance);
					break;
			}
			// pause for human eyes
			setTimeout(function() {slide(direction);}, 15);
		}
		function sliderStart(direction) {
			if (isSliding) {return;}
			isSliding = true;

			// hide all popovers
			for (var i = 0, l = popoverIDs.length; i < l; i++) {
				$('#' + popoverIDs[i]).hide();
			}

			slide(direction);
		}
		function sliderStop() {
			if (!isSliding) {return;}
			isSliding = false;
		}
		$slideLeftButton.hover(
			function () {sliderStart('left');},
			function () {sliderStop();}
		);
		$slideRightButton.hover(
			function () {sliderStart('right');},
			function () {sliderStop();}
		);
		$slideLeftButton.click(function (e) {e.preventDefault();});
		$slideRightButton.click(function (e) {e.preventDefault();});
	})();



	//
	// content methods
	// 

	// fetch online now data
	function requestData() {
		
      var dummyParm = "&dummy=x" + new Date().getTime() //this is to trick ie into not caching the page
 		$.ajax({
			url: 'default.aspx?poll_whoOnline=true' + dummyParm,
			dataType: 'json',
			success: function (response) {
           if (response && response.data) {
					buildData(response.data);
				} else {
					//buildError(response.error);
					console.log('Error with gClass response');
					console.log(response);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				buildError();
				console.log('Error with Online Now AJAX');
				console.log(jqXHR);
				console.log('bob: text status');
				console.log(textStatus);
				console.log('Bob Error thrown');
				console.log(errorThrown);
				
			}
		});
		
	

		// temp
	var data = {};
	/*	
	data.users_online = [
			{
				id: null,
				netid: "cbecks",
				name: "Caroline Lemert Beightol"
			},
			{
				id: null,
				netid: "akanshad",
				name: "Akansha Deepak"
			},
			{
				id: null,
				netid: "ayh4",
				name: "Anna Yanagida"
			},
			{
				id: null,
				netid: "caffeeb",
				name: "Briana Crystal Caffee"
			},
			{
				id: null,
				netid: "csalcedo",
				name: "Carina Isabel Salcedo"
			},
			{
				id: null,
				netid: "cmlukes",
				name: "Carlina Mikaela Lukes"
			},
			{
				id: null,
				netid: "ckeak",
				name: "Chikheang Eak"
			},
			{
				id: null,
				netid: "cpar5222",
				name: "Christopher Alan Parsons"
			}
			
		];
		buildData(data);*/
	}

	// build out error message
	function buildError(error) {

		// TODO? or better to just try again later?

	}

	// build out online now data
	function buildData(data) {
		var users = [];
		if (data && data.users_online) {
			users = data.users_online;
		}
		buildUserThumbs(users);
		buildUserPopovers(users);
	}

	// build out user thumbnails
	function buildUserThumbs(users) {
		// build new thumb elements
		var thumbEls = [];
		for (var i = 0, l = users.length; i < l; i++) {
			thumbEls.push(createThumbEl(users[i]));
		}
		// empty container & fill with thumbs
		$container.empty();
		$container.append(thumbEls);
		// resize container to thumbs
		adjustContainerSize(users.length);
	}

	// create img element for user thumb
	function createThumbEl(user) {
		// gather attributes
		var id = 'online-thumb-' + user.netid;
		var src = 'courses/currentCourse/' + user.netid + '/public/user.jpg';
		// construct element
		var thumbEl = document.createElement('img');
		thumbEl.setAttribute('id', id);
		thumbEl.setAttribute('src', src);
		thumbEl.setAttribute('title', user.name + ' is online. Click for more');
		

		// TODO click popover activate

		return thumbEl;
	}

	// thumbs are floated, container width needs setting
	function adjustContainerSize(thumbCount) {
		// these sizes set in alexErika.css
		var thumbWidth = 30;
		var thumbPadding = 5;
		var containerPadding = 5;
		// calculate width of all thumbs
		var thumbsWidth = thumbCount * (thumbWidth + thumbPadding);
		// set new container width
		$container.width(thumbsWidth + containerPadding);
	}

	
	// set up custom twbs popovers for user thumbs
	function buildUserPopovers(users) {
		// reset global popover id reference
		popoverIDs = [];
		// build new popover elements
		var popoverEls = [];
		for (var i = 0, l = users.length; i < l; i++) {
			popoverEls.push(createPopoverEl(users[i]));
		}
		// empty parent & insert new popovers
		$popoverParent.empty();
		$popoverParent.append(popoverEls);
	}

	// set up custom twbs popover for a user thumb
	function createPopoverEl(user) {
		// gather content
		var thumbID = 'online-thumb-' + user.netid;
		var popoverID = 'online-popover-' + user.netid;
		var title = '';
		title += '<strong>' + user.name + '</strong>';
		title += createPopoverTitleCloseButtonHTML(popoverID);
		var content = '';
	   var src = 'courses/currentCourse/' + user.netid + '/public/user.jpg';

		content +='<div class="row-fluid">'
		content +='<div class="span3">'
		content +='<img style="width:100%" src="' + src + '"/>'
		content +='</div>'
		content +='<div class="span9">'
		for (var i = 0, l = user.badges.length; i < l; i++) {
			content +='<div style="margin:3px;float:left;"><a href="#" class="btn btn-success fa ' + user.badges[i].icon + '" title="' + user.badges[i].name +'"></a></div>'
			//alert(user.badges[i].icon);
		}
		content +='</div>'
		content +='</div>'
		content +='<div class="row-fluid"><br>'
		content += createPopoverEmailButtonHTML(user);
		content += createPopoverFacebookButtonHTML(user);
		content += createPopoverGoogleButtonHTML(user);
		content +='</div>'


// create popover element
		var popoverEl = document.createElement('div');
		popoverEl.setAttribute('id', popoverID)
		popoverEl.setAttribute('class', 'popover top online-popover');
		var popoverHTML = '';
		popoverHTML += '<div class="arrow"></div>';
		popoverHTML += '<h3 class="popover-title">';
		popoverHTML += title;
		popoverHTML += '</h3>';
		popoverHTML += '<div class="popover-content">';
		popoverHTML += content;
		popoverHTML += '</div>';
		popoverEl.innerHTML = popoverHTML;
		// store reference
		popoverIDs.push(popoverID);
		// setup trigger event
		$('#' + thumbID).click(function (e) {
			e.preventDefault();
			// hide all other popovers
			for (var i = 0, l = popoverIDs.length; i < l; i++) {
				var targetID = popoverIDs[i];
				if (targetID === popoverID) {continue;}
				$('#' + targetID).hide();
			}
			// position & show
			var popoverWidth = 250;
			var popoverHeight = 160;
			var arrowLeftComp = 30;
			var arrowTopComp = -5;
			var left = e.clientX - popoverWidth + arrowLeftComp;
			var top = e.clientY - popoverHeight + arrowTopComp;
			$('#' + popoverID)
				.css({'left': left, 'top': top})
				.show();
		});
		// return for DOM insert
		return popoverEl;
	}

	function createPopoverTitleCloseButtonHTML(popoverID) {
		return '<button type="button" class="close" onclick="$(&quot;#' + popoverID + '&quot;).hide();">&times;</button>';
	}

	function createPopoverEmailButtonHTML(user) {
		var href = 'mailto:' + user.netid + '@uw.edu';
		return '<a class="btn btn-mini" href="' + href + '" target="_blank">Email</a>';
	}

	function createPopoverFacebookButtonHTML(user) {
		var href = 'https://www.facebook.com/search/more/?q=' + user.name;
		return '<a class="btn btn-mini" href="' + href + '" target="_blank">Facebook</a>';
	}

	function createPopoverGoogleButtonHTML(user) {
		var href = 'https://www.google.com/#q=' + user.name;
		return '<a class="btn btn-mini " href="' + href + '" target="_blank">Google</a>';
	}
	



	
	//
	// ajax timer
	// 
	(function () {
		// setup
		var intervalID = null;
		var intervalLength = 1 * 60 * 1000;
		// run timer
		intervalID = setInterval(
			requestData,
			intervalLength
		);
	})();
	


	//
	// first execution
	//
	requestData();


})();