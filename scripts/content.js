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
	  	attachUpgradePopup();
	});
};

function attachUpgradePopup() {
	$(".upgrade-popup-container").remove();
	$("body").append(`
		<div class="upgrade-popup-container">
			<div class="upgrade-popup">
				<img class="popup-img" src="https://i.imgur.com/6sOdwYs.png">
				<p class="upgrade-popup-text">This post is a video.</p><br>
				<p class="upgrade-popup-text">To download videos upgrade to</p>
				<p class="upgrade-popup-text">the PRO version!</p>
				<span class="popup-close">X</span>
			</div>
		</div>
	`);
	$(".popup-close").click(function() {
	  	$(".upgrade-popup-container").remove();
	});
}


runCEContentScript();
ceCheckLocation();


