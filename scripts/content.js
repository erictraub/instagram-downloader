function runCEContentScript() {

	console.log('Content Script Ran.');
	var downloadCount = 0;

	$("article").on("mouseenter", ".v1Nh3", function(event) {
	    var elem = $(this);
	    elem.append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');
	    var postIsVideo = checkIfVideo(elem);
	    if (!postIsVideo) attachPhotoClickAction(downloadCount);
	    else attachVideoClickAction(downloadCount);
	});


	$("article").on("mouseleave", ".v1Nh3", function(event) {
	    var elem = $(this);
	    $('.download-icon').remove();
	    downloadCount++;
	});

	// $(".v1Nh3").append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');

};

function checkIfVideo(elem) {
	var videoElem = elem.find('span.coreSpriteVideoIconLarge');
	return videoElem.length > 0;
};

function ceCheckLocation() {
	let pageLocation = '';
	setInterval(function() {
		let newLocation = window.location.href;
		if (pageLocation !== newLocation) {
			runCEContentScript();
			pageLocation = newLocation;
			console.log('updated location, ran content script');
		};
	}, 1000);
}

function attachPhotoClickAction(downloadCount) {
	$('.dwnldCount' + downloadCount).click(function() {
	  	let elem2 = $(this);
	  	let aSibling = elem2.siblings('a');
	  	let img = aSibling.find('img')[0];
	  	let downloadSource = img.src;
	  	let imgAltData = img.alt;
	  	let imgName = 'CAPTION ' + imgAltData.replace(/[*."/\[\]:;|=,<>\n]/g, '');
	  	chrome.runtime.sendMessage({
			url: downloadSource,
			filename: "Instagram Downloads/" + imgName + '.jpg'
	  	});
	});
};

function attachVideoClickAction(downloadCount) {
	$('.dwnldCount' + downloadCount).click(function() {
	  	alert('This is a video. Upgrade to PRO to download videos!');
	});
};


runCEContentScript();
ceCheckLocation();


