// ==UserScript==
// @name           ConfirmExpandCollapse
// @description    When you doubleclick on the title of your outline this script asks you: "Do you really want to expand or collapse ALL items?"
// @author         LukeMT
// @include        http*://*workflowy.com/*
// @version        1.0
// ==/UserScript==
(function (String, $){
    
    var originalFn = $.fn.expandOrCollapseAllDescendantsOfProjectToggle;
    $.fn.expandOrCollapseAllDescendantsOfProjectToggle = function() {
        if(confirm("Do you really want to expand or collapse ALL items?")){
            originalFn.apply(this, arguments);
        }
    };
    
})(String, $);
