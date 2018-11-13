var createModal = function(){
    var overlay = $("<div id='overlay'><div id='overlayContents'></div></div>");
    var closeButton = $("<button id='closeModal'><span>Close</span></button>");
    $(overlay).appendTo("body");
    $("#overlay").addClass("visible").attr("aria-hidden", false);
    attachSlideshow();

    $(overlay).find("figure:first-child").focus();
    $(closeButton).appendTo("#overlay");
    $("body").addClass("modalOpen");
    $("header, main, footer").attr("aria-hidden", true).find('a, input, textarea, button').attr("tabindex", "-1");
}

var closeModal = function(){
    $(overlay).remove();
    $("body").removeClass("modalOpen");
    $("#overlay").removeClass("visible").attr("aria-hidden", false);

    $("header, main, footer").attr("aria-hidden", false);
    $("header, main, footer").attr("aria-hidden", true).find('a, input, textarea, button').attr("tabindex", "0");
    $("#enlarge").focus();
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
        return false;
    });

    $("body").on('click', '#closeModal', function(){
        closeModal();
        return false;
    });

    $("body").on('click', '#overlay', function(e){
        if($(e.target).attr("id") == "overlay"){
            closeModal();
        }
    })

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            closeModal();
        }
    });

    // $("body.modalOpen").on({
    //     'mousewheel': function(e) {
    //         if (e.target.id == 'el') return;
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // });
});