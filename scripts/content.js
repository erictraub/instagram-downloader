function runCEContentScript() {

	console.log('Content Script Ran.');
	var downloadCount = 0;


	$("article").on("mouseenter", ".v1Nh3", function(event) {
	    var elem = $(this);
	    elem.append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');
		$('.dwnldCount' + downloadCount).click(function() {
		  	let elem = $(this);
		  	let aSibling = elem.siblings('a');
			console.log('SIB', aSibling)
		  	let img = aSibling.find('img')[0];
		  	// let downloadSource = img.srcset.split(',')[4].slice(0, -5);
		  	let downloadSource = img.src;
		  	let imgAltData = img.alt;
		  	let imgName = 'CAPTION= ' + imgAltData.replace(/[*."/\[\]:;|=,<>\n]/g, '');;
		  	chrome.runtime.sendMessage({
				url: downloadSource,
				filename: "Instagram Downloads/" + imgName + '.jpg'
		  	});
		});
	});


	$("article").on("mouseleave", ".v1Nh3", function(event) {
	    var elem = $(this);
	    $('.download-icon').remove();
	    downloadCount++;
	});

	// $(".v1Nh3").append('<i class="download-icon fa fa-2x fa-arrow-circle-o-down dwnldCount' + downloadCount + '"></i>');

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


runCEContentScript();
ceCheckLocation();


