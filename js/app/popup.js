
myApp.service('bootlintService', function() {
    this.getInfo = function(callback) {
        var model = {};

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs.length > 0)
            {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'GetHtmlToLint' }, function (htmlDocument) {
                    // bootlint here
					model.lints = [];
					var reporter = function (lint) {
						lints.push(lint);
					};
					bootlint.lintHtml(htmlDocument, reporter, []);
                    callback(model);
                });
            }
        });
    };
});

myApp.controller("PopupController", function ($scope, bootlintService) {
    bootlintService.getInfo(function (info) {
        $scope.lints = info;
        
        $scope.$apply();
    });
});