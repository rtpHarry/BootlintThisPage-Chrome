chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == 'GetHtmlToLint') {
        sendResponse({ html: document.documentElement.outerHTML });
    }
});