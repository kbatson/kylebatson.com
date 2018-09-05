//** Slideshow **//
var numSlides = 0;
var slideIndex = "";
var slideWidth = 0;
var slideshowPosition = 0;
var resizeSlides = function(){
	slideWidth = $(".slideshow").width();
	$(".slideshow").width(slideWidth);
	$(".slideshow .slide").width(slideWidth);
	setSlideshowDimensions();
}
var setSlideshowDimensions = function(){
	numSlides = $(".slideshow .slide").length;
	$(".slideshowContent").width(numSlides*slideWidth);
}
var createSlideshowControls = function(){
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
	$(".slideControl:eq(" + slideIndex + ")").addClass("active");

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



$(document).ready(function(){
	$(window).on('resize', function(){ //Ensure dimensions are updated if window is resized
		resizeSlides();
	});
	
	$("body").on('click', '.slideControl', function(e){ //Navigate between slides by clicking on slide controls
		console.log('click');
		selectSlide($(this));
		return false;
	});
	
	$("body").on('click', '.slide', function(){ //Navigate between slides by clicking on the slide itself
		slideIndex = $(this).index();
		nextSlide(slideIndex + 1);
	});
});