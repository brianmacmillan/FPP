/*
 * 
	bm_ui
	place to centralize UI tasks, like formating and enabling and disabling input control
 */

;(function($){

var $$;


$$ = $.fn.ui = function($) {};

$.extend({ui : {
	//Capitalized items act as constants
	//the goal is to have as few element names as possible imbedded in the code.
	colorscheme : "WHITE",
	debug : true,
	//Constants associated with main tabs
	TAB_ABOUT : "about",
	TAB_BIO : "bio",
	TAB_PHOTOS : "photos",
	TAB_POEMS : "poems",
	TAB_VIDEOS : "videos",
	TAB_LOGIN : "login",
	TAB_CONTACT : "contact",

	MESSAGE_DURATION : 20,

	BOX_COLOR_DARK : "#306141", //-20 rgb
	BOX_COLOR_LIGHT : "#708161", //+20 rgb
	BOX_COLOR : "#506141", //sync with tab box-color
	DEFAULT_USERNAME : "enter your username or email",
	DEFAULT_PASSWORD : "enter your password",
	DEFAULT_EMAIL : "enter your email",
	DEFAULT_CITY : "enter your city",
	DEFAULT_TAB : "about",
	DEFAULT_MEASUREMENT_SCALE : "inches",
	DEFAULT_WEIGHT_SCALE : "pounds",

	DELIMITER : "_",

	ERROR_COLOR : "#DAA520", //GoldenRod
	EDITING_NOTHING : 0,
	EDITING_USERNAME : 1,
	EDITING_PASSWORD : 2,
	EDITING_EMAIL : 3,
	EDITING_CITY : 4,
	EDITING_COMMENTS : 5,
	EDITING_EXISTING_PASSWORD : 6,
	EDITING_NEW_PASSWORD : 7,
	EDITING_CONFIRM_NEW_PASSWORD : 8,
	EDITING_FIRST_NAME : 9,
	EDITING_LAST_NAME : 10,
	EDITING_PREFERENCES_UPDATE_PASSWORD_BUTTON : 11,
	EDITING_LOGIN_REMEMBER_ME : 12,
	HIGHLIGHT:"red", /* used in the utility highlight */
	INPUT_COLOR : "#FFFFFF", //default background color for input control
	IPAD : "false",
	KEY_TAB : 9,
	KEY_ENTER : 13,
	KEY_SPACE : 32,
	KEY_PAGE_UP : 105, /*33,*/
	KEY_PAGE_DOWN : 99, /*34 */
	KEY_LEFT_ARROW : 37,
	KEY_UP_ARROW : 38,
	KEY_RIGHT_ARROW : 39,
	KEY_DOWN_ARROW : 40,
	SUCCESS : 0,
	TEMPLATE_COLOR : "#FAFAD2", //default background color
	browser : "unknown",
	browser_version : "unknown",
	cancel_event : false,
	color_scheme : "WHITE",
	current_edit_mode : 0,
	current_focus : null,
	current_tab : "about",
	template : "HOME_PAGE",
	title : "",
	checkboxReverse : function(event,e,pbMouseClick)
	{
		if ($.ui.cancel_event){$.ui.cancel_event=false;return}
		//Reverse a checkbox value based on a checkbox container click or space bar event
		var iKey = $.bm_utils.getKeystroke(event);
		//Put the div parents of checkboxs in the tab order in tab.html and toggle checked value on space bar keypress. 
		//Necessary because check boxes weren't entering the tab order in firefox 
		if (iKey == $.ui.KEY_SPACE || pbMouseClick)
		{
			if (!$(e).children("input").attr("checked")) {$(e).children("input").attr("checked",true);} else
			{$(e).children("input").attr("checked",false)}
		}
	},
	determineRes : function(){
		// To do - flesh out for iphones etc.
		$.ui.retina = (window.devicePixelRation>=2);
	},
	determineBrowser : function() {

		var bIE, bIE4, bIE5x, bMoz, bIE5mac, bIE5xwin,bOpera,bSafari,bKonqueror,bChrome;
		var d, dom, mac, win, linux, old;

		$.ui.browser_version = $.browser.version;

		n = navigator;
		na = n.appVersion;
		nua = n.userAgent;
		win = ( na.indexOf( 'Win' ) != -1 );
		mac = ( na.indexOf( 'Mac' ) != -1 );
		linux = ( nua.indexOf( 'Linux' ) != -1 );

       //alert(" browser "+nua);

		if ( !document.layers ){
			dom = ( document.getElementById );
			bOpera = ( nua.indexOf( 'Opera' ) != -1 );
			bChrome = ( nua.indexOf( 'Chrome' ) != -1 );      
			bKonqueror = ( nua.indexOf( 'Konqueror' ) != -1 );
			bSafari = ( nua.indexOf( 'Safari' ) != -1  && !bChrome);
			bMoz = ( nua.indexOf( 'Gecko' ) != -1 && !bSafari && !bKonqueror);
			bIE = ( document.all && !bOpera );
			bIE4 = ( bIE && !dom );
			bIE5x = ( document.all && dom );
			bIE5mac = ( mac && bIE5x );
			bIE5xwin = ( win && bIE5x );
		}
		if (bMoz) $.ui.browser="moz";
		if (bChrome) $.ui.browser="chrome";  
		if (bIE)  $.ui.browser="ie";
		if (bSafari) $.ui.browser="safari";
		if (bOpera) $.ui.browser="opera";
		if (bKonqueror) $.ui.browser="konqueror";
		$.ui.IPAD = navigator.userAgent.match(/iPad/i) != null;
	},
	determineDevice : function() {
		// see index.php to see how #content.phone was set using php calls to HTTP_USER_AGENT
		// this info is also logged.
		if ($("#content.phone").length>0) $.ui.PHONE=true;
	},
	formatInputEnabled : function(e)
	{          
		$(e).removeAttr("disabled");
		return;
		
		$(e).css("backgroundColor",$.ui.INPUT_COLOR);
		$(e).css({"border-style":'inset'});
		//alert("border-style "+$(e).css("border-style"));
		$(e).css({"border-right-width":"2px"});
		$(e).css({"border-right-color":"#306141"});
		$(e).css({"border-bottom-width":"2px"});
		$(e).css({"border-bottom-color":"#306141"});

		$(e).css({"border-top-width":"2px"});
		$(e).css({"border-top-color":$.ui.BOX_COLOR_DARK});
		$(e).css({"border-left-width":"2px"});

		$(e).css({"border-left-color":$.ui.BOX_COLOR_DARK});

		//$(e).css({"border-color":"red"});
	},
	formatInputDisabled : function(e)
	{
		//NB Move to interface class //
		$(e).attr("disabled","disabled");
		return;
		$(e).css("background-color","transparent");
		$(e).css({"border": "1px solid grey"});
	},
	getHash : function() {
		//Strip the anchor from window.location.hash
		//And do exception handling for bad URL
		//My permalinks are in the format #news_12 #essays_1 where the prefix is the doctype and the suffix is the doc id
		//which can be grabbed using window.location.hash. 
		//I'm wondering whether a folder structure might be better
		//eg /contacts instead of /#contacts
		//This code is mostly about exception handling for bad URLs
		//Once the architecture is finalized most of this logic will migrate to .htaccess file.
		var sReturn=this.DEFAULT_TAB;

		if (window.location.hash=="") {
			// Handle an href in the apocalypsereview.com/contact format
			sReturn=$.bm_utils.stripChar(window.location.pathname,"/");
			//alert("gh 1 "+window.location.pathname);
			if (this.validHash(sReturn)){

				$.bm_main.bad_URL=true; // when setHash is executed window.location will get properly setup.
			} else{

				sReturn = this.DEFAULT_TAB;
				$.bm_main.bad_URL=true; // when setHash is executed window.location will get properly setup.
			}
		} else {
			//alert("gh 2 "+window.location.hash);
			sReturn = window.location.hash;
		}
		if (window.console) {
			if ($.bm_main.debug){
				//window.console.debug("getHash-"+window.location.hash+" path-"+window.location.pathname+" href-"+window.location.href+" sReturn-"+sReturn);
			}
		}		//sReturn = (window.location.hash==this.MAIN_FILE || window.location.hash=="" ) ? this.DEFAULT_TAB : window.location.hash ;
		return sReturn;
	},
		validHash : function (psURL){
			return (psURL==this.TAB_ABOUT || psURL==this.TAB_BIO || psURL==this.TAB_PHOTOS || psURL==this.TAB_POEMS || psURL==this.TAB_STORIES || psURL==this.TAB_VIDEOS || psURL==this.TAB_LOGIN || psURL==this.TAB_CONTACT)
		},
	highlight : function(pElement,piZindex)
	{ //used to highlight screen elements as part of the help
		try{
			$(pElement).css("borderColor",$.ui.HIGHLIGHT);
			if (piZindex) {
				$(pElement).css("zIndex",piZindex);

			}
		} catch(err)
		{$.bm_utils.errorHandler("highlight "+$(psElement).attr("id"),err)}
	},
		highlight_old : function(psElementId)
		{ //used to highlight screen elements as part of the help
			try{
				var e = document.getElementById(psElementId);
				e.style.zIndex = "500";
				e.style.borderColor=$.ui.HIGHLIGHT;
			} catch(err)
			{$.bm_utils.errorHandler("highlight "+psElementId,err)}
		},
	unhighlight : function(pElement,piZindex)
	{
		try{
			if (piZindex) {
				$(pElement).css("zIndex",piZindex);			
			}			
			$(pElement).css("borderColor","transparent");
		//	if (!ie){
		//		$(pElement).css("zIndex",piZindex);
		//	}
		} catch(err)
			{$.bm_utils.errorHandler("unhighlight "+psElementId,err)}
	},
	messageShow : function(psMessage,pbHideAfterInterval)
	{
		document.getElementById("login-message").innerHTML=psMessage;
		$("#message").addClass("active").removeClass("error");
		if (pbHideAfterInterval)setTimeout("$.ui.messageHide()",$.ui.MESSAGE_DURATION);
	},
	messageHide : function()
	{
		$("#message").removeClass("active");
	},
	reorient : function () {  
		/* reorient - tablet */
		//if (window.orientation==undefined)return;
		var iTemp=1; //used to force narrow (portrait), for debugging on non tablet
		try {
			if (iTemp==0 || orientation == 0 || orientation == 180  ){  
				//Portrait
				$.ui.narrow=true;
				if (!$.ui.PHONE){
					$("#navigation").addClass("narrow");
				}
				$("#content").addClass("narrow");
				$("#content").addClass("fixed-margin");
				$("#content").addClass("internal-nav");
				if (window.console) {if ($.bm_main.debug){window.console.debug($("#content").css("margin-left"))}}
			}  
			else if ( orientation == 90 || orientation == -90) {  
				//Landscape
				if (!$.ui.PHONE){
					$("#navigation").removeClass("narrow");
					$("#navigation").addClass("visible");
				}
				$("#content").removeClass("narrow");
				$("#content").removeClass("internal-nav");
				$.ui.narrow=false;
				$("#comment-tab").removeClass("invisible");
			}
		} catch(err){}
		//$.ui.setContentWidth($.ui.current_tab);	
	 },
	setCursor : function(psState)
	{
		document.body.style.cursor = psState;
	},
	setHash : function(val) {
		if ($.bm_main.bad_URL){
			// The idea here is that a crap URL has been passed and corrected. 
			// OR eg  /contact has been changed to /#contact - in anticipation of perhaps  
			// changing the permalink structure to use folders instead of hashes/anchors
			// Note that setting location triggers a history event 
			// which reruns some of the start up code. That's why location and location.hash are only set when the URL is bad.
			// NB All this processing to .htaccess
			$.bm_main.bad_URL=false;
			window.location = $.bm_utils.getBaseURL()+val;
		} else {
				window.location.hash = val;
		}
	},
	toggleInput : function(eCheck,eChange){
		//This function allows a change in eCheck (checkbox input control) 
		//to change the disabled state of whatever elements have the eChange class
		if ($(eCheck).attr("checked")){
			$.ui.formatInputEnabled(eChange);
		} else
		{
			$.ui.formatInputDisabled(eChange);
		}
	},
	viewport : function(e){
		//if (window.console) {if ($.bm_main.debug){window.console.debug("vp 0")};}
		var e = window
		, a = 'inner';
		if ( !( 'innerWidth' in window ) )
		{
		a = 'client';
		e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	}
}
})

})(jQuery);

