// ==UserScript==
// @name           WorkflowyStylableTags
// @description    Gives each tag it's own css style, so you can style them with Stylish. I use Blank Canvas to manage my userscripts in Chrome.
// @author         Nigel Thorne and LukeMT
// @include        http*://*workflowy.com/*
// @version        1.1
// ==/UserScript==

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

var customClasses = function(index, old){
	var classes = old.split(" ");
	var custom = [];
	for( i = 0; i < classes.length; i++){
		if(classes[i].endsWith("-proj")){ custom.push(classes[i]);};
	};
	return custom.join(" ");
}

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
