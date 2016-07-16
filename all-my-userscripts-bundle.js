// ==UserScript==
// @name           WorkflowyStylableTags
// @description    Gives each tag it's own css style, so you can style them with Stylish.
// @author         Nigel Thorne and LukeMT
// @include        http*://*workflowy.com/*
// @version        1.1
// ==/UserScript==
(function (String, $){
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    var customClasses = function(index, old){
        var classes = old.split(" ");
        var custom = [];
        for( i = 0; i < classes.length; i++){
            if(classes[i].endsWith("-proj")){ custom.push(classes[i]);}
        }
        return custom.join(" ");
    };

    var StylableTagsCounter = 1;
    setInterval(function(){
        StylableTagsCounter ++;
        if( StylableTagsCounter >= 3){
            $('.project').removeClass(customClasses);
            $('.pageContainer').removeClass(customClasses);
            StylableTagsCounter = 0;
        }
        $('span > .contentTagText').map( function(){
            var x = $(this).text();
            $(this).parent('.contentTag').parent().parent().parent().addClass(x+"-proj");}
                                       );
    },1000);

    var originalFn = $.fn.expandOrCollapseAllDescendantsOfProjectToggle;
    $.fn.expandOrCollapseAllDescendantsOfProjectToggle = function() {
        if(confirm("Do you really want to expand or collapse ALL items?")){
            originalFn.apply(this, arguments);
        }
    };
    
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
