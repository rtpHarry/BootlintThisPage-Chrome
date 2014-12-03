(function(){
	var app = angular.module("errorPanel", []);
	
	app.controller("ErrorItemController", function () {
		this.lintsForCurrentDocument = function() {		
			var lints = [];
			var reporter = function (lint) {
				lints.push(lint);
			};
			bootlint.lintCurrentDocument(reporter, []);
			debugger;
			return lints;
		}
		
		this.lints = this.lintsForCurrentDocument();
	});
})();
