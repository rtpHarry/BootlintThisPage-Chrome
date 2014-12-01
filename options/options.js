/*
    BootlintThisPage-Chrome v1.2
    Copyright (C) 2014 Matthew Harris aka rtpHarry

    Adds a Bootlint This Page button which will execute the bootlint.js against the current page.
    If errors are found then bootlint.js will generate a javascript alert and the errors will be
    displayed in the JavaScript console window (press f12 and click the console tab)

    http://articles.runtings.co.uk/p/bootlint-this-page-chrome.html

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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