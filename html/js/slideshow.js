//** Slideshow **//
var numSlides = 0;
var slideIndex = "";
var slideWidth = 0;
var slideshowPosition = 0;
var resizeSlides = function(){
	slideWidth = $(".slideshow").width();
	console.log('slideWidth', slideWidth);
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
	slideIndex = $(element).attr("data-slide");
	switchSlide(slideIndex);
}

//** Switch Slides**//
var switchSlide = function(slideIndex){ //Switch to specified slide
	slideshowPosition = eval(0 - $(".slide:eq(" + slideIndex + ")").position().left);
	$(".slideshowContent").css("left", slideshowPosition);
	$(".slideControl").each(function(){
		$(this).removeClass("active");
	});
	console.log('slideIndex', $(".slideControl:eq(" + slideIndex + ")").attr("data-slide"));
	$(".slideControl:eq(" + slideIndex + ")").addClass("active");

}

$(document).ready(function(){
	resizeSlides();
	createSlideshowControls();

	$(window).on('resize', function(){ //Ensure dimensions are updated if window is resized
		resizeSlides();
		//createSlideshowControls();
	});
	
	$("body").on('click', '.slideControl', function(e){ //Navigate between slides by clicking on slide controls
		console.log('click');
		selectSlide($(this));
		return false;
	});
	
	$("body").on('click', '.slide', function(){ //Navigate between slides by clicking on the slide itself
		if(slideIndex < (numSlides -1)){
			slideIndex = $(this).index() + 1;
		} else {
			console.log('last slide');
			slideIndex = 0;
		}
		switchSlide(slideIndex);
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