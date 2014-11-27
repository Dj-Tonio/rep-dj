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

$(document).ready(function() {
	$panel.init();
});
