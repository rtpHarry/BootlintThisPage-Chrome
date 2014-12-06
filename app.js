var BootLintThisPageWrapApp = BootLintThisPageWrapApp || (function(){
	var app = angular.module("errorPanel", []);
	
	app.controller("ErrorItemController", function () {
		this.lintsForCurrentDocument = function() {		
			var lints = [];
			var reporter = function (lint) {
				//lint.type = lint 
				
				lints.push(lint);
			};
			bootlint.lintCurrentDocument(reporter, []);
			return lints;
		}
		
		this.rescan = function () {
			this.lints = this.lintsForCurrentDocument();
			alert("redone");
		}
		
		this.lints = this.lintsForCurrentDocument();
	});
})();
