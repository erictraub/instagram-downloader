chrome.runtime.onMessage.addListener(function(message, sender) {
    console.log('MESSAGE: ', message);

    chrome.downloads.download(message);
});