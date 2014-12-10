chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	debugger;
	
    if (request.action == 'GetHtmlToLint') {
        sendResponse(document.all[0].outerHTML);
    }
});