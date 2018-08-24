$(document).ready(function(){
	//** Date **//
	var thisYear = new Date().getFullYear();
	$("#year").html(thisYear);
	

	var sourceLink = "";
	var portfolioURL = "";
	var overlayContent = "";
	
	//** Slideshow **//
	var numSlides = 0;
	var slideIndex = "";
	var slideWidth = 0;
	var slideshowPosition = 0;
	var resizeSlides = function(){
		slideWidth = $("#overlay .slideshow").width();
		$("#overlay .slideshow .slide").width(slideWidth);
		setSlideshowDimensions();
	}
	var setSlideshowDimensions = function(){
		numSlides = $("#overlay .slideshow .slide").length;
		$("#overlay .slideshowContent").width(numSlides*slideWidth);
	}
	var createSlideshowControls = function(){
		if(numSlides > 1){
			for($i = 0; $i < numSlides; $i++){
				if($i == 0){
					$("#overlay .slideshowControls").append("<a href='#' class='slideControl active' data-slide='" + $i + "'>Slide " + 1 + "</a>");
				} else {
					$("#overlay .slideshowControls").append("<a href='#' class='slideControl' data-slide='" + $i + "'>Slide " + eval($i+1) + "</a>");
				}
			}
		}
	}
	var removeSlideshowControls = function(){
		$("#overlay .slideshowControls").html("");
	}
	
	var selectSlide = function(element){ //Get proper index for any selected slide
		slideIndex = $(element).attr("data-slide");
		switchSlide(slideIndex);
	}
	
	//** Switch Slides**//
	var switchSlide = function(slideIndex){ //Switch to specified slide
		slideshowPosition = eval(0 - $("#overlay .slide:eq(" + slideIndex + ")").position().left);
		$("#overlay .slideshowContent").css("left", slideshowPosition);
		$("#overlay .slideControl").each(function(){
			$(this).removeClass("active");
		});
		$("#overlay .slideControl:eq(" + slideIndex + ")").addClass("active");

	}
	
	var nextSlide = function(index){ //Return to beginning of slideshow if at the end
		if(index < numSlides){
			console.log('not last slide');
			switchSlide(index);
		} else {
			console.log('last slide');
			switchSlide(0);
		}
	}
	
	$(window).on('resize', function(){ //Ensure dimensions are updated if window is resized
		resizeSlides();
	});
	
	$("#overlay").on('click', '.slideControl', function(e){ //Navigate between slides by clicking on slide controls
		selectSlide($(this));
		return false;
	});
	
	$("#overlay").on('click', '.slide', function(){ //Navigate between slides by clicking on the slide itself
		slideIndex = $(this).index();
		nextSlide(slideIndex + 1);
	});
	
	$(".slide").on('swipleft', function(){
		switchSlide(slideIndex - 1);
	});
	
	$(".slide").on('swiperight', function(){
		switchSlide(slideIndex + 1);
	});
	
	//********** Overlay **********//
	var numItems = $("#portfolio .sectionContent").find(".portfolioItem").length;
	var nextItem = "";
	var prevItem = "";

	var generateOverlayControls = function(){
		$("#overlayControls").html(""); //Clear out old 
		if($(sourceLink).prev().length){
			$("#overlayControls").append("<a href='#' id='prevItem'>Previous Item</a>");
		}
		if($(sourceLink).next().length){
			$("#overlayControls").append("<a href='#' id='nextItem'>Next Item</a>");
		}
	}
	
	//** Navigate Overlay **//
	$("#overlayControls").on('click', 'a', function(){
		if($(this).attr("id") == "nextItem"){
			portfolioURL = $(sourceLink).next().attr("href");
			sourceLink = $(sourceLink).next();
		} else {
			portfolioURL = $(sourceLink).prev().attr("href");
			sourceLink = $(sourceLink).prev();
		}
		
		closeOverlay();
		openOverlay(portfolioURL);
		return false;
	});

	//** Close Overlay **//
	var closeOverlay = function(){
		removeSlideshowControls() //Remove controls which are generated dynamically for each slideshow
		overlayContent = $("#overlay .portfolioItem-details").detach(); //Remove content from overlay
		$("#overlay").attr('aria-hidden', true).hide(); //Hide overlay also from screen readers
		$("header, main, footer").attr('aria-hidden', false); //Make available to screen readers again
		$(sourceLink).focus(); //Return focus back to the element that spawned the overlay
		$("body").removeClass("hasOverlay");
	}

/*
	//Original version before AJAX call
	var openOverlay = function(){
		overlayContent = sourceLink.children(".portfolioItem-details").detach();
		console.log('overlayContent', overlayContent);
		$("#overlay").css("display", "grid").attr('aria-hidden', false).append(overlayContent);
		$("header, main, footer").attr('aria-hidden', true);
		$(".closeButton").focus();
		$("body").addClass("hasOverlay");
		generateOverlayControls();
		
		setSlideshowDimensions();
		resizeSlides();
		createSlideshowControls();
	}
*/
	
	$("#overlay").on('click', '.closeButton', function(){
		closeOverlay();
		return false;
	});
	
	$("#overlay").on('click', function(e){
		if (e.target !== this) {
			return;
		} else {
			closeOverlay();
		}
	});
	
	//** Open Overlay **//
/*
	//Original version before AJAX call
	$(".portfolioItem .portfolioLink").on('click', function(){
		sourceLink = $(this).parent();
		openOverlay();
		
		return false;
	});
*/

	$(".portfolioLink").on('click', function(){
		sourceLink = $(this);
		portfolioURL = $(this).attr("href");
		openOverlay(portfolioURL);
		return false;
	});

	var openOverlay = function(link){
		$.get(link, function(data) {
			overlayContent = $(data).find('article');
			$("#overlay").append(overlayContent).css("display", "grid").attr("aria-hidden", false);
			$("header, main, footer").attr('aria-hidden', true);
			$(".closeButton").focus();
			$("body").addClass("hasOverlay");
			generateOverlayControls();
			
			setSlideshowDimensions();
			resizeSlides();
			createSlideshowControls();
		});
	}
});