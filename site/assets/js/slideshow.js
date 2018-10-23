//** Slideshow **//
var numSlides = 0;
var slideIndex = 0;
var slideWidth = 0;
var slideshowPosition = 0;
var resizeSlides = function(){
	slideWidth = $(".slideshow").width();
	//$(".slideshow").width(slideWidth);
	$(".slideshow .slide").width(slideWidth);
	setSlideshowDimensions();
	switchSlide(slideIndex);
}
var setSlideshowDimensions = function(){
	numSlides = $(".slideshow .slide").length;
	$(".slideshowContent").width(numSlides*slideWidth);
}
var createSlideshowControls = function(){
	console.log('createcontrols');
	$(".slideshowControls").html("");
	if(numSlides > 1){
		for($i = 0; $i < numSlides; $i++){
			if($i == 0){
				$(".slideshowControls").append("<a href='#' class='slideControl active' data-slide='" + $i + "'>Slide " + 1 + "</a>");
			} else {
				$(".slideshowControls").append("<a href='#' class='slideControl' data-slide='" + $i + "'>Slide " + eval($i+1) + "</a>");
			}
		}
	}
}
var removeSlideshowControls = function(){
	$(".slideshowControls").html("");
}

var selectSlide = function(element){ //Get proper index for any selected slide
	slideIndex = parseInt($(element).attr("data-slide"));
	switchSlide(slideIndex);
}

//** Switch Slides**//
var switchSlide = function(slideIndex){ //Switch to specified slide
	console.log('slideIndex', slideIndex, 'numSlides', numSlides);
	if(slideIndex == numSlides){
		console.log('in condition?')
		slideIndex = 0;
		console.log('after set to 0', slideIndex);
	}
	slideshowPosition = eval(0 - $(".slide:eq(" + slideIndex + ")").position().left);
	
	$(".slide").removeClass("activeSlide");
	$(".slide:eq(" + slideIndex + ")").addClass("activeSlide");
	
	$(".slideshowContent").css("left", slideshowPosition);
	$(".slideControl").each(function(){
		$(this).removeClass("active");
	});
	$(".slideControl:eq(" + slideIndex + ")").addClass("active");
	console.log('checking slideIndex before return', slideIndex);
}

$(document).ready(function(){
	resizeSlides();
	createSlideshowControls();

	$(window).on('resize', function(){ //Ensure dimensions are updated if window is resized
		resizeSlides();
		//createSlideshowControls();
	});
	
	$("body").on('click', '.slideControl', function(e){ //Navigate between slides by clicking on slide controls
		selectSlide($(this));
		return false;
	});
	
	$("body").on('click', '.slide', function(){ //Navigate between slides by clicking on the slide itself
		slideIndex = $(this).index() +1;
		switchSlide(slideIndex);
		return false;
	});

	$("body").on('click', '.nextSlide', function(){
		slideIndex = $(".activeSlide").index() +1;
		switchSlide(slideIndex);
		return false;
	});

	$("body").on('click', '.previousSlide', function(){
		slideIndex = $(".activeSlide").index() -1;
		switchSlide(slideIndex);
		return false;
	});

	$(".slide").swipe({
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        	console.log("You swiped " + direction );
        	if(direction == "left"){
        		slideIndex = slideIndex + 1;
        	} else if(direction == "right") {
        		slideIndex = slideIndex - 1;
        	}
        	switchSlide(slideIndex);
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:75
    });
});