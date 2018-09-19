function runCEContentScript() {

	console.log('Content Script Ran.');
	var downloadCount = 0;

	// for profile page add download btn when hover on each post
	$("article").on("mouseenter", ".v1Nh3", function(event) {
	    var elem = $(this);
	    elem.append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');
	    var postType = profilePageGetPostType(elem);
	    var proUser = clientIsProUser();
	    proUser = true; // pro user for testing
	    handleProfilePagePostDownloadClick(postType, proUser);
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
		proUser = true;  // pro user for testing
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

function attachPhotoClickAction() {
	$('.download-icon').click(function() {
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
	else {  // if video or album
		if (!proUser) {  // not pro user
			console.log('Not pro user.');
			console.log('Post type: ', postType);
			if (postType === 'video') $('.download-icon').click(function() { attachUpgradePopup('a video', '._2dDPU'); });
			if (postType === 'album') $('.download-icon').click(function() { attachUpgradePopup('an album', '._2dDPU'); });
		} else {  // is pro user
			console.log('Is pro user.');
			if (postType === 'video') $('.download-icon').click(function() { downloadVideo($(this)); });
			else if (postType === 'album') $('.download-icon').click(function() { downloadAlbum($(this)); });
		}
	}
};

function handleProfilePagePostDownloadClick(postType, proUser) {
	if (postType === 'photo') attachPhotoClickAction();
	else { // if video or album
		if (!proUser) {
			console.log('User not pro');
			console.log('Post type: ', postType);
			if (postType === 'video') $('.download-icon').click(function() { attachUpgradePopup('a video', 'body'); });
			if (postType === 'album') $('.download-icon').click(function() { attachUpgradePopup('an album', 'body'); });
		}
		else { // type (video or album) && is pro user
			attachClickForProVidAllbumProfilePage();
		}
	}
};

function downloadVideo(downloadBtnElem) {
	var video = downloadBtnElem.parent().find('video')[0];
	var videoSource = video.src;
	var caption = $('._2dDPU .C4VMK span')[0] ? $('._2dDPU .C4VMK span')[0].textContent : '(no caption)';
	var location = $('._2dDPU .O4GlU')[0] ? $('._2dDPU .O4GlU')[0].textContent : '(no location)';
	var videoName = `CAPTION ${caption} LOCATION ${location}`.replace(/[*."/\[\]:;|=,<>\n]/g, '');
  	chrome.runtime.sendMessage({
		url: videoSource,
		filename: "Instagram Downloads/" + videoName + '.mp4'
  	});
};

function downloadAlbum(downloadBtnElem) {
	var photosArray = downloadBtnElem.parent().find('img.FFVAD');
	var videosArray = downloadBtnElem.parent().find('video.tWeCl');
	console.log('PHO', photosArray)  // have to change the above two 'finds' to 'each' to get each photo and video element
	var mediaArray = photosArray.concat(videosArray);
	var downloadsArray = mediaArray.map((elem, i) => {
		return { downloadSource: elem.src, mediaName: `album_media_${i + 1}${elem.src.substr(elem.src.lastIndexOf(".")+1)}` };
	});
	var caption = $('._2dDPU .C4VMK span')[0] ? $('._2dDPU .C4VMK span')[0].textContent : '(no caption)';
	var location = $('._2dDPU .O4GlU')[0] ? $('._2dDPU .O4GlU')[0].textContent : '(no location)';
	var folderName = `CAPTION ${caption} LOCATION ${location}`.replace(/[*."/\[\]:;|=,<>\n]/g, '');
	downloadsArray.forEach((elem, i) => {
	  setTimeout(function() {
		  	chrome.runtime.sendMessage({
				url: elem.downloadSource,
				filename: `Instagram Downloads/${folderName}/${elem.mediaName}`
		  	});
	  }, (i + 1) * 1000)
	});
	
};

function attachClickForProVidAllbumProfilePage() {
	$('.download-icon').click(function() {
		var elem = $(this);
		var aElem = elem.parent().find('a[href$="?taken-by=earthpix"]')[0];
		aElem.click();
	});
}

function singlePostGetPostType(elem) {
	var postType = 'photo';
	var videoElemArray = elem.find('.videoSpritePlayButton');
	var albumElemArray = elem.find('.coreSpriteRightChevron, .coreSpriteLeftChevron');
	if (videoElemArray.length) postType = 'video';
	if (albumElemArray.length) postType = 'album';
	return postType;
};

function profilePageGetPostType(elem) {
	var postType = 'photo';
	var videoElemArray = elem.find('span.coreSpriteVideoIconLarge');
	var albumElemArray = elem.find('.coreSpriteSidecarIconLarge');
	if (videoElemArray.length) postType = 'video';
	if (albumElemArray.length) postType = 'album';
	console.log("POST TYPE: ", postType);
	return postType;
};

$('body').on('click', '.popup-close', function () {
    console.log('Click detected; modal will be displayed');
    $(".upgrade-popup-container").remove();
});


runCEContentScript();
ceCheckLocation();


