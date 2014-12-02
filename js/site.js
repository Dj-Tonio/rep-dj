$(document).ready(function() {
	$panel.init();
	$(document).keyup(function(e) {
		if (e.keyCode == 27 && $popup.easyclose) $popup.close();   // esc
	});
});

$panel = {
	displayed : false,
	init : function(){
		$("#show_panel").click($panel.toogle);
	},
	toogle : function (){
		if (!$panel.displayed){
			$panel.show();
			$panel.displayed = true;
		}
		else if ($panel.displayed){
			$panel.hide();
			$panel.displayed = false;
		}
	},
	show : function(){
		$("#panel").slideDown();
	},
	hide : function(){
		$("#panel").slideUp();
	}
};

$popup = {
	easyclose : true,
	displayed : false,
	width     : 400,
	height    : 400,
	open : function($content){
		if ($popup.displayed) return;
		$popup.displayed = true;
		$("body").append("<div id='pop_overlay' style='display:none'></div>");
		$("body").append("<div id='popup' style='display:none'></div>");
		$("#popup").append($content);
		$("#popup").css({
			"width"  : $popup.width + "px",
			"height" : $popup.height + "px",
			"left"   : (($(document).width()-$popup.width)/2) + "px"
		});
		if ($popup.easyclose) $("#pop_overlay").click($popup.close);
		$("#pop_overlay").fadeIn("slow");
		$("#popup").fadeIn("slow");
	},
	close : function(){
		if (!$popup.displayed) return;
		$popup.displayed = false;
		$("#pop_overlay").fadeOut().fadeOut("slow", function() {
			$("#pop_overlay").remove();
		});
		$("#popup").fadeOut("slow", function() {
			$("#popup").remove();
		});
	},
	reset : function(){
		$popup.easyclose = true;
		$popup.displayed = false;
		$popup.width     = 400;
		$popup.height    = 400;
	}
};
