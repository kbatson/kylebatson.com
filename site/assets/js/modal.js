var createModal = function(){
    var overlay = $("<div id='overlay'><div id='overlayContents'><figure></figure></div></div>");
    var closeButton = $("<button id='closeModal'><span>Close</span></button>");
    $(overlay).appendTo("body");
    $(closeButton).appendTo(overlay);
    $("body").addClass("modalOpen");
}

var closeModal = function(){
    $(overlay).remove();
    $("body").removeClass("modalOpen");
}

var attachImage = function(){
    $(".activeSlide").contents().clone().appendTo("#overlayContents figure");
}

$(document).ready(function(){
	$("#enlarge").on('click', function(){
        createModal();
        attachImage();
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