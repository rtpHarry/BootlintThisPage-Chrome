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

function bootlintThisPage() {
    if (enableAnalytics) {
        ga('send', 'event', 'bootlint', 'click');
    }

    chrome.tabs.executeScript(null, { file: 'lib/angular.min.js' });	
    chrome.tabs.executeScript(null, { file: 'lib/bootlint.js' });
    chrome.tabs.executeScript(null, { file: 'lib/jquery-2.1.1.min.js' });	
    chrome.tabs.executeScript(null, { file: 'lib/bootstrap.min.js' });	
    chrome.tabs.insertCSS(null, { file: 'lib/bootstrap.min.css' });
	chrome.tabs.insertCSS(null, { file: 'templates/panel.css' });
    chrome.tabs.executeScript(null, { file: 'app.js' });	
    chrome.tabs.executeScript(null, { file: 'runbootlint.js' });
}

var enableAnalytics;

chrome.storage.sync.get({
    enableAnalytics: true
}, function (items) {
    enableAnalytics = chrome.runtime.lastError != undefined ? false : items.enableAnalytics;

    if (enableAnalytics) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        // http://davidsimpson.me/2014/05/27/add-googles-universal-analytics-tracking-chrome-extension/
        ga('create', 'UA-55168364-1', 'auto');
        ga('set', 'checkProtocolTask', function () { });
        ga('require', 'displayfeatures');
    }

    chrome.browserAction.onClicked.addListener(bootlintThisPage);
});