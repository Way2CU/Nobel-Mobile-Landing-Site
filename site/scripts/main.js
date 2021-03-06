/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();


	var open_link = $('a.form_link');
	var form_dialog = $('section.contact');
	var btn_close = $('section.contact a.close');
	// Function for displaying form
	open_link.on('click',function(){
		form_dialog.addClass('visible');
	});

	// Function for closing form dialog
	btn_close.on('click',function(){
		form_dialog.removeClass('visible');
	});

	var url = window.location.origin + "/thankyou";

	 //function for showing thank you page after for submission
	$('form').on('dialog-show', function() {
		$('form').hide();
		$('div.send').hide();
		window.open(url,"_self");
		return false;
	});
};


// connect document `load` event with handler function
$(Site.on_load);
