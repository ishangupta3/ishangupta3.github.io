/*-----------------------------------------------------------------------------------*/
/*	Custom Footer JS
/*-----------------------------------------------------------------------------------*/

jQuery.fn.topLink = function(settings) {
	settings = jQuery.extend({
		min: 1,
		fadeSpeed: 200,
		ieOffset: 50
	}, settings);
	return this.each(function() {
		//listen for scroll
		var el = jQuery(this);
		el.css('display','none'); //in case the user forgot
		jQuery(window).scroll(function() {
			if(!jQuery.support.hrefNormalized) {
				el.css({
					'position': 'absolute',
					'top': jQuery(window).scrollTop() + jQuery(window).height() - settings.ieOffset
				});
			}
			if(jQuery(window).scrollTop() >= settings.min)
			{
				el.fadeIn(settings.fadeSpeed);
			}
			else
			{
				el.fadeOut(settings.fadeSpeed);
			}
		});
	});
};

(function($) {
	"use strict";
	
	// Capture page elements
	var $pageContent = $('.main-content');
	var $portfolioContainer = $('#isotope-trigger');
	var $filterCategories = $('.filter-category');
	var $dropdownContainer = $('.dropdown-container');
	var $dropdownContent = $('.dropdown-content');
	var $mobileMenu = $('.mobile-menu');
	var $mobileSearchForm = $('.header-buttons #main-search-form'); 
	var isIE9 = $('html').hasClass('ie9');	
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Isotope
	/*-----------------------------------------------------------------------------------*/
	
	/* Display the filter categories, or hide them */
	$('.filter-button').click(function(e) {	
		e.preventDefault();	 
		$(this).toggleClass('filter-active');
		
		if(Modernizr.csstransitions) { 
			if (!$filterCategories.first().hasClass('stop')) { // Continue if the filter categories don't have a class "stop"
				$filterCategories.show();
	        	$filterCategories.stop().transition({ opacity: 1, y: '0px' }, 300).addClass('stop'); // Show the categories and add the class "stop"
			} else { 
		        $filterCategories.transition({ opacity: 0, y: '50%' }, 300, function () { $(this).hide(); }).removeClass('stop'); // Hide the categories and remove "stop"
			}
		}
		else {
			if($(this).hasClass('filter-active')) {
				// Show	
				$filterCategories.show();
				$filterCategories.stop().animate({ opacity: 1 }, 300);	
			}
			else {
				// Hide
				$filterCategories.stop().animate({ opacity: 0 }, 300, function () { $(this).hide(); });
			}
		}
	});
	
	/* filter items with an isotope filter animation, when one of the filter links is clicked */
	if($('body').hasClass('single-portfolio') || $('body').hasClass('page-template-template-portfolio-php')) {
		$('.portfolio-filter a').click(function(e) {	
			e.preventDefault();
			
			var selector = $(this).attr('data-filter');
		 	$portfolioContainer.isotope({ filter: selector });
			  	
		});
	}
	
	/* Reset the active class on all the buttons and assign it to the currently active category */
	$('.portfolio-filter .filter-category a').click(function() { 				
		$('.portfolio-filter li').removeClass('active'); 
		$(this).parent().addClass('active'); 
	});
	
	/* Initialize Isotope */ 
	$portfolioContainer.imagesLoaded(function() {
		
		/* Get the widths of isotope thumbnails, depending on the current screen size */	
		function getThumbWidth() {
			var windowWidth = $(window).width();
			
			if(windowWidth <= 400) {
				return Math.floor($portfolioContainer.width());
			}
			else if(windowWidth <= 855) {
				return Math.floor($portfolioContainer.width() / 2);
			}
			else if(windowWidth <= 1280) {
				return Math.floor($portfolioContainer.width() / 3);
			}
			else if(windowWidth <= 1480) {
				return Math.floor($portfolioContainer.width() / 4);
			}
			else if(windowWidth <= 1880) {
				return Math.floor($portfolioContainer.width() / 5);
			}
			else if(windowWidth <= 2280) {
				return Math.floor($portfolioContainer.width() / 6);
			}
			else if(windowWidth <= 2680) {
				return Math.floor($portfolioContainer.width() / 7);
			}
			else if(windowWidth <= 3080) {
				return Math.floor($portfolioContainer.width() / 8);
			}
		}
				
		function setThumbWidth() {
			var thumbWidth = getThumbWidth();
			$portfolioContainer.children().css({ width: thumbWidth });
		}
		setThumbWidth();
		
		$portfolioContainer.isotope({
			layoutMode: 'masonry',
			masonry: {
            	columnWidth: getThumbWidth()
            }
        });
        
        $(window).smartresize(function() {
        	setThumbWidth();
        	 
			$portfolioContainer.isotope({
            	masonry: {
                	columnWidth: getThumbWidth()
				}
			});
        });
    });
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Superfish Drop-Down Menu
	/*-----------------------------------------------------------------------------------*/
	
	if ( jQuery().superfish ) {
		
		$('.menu-container ul').superfish({
			delay: 700,
			animation: { opacity: 'show', height: 'show' },
			speed: 250,
			speedOut: 150,
			autoArrows: false,
			dropShadows: false
		}); 
		
	}
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Drop-down Page
	/*-----------------------------------------------------------------------------------*/
		
	var $dropDownWrapper = $( '#dropdown-wrapper' );
	
	if ( $dropDownWrapper.length ) { 
			
		$('#dropdown-trigger').click(function() {
			
			var pageHeight = $('.dropdown-page').outerHeight(true); // Get the height, while including the top and bottom padding of the drop-down page
			var wrapperHeight = $dropDownWrapper.height();	
				
			// Animate the height of the wrapper, depending on the current state (visible or not)			
			if( wrapperHeight == 0 ) {
				$('.drop-down-arrows').addClass('arrow-up');
				
				if(Modernizr.csstransitions) {
					$dropDownWrapper.transition({ height: pageHeight }, 500, 'easeOutCubic', function() {
						$(this).css('height', 'auto');
					});	
				}
				else {
					$dropDownWrapper.animate({ height: pageHeight }, 500, 'easeOutCubic', function() {
						$(this).css('height', 'auto');	
					});	
				}
			}
			else {
				$('.drop-down-arrows').removeClass('arrow-up');
				
				if(Modernizr.csstransitions) {
					$dropDownWrapper.height($('.dropdown-page').outerHeight(true));
					$dropDownWrapper.transition({ height: 0 }, 500, 'easeOutCubic' );	
				}
				else {
					$dropDownWrapper.animate({ height: 0 }, 500, 'easeOutCubic' );	
				}
			}
			
			$( 'body, html' ).animate({ scrollTop: 0 }, 200, 'easeOutCubic' );
			
		});
		
	}
	

	/*-----------------------------------------------------------------------------------*/
	/*	Responsive Videos
	/*-----------------------------------------------------------------------------------*/
	
	$pageContent.fitVids(); 
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Scroll back to top
	/*-----------------------------------------------------------------------------------*/
	
	$('#back-to-top').topLink({
		min: 200,
		fadeSpeed: 500
	});
	
	//smoothscroll
	$('#back-to-top').click(function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 700, 'easeOutCubic');
	});
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Comment Form Placeholders for IE9
	/*-----------------------------------------------------------------------------------*/
	
	if (isIE9) {
		
		var authorPlaceholder = $('#commentform #author').attr('placeholder');
		var emailPlaceholder = $('#commentform #email').attr('placeholder');
		var urlPlaceholder = $('#commentform #url').attr('placeholder');
		var commentPlaceholder = $('#commentform #comment').attr('placeholder');		
				
		$('#commentform #author').val(authorPlaceholder);
		$('#commentform #email').val(emailPlaceholder);
		$('#commentform #url').val(urlPlaceholder);
		$('#commentform #comment').val(commentPlaceholder);
		
		$('#commentform input, #commentform textarea').focus(function() {
			if($(this).attr('id') == 'author') {
				if ($(this).val() == authorPlaceholder) { $(this).val(''); }
			}
			else if($(this).attr('id') == 'email') {
				if ($(this).val() == emailPlaceholder) { $(this).val(''); }
			}
			else if($(this).attr('id') == 'url') {
				if ($(this).val() == urlPlaceholder) { $(this).val(''); }
			}
			else if($(this).attr('id') == 'comment') {
				if ($(this).val() == commentPlaceholder) { $(this).val(''); }
			}
		});
		
		$('#commentform input, #commentform textarea').blur(function() {
			if($(this).attr('id') == 'author') {
				if ($(this).val() == '') { $(this).val(authorPlaceholder); }
			}		
			else if($(this).attr('id') == 'email') {
				if ($(this).val() == '') { $(this).val(emailPlaceholder); }
			}
			else if($(this).attr('id') == 'url') {
				if ($(this).val() == '') { $(this).val(urlPlaceholder); }
			}
			else if($(this).attr('id') == 'comment') {
				if ($(this).val() == '') { $(this).val(commentPlaceholder); }
			}
		});
	
	}
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	Contact Form 7 ajax loader image in the main content area
	/*-----------------------------------------------------------------------------------*/
		
	$(window).load(function() {
		var $ajaxLoaderImg = $('.main-container .wpcf7 .ajax-loader');
		
		if($ajaxLoaderImg.length) {		
			$ajaxLoaderImg.attr('src', footerJS.loaderurl);
		}
	});
	
})( jQuery );