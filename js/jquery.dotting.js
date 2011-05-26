/* Author: Aaron Toth

*/

(function($){
  $.fn.dotting = function() {
    var deflist = this,
    	vals = this.children('dd'),
    	keys = this.children('dt'),
    	iterations = 0,
    	generateDots = function(width) {
    		var dotString = "";
    		var numberOfDots = width/9;
    		for (var i = 0; i < numberOfDots; i++) {
    			dotString += ".";
    		}
    		return dotString;
    	},
    	putThoseDots = function() {
    		var outerWidth = deflist.width();
    		if (jQuery.browser.webkit && !jQuery.browser.safari) {
    			outerWidth -= 10; // Weird bug with Chrome only
    		}
    		keys.each(function(i) {
    			if (iterations === 0) {
    				$(this).append('<span></span>');
    			}
    			$('span', this).text(generateDots(outerWidth));
	    		$(this).width(outerWidth - $(this).next().width() - 20);
    		});
    		iterations++;
    	};

    putThoseDots();

    // Do this fluidly!
    $(window).resize(function() {
    	putThoseDots();
	});

  };
})(jQuery);
