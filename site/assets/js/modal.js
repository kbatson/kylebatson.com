var createModal = function(){
    var overlay = $("<div id='overlay'><div id='overlayContents'></div></div>");
    var closeButton = $("<button id='closeModal'><span>Close</span></button>");
    $(overlay).appendTo("body");
    attachSlideshow();

    $(closeButton).appendTo(overlay);
    $("body").addClass("modalOpen");
}

var closeModal = function(){
    $(overlay).remove();
    $("body").removeClass("modalOpen");
    // $('.slideshow').each(function(i){
    //     //slideIndex[i] = 0;
    //     resizeSlides();
    // });
}

var attachImage = function(){
    $(".activeSlide").contents().clone().appendTo("#overlayContents figure");
}

var attachSlideshow = function(){
    $(".slideshow").clone().appendTo("#overlayContents");
    $("#overlayContents .slideshow").attr("data-index", 1);
    activeSlide[1] = activeSlide[0];
    initializeSlideshow(true); //Pass value only if a new slideshow is being added
    resizeSlides();
}

$(document).ready(function(){
	$("#enlarge").on('click', function(){
        createModal();
        // attachImage();
        // attachSlideshow();
        return false;
    });

    $("body").on('click', '#closeModal', function(){
        closeModal();
        return false;
    });

    // $("body.modalOpen").on({
    //     'mousewheel': function(e) {
    //         if (e.target.id == 'el') return;
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // });
});