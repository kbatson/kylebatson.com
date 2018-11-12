//** Slideshow **//
var numSlides = [];
var slideshowWidth = [];
var activeSlide = [];
function initializeSlideshow(additional){
	$(".slideshow").each(function(i){
		$(this).attr("data-index", i);

		numSlides[i] = $(this).find('.slide').length;
		if(!additional){ //Upon initial creation, set to 0, otherwise use set value in modal.js
			activeSlide[i] = 0;
		}
	});
}

// function generateControls(){
// 	$(".slideshow").each(function(i){
// 		if(numSlides[i] > 1){
// 			for(var j = 0; j < numSlides[i]; j++){
// 				if(j == 0){
// 					$(this).find(".slideshowControls").append("<a href='#' class='slideControl active' data-slide='" + j + "'>Slide " + 1 + "</a>");
// 				} else {
// 					$(this).find(".slideshowControls").append("<a href='#' class='slideControl' data-slide='" + j + "'>Slide " + eval(j+1) + "</a>");
// 				}
// 			}
// 		}	
// 	})
// }

function generateControls(){
	$(".slideshow").each(function(){
		var controls = $(this).find(".slideshowControls");
		$(this).find(".slide").each(function(j){
			var caption = $(this).find("figcaption").text();
			var image = $(this).find("img").clone();
			$(controls).append("<a href='#' class='slideControl' data-slide='" + j + "' title='" + caption + "'>Slide " + eval(j+1) + "</a>");
			// $(controls).append("<a href='#' class='slideControl' data-slide='" + j + "' title='" + caption + "'></a>");
			// $(controls).find("a:eq(" + j + ")").append(image);
		});
	})
}

function resizeSlides(){
	$(".slideshow").each(function(i){
		$(this).find(".slideshowContent").width($(this).width() * numSlides[i]);
		$(this).find(".slide").width($(this).width());
		switchSlides(i, activeSlide[i], false);
	});
}

function slideshowIndex(slideshow){
	return $(slideshow).parents(".slideshow").attr("data-index");
}

//Navigate to slide and update navigation
function switchSlides(slideshow, slide, animate){
	var slideshowPosition = $(".slideshow:eq(" + slideshow + ")").find(".slide:eq(" + activeSlide[slideshow] + ")").position().left;
	if(animate == true){
		$(".slideshow:eq(" + slideshow + ")").find(".slideshowContent").css("transition", "left .5s ease-in").css("left", 0 - slideshowPosition);
	} else { //Used when resizing to not show weird resizing artifacts
		$(".slideshow:eq(" + slideshow + ")").find(".slideshowContent").css("transition", "none").css("left", 0 - slideshowPosition);
	}
	$(".slideshow:eq(" + slideshow + ") .slideControl").removeClass("active");
	$(".slideshow:eq(" + slideshow + ") .slideControl:eq(" + activeSlide[slideshow] + ")").addClass("active");
}

//Pick a slide with nav/prev controls
function slideDirection(slideshow, direction){
	if(direction == "next" && activeSlide[slideshow] < (numSlides[slideshow] - 1)){
		activeSlide[slideshow] = activeSlide[slideshow] + 1;
	} else if(direction == "prev" && activeSlide[slideshow] > (0 - numSlides[slideshow] + 1)){
		activeSlide[slideshow] = activeSlide[slideshow] - 1;
	} else {
		activeSlide[slideshow] = 0;
	}
	switchSlides(slideshow, activeSlide[slideshow], true);
}

$(document).ready(function(){
	initializeSlideshow();
	generateControls();
	resizeSlides();

	$("body").on("click", ".slide", function(){
		slideDirection(slideshowIndex(this), "next");
	});

	$("body").on("click", ".nextSlide, .previousSlide", function(){
		if($(this).hasClass("nextSlide")){
			slideDirection(slideshowIndex(this), "next");
		} else {
			slideDirection(slideshowIndex(this), "prev");
		}
		return false;
	});

	$("body").on("click", ".slideControl", function(){
		activeSlide[slideshowIndex(this)] = parseInt($(this).attr("data-slide"));
		switchSlides(slideshowIndex(this), activeSlide[slideshowIndex(this)], true);
		return false;
	});

	$(window).on('resize', function(){ //Ensure dimensions are updated if window is resized
		resizeSlides();
	});

	$(".slide").swipe({
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        	console.log("You swiped " + direction );
        	if(direction == "left"){
        		slideDirection(slideshowIndex(this), "next");
        	} else if(direction == "right") {
        		slideDirection(slideshowIndex(this), "prev");
        	}
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:75
    });
});