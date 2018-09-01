$(document).ready(function(){
	//** Night Mode **//
	
	var scrollOffset = 0;
	var scrollColor = "";
	
	$("#nightToggle").on('click', function(){
		if($("body").hasClass("night")){
			$("body").removeClass("night");
		} else {
			$("body").addClass("night");
		}
	});
	
	$(window).scroll(function(){
		if($('body').hasClass('night')){
			scrollOffset = $(window).scrollTop() / ($('body').height() - $(window).height());
			scrollColor = getColorForPercentage(scrollOffset);
			$("#scrollPosition").html(scrollOffset).css("background-color", scrollColor);
		
			var colorTransition = function(link){
				scrollOffset = ($(link).offset().top - $(window).scrollTop()) / $(window).height();
				inverseScrollOffset = 1 - scrollOffset;
				scrollColor = getColorForPercentage(scrollOffset);
				inverseScrollColor = getColorForPercentage(inverseScrollOffset);
				
				if($(link).attr('id') == "resumeDownload"){
					console.log('scrollOffset', scrollOffset, 'inverseScrollOffset', inverseScrollOffset);
					$(link).css("background-color", scrollColor);
				} else {
					$(link).css("color", scrollColor);
				}
			}
			
			$('a').each(function(){
				colorTransition($(this));
			});
		}
	});

    var percentColors = [
    { pct: 0.0, color: { r: 0xf0, g: 0x95, b: 0x9a } },
    { pct: 1.0, color: { r: 0x11, g: 0x3f, b: 68 } } ];

	var getColorForPercentage = function(pct) {
	    for (var i = 1; i < percentColors.length - 1; i++) {
	        if (pct < percentColors[i].pct) {
	            break;
	        }
	    }
	    var lower = percentColors[i - 1];
	    var upper = percentColors[i];
	    var range = upper.pct - lower.pct;
	    var rangePct = (pct - lower.pct) / range;
	    var pctLower = 1 - rangePct;
	    var pctUpper = rangePct;
	    var color = {
	        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
	        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
	        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	    };
	    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
	    // or output as hex if preferred
	}
	
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
	
	//********** Overlay **********//
	var numItems = $("#portfolio .sectionContent").find(".portfolioItem").length;
	var nextItem = "";
	var prevItem = "";

	var generateOverlayControls = function(){
		$("#overlayControls").html(""); //Clear out old 
		if($(sourceLink).parent('li').prev().length){
			$("#overlayControls").append("<a href='#' id='prevItem'>Previous Item</a>");
		}
		if($(sourceLink).parent('li').next().length){
			$("#overlayControls").append("<a href='#' id='nextItem'>Next Item</a>");
		}
	}
	
	//** Navigate Overlay **//
	$("#overlayControls").on('click', 'a', function(){
		if($(this).attr("id") == "nextItem"){
			portfolioURL = $(sourceLink).parent('li').next().find('a').attr("href");
			sourceLink = $(sourceLink).parent().next().find('a');
		} else {
			portfolioURL = $(sourceLink).parent('li').prev().find('a').attr("href");
			sourceLink = $(sourceLink).parent().prev().find('a');
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

	$(".portfolioLink a").on('click', function(){
		sourceLink = $(this);
		portfolioURL = $(this).attr("href");
		openOverlay(portfolioURL);
		return false;
	});

	var openOverlay = function(link){
		$.get(link, function(data) {
			overlayContent = $(data).find('article');
			$("#overlay").append(overlayContent).css("display", "grid").attr("aria-hidden", false);
			$(".portfolioItem-details").attr("role", "dialog");
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