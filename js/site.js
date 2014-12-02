$(document).ready(function() {
	$panel.init();
	$(document).keyup(function(e) {
		if (e.keyCode == 27 && $popup.easyclose) $popup.close();   // esc
	});
});

$loading = {
	nbrequete : 0,
	start : function () {
		if ($loading.nbrequete<0) $loading.nbrequete=0;
		$loading.nbrequete += 1;
		if ($loading.nbrequete != 1) return;
		$("body").append("<img id='loading' src='img/loading.gif' />");
	},
	stop : function () {
		$loading.nbrequete -= 1;
		if ($loading.nbrequete > 0) return;
		$("#loading").remove();
	}
};

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
		$("#nav").css("box-shadow","none");
		$("#panel").slideDown(400);
	},
	hide : function(){
		$("#panel").slideUp(400, function() {
			$("#nav").css("box-shadow","0px 0px 2px #0071bd");
		});
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
			"width"  : $popup.width  + "px",
			"height" : $popup.height + "px",
			"left"   : (($(document).width()-$popup.width)/2) + "px"
		});
		if ($popup.easyclose) $("#pop_overlay").click($popup.close);
		$("#pop_overlay").fadeIn(400);
		$("#popup").fadeIn("slow");
	},
	close : function(){
		if (!$popup.displayed) return;
		$popup.displayed = false;
		$("#pop_overlay").fadeOut().fadeOut(400, function() {
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
