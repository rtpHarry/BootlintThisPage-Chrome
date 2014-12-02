/*
    BootlintThisPage-Chrome v1.3
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

(function(){
  function getNumberFromPx(cssString) {
    return parseFloat(cssString.replace("px", ""));
  };  
    
  function setupPanelHeight() {
    var $footerPanel = $("#footer-panel");
    $footerPanel.find(".panel-body").css("max-height", function() {
      var panelHeight = getNumberFromPx($footerPanel.css("max-height")),
          panelHeadingHeight = getNumberFromPx($footerPanel.find(".panel-heading").css("height"));
      return panelHeight - panelHeadingHeight;
    });
  }
  
  function wireUpCloseButton() {
  	/*  $('#footer-panel').collapse({
		  toggle: false
		});
	  /*
  	  $('#footer-panel-heading .close').click(function(e) {
		  $("#footer-panel").collapse('hide');
		  e.preventDefault();
	  });*/
  }
  
  function lintsForCurrentDocument() {
    var lints = [];
    var reporter = function (lint) {
        lints.push(lint);
    };
    bootlint.lintCurrentDocument(reporter, []);
    return lints;
  }

  $.get(chrome.extension.getURL("templates/panel.html"), function(data) {
  	  var lints = lintsForCurrentDocument();
	  debugger;
	  //console.table(lints);
	  $('#footer-panel').remove();
	  $("body").append(data);
      setupPanelHeight();
	  wireUpCloseButton();
  });
})();