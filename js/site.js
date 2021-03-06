$login = {
	verify : function($user){
		return true;
	}
};

$error = {
	msg_time : 10000,
	displayed : false,
	process : function () {
		return true;
	},
	toast : function ($msg) {
		if($error.displayed) return;
		$error.displayed = true;
		$toast = $("<div id='err_toast' class='err_msg' style='display:none'>" + $msg + "</div>");
		$("body").append($toast);
		$toast.fadeIn(400);
		$toast.delay($error.msg_time).fadeOut(400,function(){
			$toast.remove();
			$error.displayed = false;
		});
	}
};

$carnet = {
	construct : function () {
		$car = $("<div id='contact' class='page'></div>");
		$car.append("<div class='cont' id='carnet_cont'></div>");
		$car.append("<div class='list' id='carnet_list'></div>");
		$("body").append($car);
		$("#carnet_cont").append("<span class='vide'>Cliquer sur un contact pour afficher ses informations.</span>");
		$loading.start();
		$.post( "ajax/get_list_contact.php", function( data ) {
			data = $.parseJSON(data);
			if (!$login.verify(data.user) || !$error.process(data.error)) return;
			$.each(data.contact_list,function(index,nom){
				$person = $("<a id='contact_" + index + "'>" + nom + "</a>");
				$person.click(function () {
					$carnet.view(index);
				});
				$("#carnet_list").append($person);
			});
		}).always(function() {
			$loading.stop();
		});
	},
	destruct : function () {
		$("#contact").remove();
	},
	view : function ($id) {
		$loading.start();
		$.post( "ajax/get_contact.php", { id_contact: $id }, function( data ) {
			data = $.parseJSON(data);
			if (!$login.verify(data.user) || !$error.process(data.error)) return;
			$("#carnet_cont").empty();
			$("#contact .list a.selected").removeClass("selected");
			$("#contact_" + $id).addClass("selected");
			$("#carnet_cont").append("<h3>" + data.nom + "</h3>");
			$.each(data.contact,function(libel,coordonne) {
				$("#carnet_cont").append("<span class='rule'>" + libel + " :</span>");
				$("#carnet_cont").append("<span class='data'>" + coordonne + "</span><br />");
			});
			$option = $("<div class='option'></div>");
			$msg = $("<a>envoyer un message</a>");
			$msg.click(function(){
				$carnet.sendmessage($id);
			});
			$option.append($msg);
			$supp = $("<a>supprimer</a>");
			$supp.click(function(){
				$carnet.supprimer($id);
			});
			$option.append($supp);
			$("#carnet_cont").append($option);
		}).always(function() {
			$loading.stop();
		});
	},
	sendmessage: function ($id) {
		alert($id);
	},
	supprimer : function($id) {
		alert($id);
	}
};

$message = {
	current : -1,
	displayed: false,
	refreshset: false,
	last : "",
	construct : function() {
		$messagerie = $("<div id='message' class='page'></div>");
		$list       = $("<div class='list' id='conversation_list'></div>");
		$cont       = $("<div class='conversation'></div>");
		$messagerie.append($list);
		$messagerie.append($cont);
		$("body").append($messagerie);
		$message.displayed = true;
		$message.refresh();
		if(!$message.refreshset){
			window.setInterval($message.refresh, 1500);
			$message.refreshset = true;
		}
	},
	refresh : function (){
		if(!$message.displayed) return;
		$loading.start();
		$.post("ajax/get_conversation.php", { id_person : $message.current }, function( data ) {
			data = $.parseJSON(data);
			if (!$login.verify(data.user) || !$error.process(data.error)) return;
			$("#conversation_list").empty();
			$.each(data.list,function ($index, $content) {
				tab = $("<a id='conv_" + $content[0] + "'>" + $content[1] + "</a>");
				if ($content[0] == $message.current) tab.addClass("selected");
				if ($content[2] > 0) tab.addClass("nouveau");
				tab.click(function(){
					$message.view($content[0]);
				});
				$("#conversation_list").append(tab);
			});
			if($message.current!=-1) $.each(data.msg,$refresh.addmsg);
		}).always(function() {
			$loading.stop();
		});
	},
	addmsg : function ($cont) {

	},
	view : function ($id) {
		if(!$message.displayed) return;
		$loading.start();
		$.post("ajax/get_conversation_msg.php", { id_person : $message.current }, function( data ) {
			data = $.parseJSON(data);
			if (!$login.verify(data.user) || !$error.process(data.error)) return;
			// $("#conversation_list").empty();
			$.each(data.msg,$refresh.addmsg);
		}).always(function() {
			$loading.stop();
		});
	},
	destruct : function () {
		$message.current   = -1;
		$message.displayed = false;
	}
};

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

$page = {
	nomsite : "Papa",
	courant : "home",
	available : {
		"home"     : ["Home",             $carnet.construct, $carnet.destruct],
		"carnet"   : ["Carnet d'adresse", $carnet.construct, $carnet.destruct],
		"messages" : ["Messages",         $message.construct, $message.destruct]
	},
	init : function () {
		requete = $(location).attr('hash').replace(/^#/,"");
		if (requete in $page.available) $page.courant = requete;

		$.each($page.available,function(nom,info){
			$lien = $("<a id='lien_" + nom + "' href='#" + nom + "'>" + info[0] + "</a>");
			if (nom == $page.courant) {
				$lien.addClass("selected");
			}
			$lien.click(function(){
				$page.change(nom);
			});
			$("#lien").append($lien);
		});
		$page.available[$page.courant][1]();
		document.title = $page.nomsite + " - " + $page.available[$page.courant][0];
	},
	reset : function () {
		$(".page").remove();
	},
	change : function ($nom) {
		if (!($nom in $page.available)) return;
		$page.available[$page.courant][2]();
		$page.courant = $nom;
		$page.reset();
		$("#nav #lien a").removeClass("selected");
		$("#lien #lien_" + $page.courant).addClass("selected");
		document.title = $page.nomsite + " - " + $page.available[$page.courant][0];
		$page.available[$page.courant][1]();
	}
};

$(document).ready(function() {
	$panel.init();
	$page.init();
	$(document).keyup(function(e) {
		if (e.keyCode==27 && $popup.easyclose) $popup.close();   // esc
		});
	});
