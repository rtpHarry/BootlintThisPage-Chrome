function saveOptions() {
    var enableAnalytics = $('#enableAnalytics-0').is(':checked');

    chrome.storage.sync.set({
        enableAnalytics: enableAnalytics
    }, function () {
        if (chrome.runtime.lastError != undefined) {
            $("#statusSuccess").hide();
            $("#statusFail").hide().fadeIn();
        } else {
            $("#statusFail").hide();
            $("#statusSuccess").hide().fadeIn();
        }
    });
}

function restoreOptions() {
    // Use default values if settings not set
    chrome.storage.sync.get({
        enableAnalytics: true
    }, function (items) {
        $("#loadingPane").hide();
        $("#optionsPane").fadeIn();
        var enableAnalytics = chrome.runtime.lastError != undefined ? false : items.enableAnalytics;
        $('#enableAnalytics-0').prop('checked', enableAnalytics);
    });
}

$(document).ready(function () {
    restoreOptions();
});

document.getElementById('save').addEventListener('click', saveOptions);