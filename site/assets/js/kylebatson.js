$(document).ready(function(){
	
	var scrollOffset = 0;
	var scrollColor = "";
	
	$(window).scroll(function(){
		scrollOffset = $(window).scrollTop();
		if(scrollOffset > 50){
			$("body").addClass("fixedHeader");
		} else {
			$("body").removeClass("fixedHeader");
		}
		// scrollColor = getColorForPercentage(scrollOffset);
		// $("#scrollPosition").html(scrollOffset).css("background-color", scrollColor);
		
		// var colorTransition = function(link){
		// 	scrollOffset = ($(link).offset().top - $(window).scrollTop()) / $(window).height();
		// 	inverseScrollOffset = 1 - scrollOffset;
		// 	scrollColor = getColorForPercentage(scrollOffset);
		// 	inverseScrollColor = getColorForPercentage(inverseScrollOffset);
			
		// 	if($(link).attr('id') == "resumeDownload"){
		// 		console.log('scrollOffset', scrollOffset, 'inverseScrollOffset', inverseScrollOffset);
		// 		$(link).css("background-color", scrollColor);
		// 	} else {
		// 		$(link).css("color", scrollColor);
		// 	}
		// }
	});

 //    var percentColors = [
 //    { pct: 0.0, color: { r: 0xf0, g: 0x95, b: 0x9a } },
 //    { pct: 1.0, color: { r: 0x11, g: 0x3f, b: 68 } } ];

	// var getColorForPercentage = function(pct) {
	//     for (var i = 1; i < percentColors.length - 1; i++) {
	//         if (pct < percentColors[i].pct) {
	//             break;
	//         }
	//     }
	//     var lower = percentColors[i - 1];
	//     var upper = percentColors[i];
	//     var range = upper.pct - lower.pct;
	//     var rangePct = (pct - lower.pct) / range;
	//     var pctLower = 1 - rangePct;
	//     var pctUpper = rangePct;
	//     var color = {
	//         r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
	//         g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
	//         b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	//     };
	//     return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
	//     // or output as hex if preferred
	// }
	
	//** Date **//
	var thisYear = new Date().getFullYear();
	$("#year").html(thisYear);
});