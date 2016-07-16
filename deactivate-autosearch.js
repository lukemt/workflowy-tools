// ==UserScript==
// @name           DeactivateAutosearch
// @description    Deactivates search-as-you-type: Only shows search results when you hit enter. This gives you a little performance-boost.
// @author         LukeMT
// @include        http*://*workflowy.com/*
// @version        1.0
// ==/UserScript==
(function (String, $){
    
    function deactivateAutosearch (){
        setTimeout(function (){
            var jData = $("#searchBox").data("events");
            if(jData && jData.keydown && jData.keydown.length >= 2){
                jData.keydown.shift();
                $("#searchBox").bind("keydown", function (){
                    setTimeout(function() {
                        tagging.getTagAutocompleter().updateDisplay( $("#searchBox") );
                    }, 1);
                });
            }else{
                deactivateAutosearch();
            }
        }, 500);
    }
    deactivateAutosearch();
    
})(String, $);
