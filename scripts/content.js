function runCEContentScript() {

	console.log('Content Script Ran.');
	var downloadCount = 0;

	// for profile page add download btn when hover on each post
	$("article").on("mouseenter", ".v1Nh3", function(event) {
	    var elem = $(this);
	    elem.append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');
	    var postIsVideo = checkIfVideo(elem);
	    if (!postIsVideo) attachPhotoClickAction(downloadCount);
	    else attachVideoClickAction(downloadCount);
	});

	// for profile page remove download btn when hover on each post
	$("article").on("mouseleave", ".v1Nh3", function(event) {
	    $('.download-icon').remove();
	    downloadCount++;
	});

	// for single post page add download btn on post
	$("body").on("mouseenter", "._97aPb", function(event) {
		var elem = $(this);
		var postType = singlePostGetPostType(elem);
		var proUser = clientIsProUser();
		$('.download-icon').remove();
		elem.append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down"></i>');
		handleSinglePostDownloadClick(postType, proUser);
	});

	$("body").on("mouseleave", "._97aPb", function(event) {
		$('.download-icon').remove();
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

function clientIsProUser() {
	return false;
};

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
	  	attachUpgradePopup('a video', 'body');
	});
};

function attachUpgradePopup(str, bindTo) {
	$(".upgrade-popup-container").remove();
	$(bindTo).append(`
		<div class="upgrade-popup-container">
			<div class="upgrade-popup">
				<img class="popup-img" src="https://i.imgur.com/6sOdwYs.png">
				<p class="upgrade-popup-text">This post is ${str}.</p><br>
				<p class="upgrade-popup-text">To download videos or albums</p>
				<p class="upgrade-popup-text">upgrade to the PRO version!</p>
				<span class="popup-close">X</span>
			</div>
		</div>
	`);
	$(".popup-close").click(function() {
		console.log('closing')
	  	$(".upgrade-popup-container").remove();
	});
}


function handleSinglePostDownloadClick(postType, proUser) {
	if (postType === 'photo') {
		$('.download-icon').click(function() {
			let elem = $(this);
		  	let img = elem.parent().find('img')[0];
		  	let imgAltData = img.alt;
		  	let downloadSource = img.src;
		  	let imgName = 'CAPTION ' + imgAltData.replace(/[*."/\[\]:;|=,<>\n]/g, '');
		  	chrome.runtime.sendMessage({
				url: downloadSource,
				filename: "Instagram Downloads/" + imgName + '.jpg'
		  	});
		});
	}
	if (!proUser) {
		console.log('User not pro');
		console.log('Post type: ', postType);
		if (postType === 'video') $('.download-icon').click(function() { attachUpgradePopup('a video', '._2dDPU'); });
		if (postType === 'album') $('.download-icon').click(function() { attachUpgradePopup('an album', '._2dDPU'); });
	}
};

function singlePostGetPostType(elem) {
	var postType = 'photo';
	var videoElemArray = elem.find('.videoSpritePlayButton');
	var albumElemArray = elem.find('.coreSpriteRightChevron, .coreSpriteLeftChevron');
	if (videoElemArray.length) postType = 'video';
	if (albumElemArray.length) postType = 'album';
	return postType;
};

$('body').on('click', '.popup-close', function () {
    console.log('Click detected; modal will be displayed');
    $(".upgrade-popup-container").remove();
});


runCEContentScript();
ceCheckLocation();


