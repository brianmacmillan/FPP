/*
 * 
	bm_users - contains user profile and user preference info, including login code 
	cobblestore edit October 21, 2010 - added exception handling to hide WHY_LOGIN for cs = true
	change in logout,newUserToggle and eventhandler
	also, added a hack to userPreferencesSet to deal with admin. Need to change login query to return admin info.
	edited login_HttpResponse to handle admin
	edit userPreferencesShow to remove product edit show
	*** end cobblestore edits
 */

;(function($){
var $$;


$$ = $.fn.users = function() {

};

$.extend({users : {
	/*set from config file */
	database_errors :"",
	query_in_progress : false,
	admin : false,
	edit_mode : false, //when true edit functionality is activated.
	editor : false,
	hide_add_delete_warnings : true,  //maintained in user preferences
	login_name : "guest",  // id / login_name of current user.
	logged_in : false, //equals true when logged in 
	login_in_process : 0,
	password : "",
	userID : 0,  // id of current user.
	show_query_results : false, //maintained in user preferences
	show_query_parameters : false, //maintained in user preferences
	show_data_change_messages : false, //maintained in user preferences
	// There is a need to synchronize these values with the login.php script.
	CHANGE_PASSWORD_URL : "scripts/php/changePassword.php",
	DEFAULT_USERNAME : "enter your username or email",
	DEFAULT_CITY : "enter your city",
	DEFAULT_EMAIL : "enter your email",
	DEFAULT_PASSWORD : "enter your password",
	ERROR_MISSING_ARGUMENTS : 1,
	ERROR_NO_DATABASE_CONNECTION : 2,
	ERROR_INVALID_USERNAME_PASSWORD : 3,
	ERROR_USER_NAME_ALREADY_EXISTS : 4,
	LOGIN_URL : "scripts/php/users/login.php",
	MAIL_URL : "./scripts/php/mail.php",
	MESSAGE_DURATION : 3000,
	NEW_USER_MESSAGE : "You must enter a valid email email address in order to log in.",
	NEW_USER_POST_LOGIN_MESSAGE : "A confirmation email has been sent to your email address.",
	PREFERENCES_UPDATE_URL : "scripts/php/preferencesSave.php",
	SUBMIT_BUTTON : "#login-submit-btn",
	SUCCESS : 0,
	USER_PREFERENCES_SAVE_URL : "scripts/php/users/userPreferencesSave.php",
	USER_PREFERENCES_GET_URL: "scripts/php/users/userPreferencesGet.php",
	USERS_UPDATE_URL : "scripts/php/usersUpdate.php",
	WHY_LOG_IN : "Logging in allows you to rate and /or edit a work.",

	/* LOGIN and USER PREFERENCES */
	eventHandler : function(psModifier){
		try{

			// NB values for psModifier trailing space matters
			//"#homepage-login ";
			//"#tab ";}
			psModifier="#main ";
			//alert("psmodifier is "+psModifier);

			$(psModifier+$.users.SUBMIT_BUTTON).keypress(function(event){$.users.keyPress(this,event)});

			$(psModifier+"#password").click(function() {$.users.passwordOnFocus(this);});
			$(psModifier+'#username').click(function() {$.users.usernameOnFocus(this);});
/*
			e = document.getElementById('password');
			e.onfocus = function() {$.users.passwordOnFocus();}
			e = document.getElementById('username');
			e.onfocus = function() {$.users.usernameOnFocus();}
*/
			//Login when enter pressed 
			$(psModifier+"#username").keypress(function(event) {$.users.keyPress(event,this)});
			$(psModifier+"#password").keypress(function(event) {$.users.keyPress(event,this)});
			$(psModifier+"#confirm-password").keypress(function(event) {$.users.keyPress(event,this)});
			$(psModifier+"#email").keypress(function(event) {$.users.keyPress(event,this)});

			//$(psModifier+"#new-user").click(function(event){$.users.newUserToggleContainer(event,this)});
			
			//$(psModifier+"#new-user-tab").click(function(event){$.users.newUserToggleContainer(event,this)});

			//$(psModifier+"#new-user-container").click(function(event){$.users.newUserToggleContainer(event,this)});
			//$(psModifier+"#new-user-container").keypress(function(event){$.users.keyPress(event,this);});
			//$(psModifier+"#new-user").blur(function(){$.users.setFocusPasswordOrRememberMe(this)});

			//$(psModifier+"#remember-me").click(function(event){$.users.rememberMeToggleContainer(event,this)});
			//$(psModifier+"#remember-me-container").click(function(event){$.users.rememberMeToggleContainer(event,this)});
			//$(psModifier+"#remember-me-container").keypress(function(event){$.users.keyPress(event,this)});
			//$("#remember-me").blur(function(){$.users.setFocusPasswordOrRememberMe("new-user")});

			//NB Brian Important Cancel event is used to stop the click event from bubbling to the checkbox-container control
			// which also has a click event to allow clicks on text to change the value of the control.
			//$(".checkbox-control").click(function(){$.bm_ui.cancel_event=true;});

			//$.bm_ui.toggleInput($(psModifier+"#new-user"),psModifier+".new-user-input");
			
			//$(psModifier+"#show-editor").click(function(){$.users.show_editor=$(this).attr("checked");$.users.toggleEditor();});
			//$(psModifier+"#show-query-results").click(function(){$.users.show_query_results=$(this).attr("checked")});
			//$(psModifier+"#show-query-parameters").click(function(){$.users.show_query_parameters=$(this).attr("checked");});
			//$(psModifier+"#show-data-change-messages").click(function(){$.users.show_data_change_messages=$(this).attr("checked")});
			//$(psModifier+"#hide-add-delete-warnings").click(function(){$.users.hide_add_delete_warnings=$(this).attr("checked")});

			//$(psModifier+"#preferences-submit-button").click(function(){$.users.userPreferencesSave()});

			//$(psModifier+"#logout-submit-button").click(function(event){$.users.logout()});
			//$(psModifier+"#preferences-submit-button").keypress(function(event){$.users.keyPress(event,this)});
			//$(psModifier+"#logout-submit-button").keypress(function(event){$.users.keyPress(event,this)});
			
			$(psModifier+"#login-submit-btn").keypress(function(event){$.users.keyPress(event,this)});
		
			// contact stuff
			$(psModifier+"#contact-submit").keypress(function(event){$.users.contactSubmit()});
			$(psModifier+"#contact-submit").click(function() {$.users.contactSubmit()});
			$(psModifier+"#contact-email").blur(function() {$.users.validateEmail(this,true)});
			$(psModifier+"#contact-email").focus(function() {$.users.validateEmailFocus(this)});
			$(psModifier+"#contact-cc").blur(function() {$.users.validateEmail(this,false)});
			/*
			if ($.users.bm){
				$.users.messageShow($.users.WHY_LOG_IN,false);
			}
			*/
		}
		catch(err)
		{
			$.bm_utils.errorHandler("users.eventHandler",err);
		}
	},
	login : function(){
	    URL="./scripts/php/users/login.php";
	    sType="POST";
	    sDataType="html";
		if ($.users.login_in_process) return;
		$.users.login_in_process = true;
		$($.users.SUBMIT_BUTTON).attr("disabled","disabled");
		$($.users.SUBMIT_BUTTON).removeClass("active");

		var sPassword =  escape(document.getElementById("password").value);
		var sUsername =  escape(document.getElementById("username").value);

		if ($("#remember-me-chk").attr("checked"))
		{
			createCookie("username",sUsername,365);
			createCookie("password",sPassword,365);
		} else
		{
			createCookie("username","",-1);
			createCookie("password","",-1);
		}


		if (!$.users.validateUsername(sUsername)){$.users.cancelLogin();document.getElementById("username").focus();return}


		if (!$.users.validatePassword(sPassword)){
			$.users.cancelLogin();
			document.getElementById("password").focus();
			return;
		}


		$.bm_ui.setCursor("wait");

		if ($.users.logged_in)
		{
			//shouldn't happen
			//$.bm_utils.errorHandler("Login","User already logged in");
			//$.users.cancelLogin();
			//return;
		};

		sUsername = escape(sUsername);
		sPassword = escape(sPassword);
		sNewUser = document.getElementById("new-player-chk").checked;

		sEmail = $("#login-email").val();
		
		if ($.users.show_query_parameters==true) {winWrite("Login query params: "+$.users.LOGIN_URL+sParams)}

	    var request = $.ajax({
	    url: URL,
		data: {user_name:sUsername,password:sPassword,new_user:sNewUser,email:sEmail},
	    type: sType
	    });
	    request.done(function(xmlResponse) {
	        xmlRoot = xmlResponse.documentElement;  
	        if (xmlRoot){
		       	errorCodeArray = xmlRoot.getElementsByTagName("error_code");
		       	errorMessageArray = xmlRoot.getElementsByTagName("error_message");  
		        iErrorCode = errorCodeArray.item(0).firstChild.data;
		        sErrorMessage = errorMessageArray.item(0).firstChild.data;

		        if (Number(iErrorCode)>0){
		        	console.log("Error code "+iErrorCode);
			        $.users.login_in_process = false;
			        $.users.logged_in = false;
			        $.users.admin = 0;
			        $.bm_ui.messageShow(sErrorMessage);
			    } else {
			        idArray = xmlRoot.getElementsByTagName("id"); 
			        adminArray = xmlRoot.getElementsByTagName("admin"); 		        
			        iUserId = idArray.item(0).firstChild.data;
			        iAdmin = adminArray.item(0).firstChild.data;
		        	console.log("Login success. Error code "+iErrorCode);
			        $.users.login_in_process = false;
			        $.users.logged_in = true;
					$.users.cancelLogin();
			        $.users.userID = iUserId;
			        $("#user-id").val(iUserId);
			        $.users.admin = iAdmin;
	                $("#current-game-button").addClass("visible");
	                if ($.users.admin==2){
	                    $("#admin-menuitem").removeClass("invisible");
	                }
	                if ($.users.admin>0) {
	                    //$("#login-menuitem").removeClass("visible");
	                    $("#defaults-menuitem").removeClass("invisible");
	                    $("#players-menuitem").removeClass("invisible");
	                    $("#current-game-menuitem").removeClass("invisible");
	                    $("#select-game").addClass("admin");
	                    $("#select-game-button").addClass("admin");
	                    $(TAB_CONTAINER).tabs("option","active",2);
		                gameDefaultsGet();
	                } 
	                if ($.users.admin==0){
	                	$("#current-game-menuitem").removeClass("invisible");
	                	$("#players-menuitem").addClass("invisible");
	                	$("#defaults-menuitem").addClass("invisible");
	                    $(TAB_CONTAINER).tabs("option","active",1);
	                }
				}				
		        $.users.cancelLogin();
				return;
			} else {("login error invalid xml return message");}
	    });
	    request.fail(function(jqXHR, sResult) {
	      //document.getElementById("message").value=textStatus;
	      showErrorMessage("login fail\n"+sResult);
	      return false;
	    });
	},
	loginOld : function(e)
	{
		try
		{
			//window.console.log("login start");
			if ($.users.login_in_process) return;
			$.users.login_in_process = true;
			$($.users.SUBMIT_BUTTON).attr("disabled","disabled");
			$($.users.SUBMIT_BUTTON).removeClass("active");

			var sPassword =  escape(document.getElementById("password").value);
			var sUsername =  escape(document.getElementById("username").value);

			if ($("#remember-me-chk").attr("checked"))
			{
				createCookie("username",sUsername,365);
				createCookie("password",sPassword,365);
			} else
			{
				createCookie("username","",-1);
				createCookie("password","",-1);
			}


			if (!$.users.validateUsername(sUsername)){$.users.cancelLogin();document.getElementById("username").focus();return}
			if (!$.users.validatePassword(sPassword)){$.users.cancelLogin();document.getElementById("password").focus();return}


			$.bm_ui.setCursor("wait");

			if ($.users.logged_in)
			{
				//shouldn't happen
				errorHandler("Login","User already logged in");
				$.users.cancelLogin();
				return;
			};

			var sParams = "?user_name="+escape(sUsername);
			sParams += "&password="+escape(sPassword);
			sParams += "&new_user="+document.getElementById("new-player-chk").checked;

			sParams += "&email="+$("#login-email").val();
			//sParams += "&alias="+$("#login-alias").val();
			//sParams += "&login_name_is_email_address="+checkedToString($("#login_name_is_email_address").attr("checked"));

			//$.users.show_query_parameters=true;
			
			if ($.users.show_query_parameters==true) {winWrite("Login query params: "+$.users.LOGIN_URL+sParams)}
			console.log("before ajax");
			xmlHttp.open("GET", $.users.LOGIN_URL+sParams, true);
			xmlHttp.onreadystatechange = $.users.login_HttpResponse;
			xmlHttp.send(null);
		}
		catch(err)
		{
			$.bm_utils.errorHandler("login",err);
			$.users.cancelLogin();		
		}
	},
	cancelLogin : function(){
		$.users.login_in_process = false;
		$.bm_ui.setCursor("default");
		$($.users.SUBMIT_BUTTON).addClass("active");
		$($.users.SUBMIT_BUTTON).removeAttr("disabled");
	},
	login_HttpResponse : function() 
	{
		try
		{
			/*
				Response message:
				Error number integer
				Error message string
				User_id integer - the primary key to the user table
				Admin integer - the primary key to the user table
			*/
			console.log("login_HttpRespnse " + xmlHttp.readyState)
			if (xmlHttp.readyState == 4) 
			{
				var xmlResponse = xmlHttp.responseText;
				//var sResultsArray;
				//var e;
				
		       //showMessage("parsing data "+xmlResponse);
		       var xmlRoot ;
		       xmlRoot = xmlResponse.documentElement;  
		       var errorCodeArray =  xmlRoot.getElementsByTagName("error_code");
		       var errorMessageArray =  xmlRoot.getElementsByTagName("error_message");
		       var idArray = xmlRoot.getElementsByTagName("id"); 
		       var adminArray = xmlRoot.getElementsByTagName("admin");

				//if ($.users.show_query_results){winWrite("Login results "+sResults)}
				//sResultsArray = sResults.split(",");
				
				//if ((sResultsArray[0] == $.users.SUCCESS && sResultsArray.length>1))

				var bSuccess = true;
				if (bSuccess)
				{					
					$.users.logged_in = true;
					$.users.login_name=$("#username").val();
					$.users.password=$("#password").val();
					// $.users.userPreferencesSet(sResultsArray);
					$.bm_ui.current_edit_mode = $.bm_ui.EDITING_NOTHING;
					
					//$.users.userPreferencesShow();
					//$.users.messageShow("");
					$.users.login_in_process = false;
					
					/*					
					if ($("#new-user-chk").attr("checked")){
						$.users.newUserVerificationEmail();
					}
					*/

				} else
				{
					if (sResultsArray.length<2)
					{
						$.users.errorShow("Login failed with the following message: "+sResults);
					} else
					{
						$("#username").focus().select();
						if (sResultsArray[0]==4) 
						{$.users.errorShow(sResultsArray[1].substr(0,(sResultsArray[1].length))+" Are you really a new user?");} else{$.users.errorShow(sResultsArray[1].substr(0,(sResultsArray[1].length)));}
					}
					$.users.cancelLogin();
				}
		  	} else
			{
				// NB Brian Is there a need to handle other ready states?
				//alert("ready state = "+http.readyState)
			}
			$.bm_ui.setCursor("default");
		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.login_HttpResponse",err);
		}
		$.users.login_in_process = false;
	},
	logout : function()
	{
		try
		{
			$.users.logged_in = false;
			if($.users.cs)$("#products-edit-tab").addClass("admin"); 
			$("#hide-when-logged-in").removeClass("active");
			$("#show-when-logged-in").addClass("active");
			$.users.messageShow($.users.WHY_LOG_IN,false);
			$.users.loginShow();
			
		} catch(err) 
		{
			$.bm_utils.errorHandler("logout",err);
		}
	},
	loginShow : function()
	{
		try
		{
			$(".admin").removeClass("active"); 
			$(".hide-when-logged-in").addClass("active");
			$(".show-when-logged-in").removeClass("active");
			//if ($.users.bm)$.bm_tabs.setFocus("#blind2");

		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.loginShow",err);
		}
	},



	toggleEditor : function(){
		//turn the edit tab on and off depending on the setting of the show editor flag.
		
		if ($.users.show_editor)
		{
			$("#add-edit").addClass("active");
			$("#view-edits").addClass("active");
		} else{
			$("#add-edit").removeClass("active");
			$("#add-edit").removeClass("selected");
			$("#comment-tab-editor").removeClass("active");
			$("#comment-tab-editor").removeClass("selected");
			$("#view-edits").removeClass("active");
			$("#view-edits").removeClass("selected");
			$("#comment-tab-view-edits").removeClass("active");
			$("#comment-tab-view-edits").removeClass("selected");
		}
	},
	rememberMeToggleContainer : function(event,e){
		//alert("checked "+$(e).attr("id")+" "+$(e).attr("checked"));
		if ($.users.cancel_event){$.users.cancel_event=false;return}
		if ($(e).attr("id")=="remember-me-container"){
			$.users.cancel_event=false;
			$.bm_ui.checkboxReverse(event,e,true);
		} else
		{
			$.users.cancel_event=true;
			$.bm_ui.checkboxReverse(event,e,true);
		}
		return;
	},
	newUserToggleContainer : function(event,e){
		if ($.users.cancel_event){$.users.cancel_event=false;return}
		if (window.console) {if ($.bm_ui.debug){window.console.debug("newUserToggleContainer start")};}
		// NB Exception. This should all be encapsulated
		var sContext;
		// if ($(e).hasClass("tab")){
		// 	sContext = $.bm_tabs.TAB_CONTEXT;
		// } else {
		// 	sContext = $.users.LOGIN_CONTEXT;
		// }
		sContext = $.users.LOGIN_CONTEXT;

		if ($(e).attr("id")=="new-user-container"){
			if (window.console) {if ($.bm_ui.debug){window.console.debug("newUserToggleContainer middle "+sContext+"#new-user-container")};}
			$.users.cancel_event=false;
			$.bm_ui.checkboxReverse(event,e,true);
			$.bm_ui.toggleInput($(sContext+"#new-user"),sContext+".new-user-input");
		} else
		{
			$.users.cancel_event=true;
			$.bm_ui.toggleInput(e,sContext+".new-user-input");
		}
		$.users.setFocusPasswordOrRememberMe($(sContext+"#new-user"));
		$.users.newUserToggle();
		if (window.console) {if ($.bm_ui.debug){window.console.debug("newUserToggleContainer end")};}
		return;
	},
		/*
		newUserToggleContainer : function(event,e){
			if ($.users.cancel_event){$.users.cancel_event=false;return}
			if ($(e).attr("id")=="new-user-container"){
				$.users.cancel_event=false;
				$.bm_ui.checkboxReverse(event,e,true);
				$.bm_ui.toggleInput($("#new-user"),".new-user-input");
			} else if ($(e).attr("id")=="new-user-container-tab") {
				$.users.cancel_event=false;
				$.bm_ui.checkboxReverse(event,e,true);
				$.bm_ui.toggleInput($("#new-user-tab"),".new-user-input");
			} else
			{
				$.users.cancel_event=true;
				$.bm_ui.toggleInput(e,".new-user-input");
			}
			$.users.setFocusPasswordOrRememberMe("new-user");
			$.users.newUserToggle();
			return;
		},
		*/
			setFocusPasswordOrRememberMe : function(e)
			{
				// NB Exception. This should all be encapsulated
				var sContext;
				// NB Hard wired.
				// if (($(e).parent().attr("id")=="login-tab-content") ||  ($(e).parent().attr("id")=="new-user-container") )
				// {
				// 	sContext = $.bm_tabs.TAB_CONTEXT;
				// } else {
				// 	sContext = $.users.LOGIN_CONTEXT;
				// }
				sContext = $.users.LOGIN_CONTEXT;
				if ($(e).checked) 
				{
					$(sContext+"#confirm-password").focus();
					//document.getElementById("confirm-password").focus();
				} else {
					$(sContext+"#remember-me-container").focus();
					//document.getElementById("remember-me-container").focus();
				}
			},
			/*
			setFocusPasswordOrRememberMeTab : function(e)
			{
				if (document.getElementById(e).checked) 
				{
					document.getElementById("confirm-password-tab").focus();
				} else 
				{
					document.getElementById("remember-me-container-tab").focus();
				}
			},
			*/
		newUserToggle : function()
		{
			if ($("#new-user").attr("checked")){
				$.users.messageShow($.users.NEW_USER_MESSAGE,false);
			} else{
				$.users.messageShow($.users.WHY_LOG_IN,false);
				$("#confirm-password").val("");
				
			}
		},

	divContactSubmitKeypress : function(event){
		var iKey = getKeystroke(event);
		if (iKey == $.cs.KEY_SPACE || iKey == $.cs.KEY_ENTER) 
		{
			alert("sending email");
			$.users.contactSubmit();
			return;
		}
	},

	newUserVerificationEmail : function(){
		var sSystemName = "Brian MacMillan.com";
		var sSystemURL = "http://localhost:8888/";
		//var sSystemURL="http://www.brianmacmillan.net/";
		//"index.php&user_key="$.bmUsers.user_key+"?"
		var sSystemEmail="admin@brianmacmillan.com";
		var sFrom = sSystemEmail;
		var sTo = $("#login-email").attr("value")
		var sMessage = "Click here to verify "+sSystemURL+"index.php("+$.users.user_key+")";
		var sSubject = "User verification email from "+sSystemName;
		var sCC = "";
		//var sCC= $("#contact-cc").attr("value");
		//alert("in newUserVerificationEmail "+sMessage+" "+sFrom+" "+sCC);
		//if (!validateMessage("#message"){alert("message too short")}
			$.post($.users.MAIL_URL, { from: sFrom,to: sTo,subject:sSubject,cc: sCC,message: sMessage},
				function(data){
				//$.bm_tabs.setFocus("#blind5");
				$.users.messageShow($.users.NEW_USER_POST_LOGIN_MESSAGE,false);
			    //processXML(data);
			  });
			//window.location.href="";
	},
	contactSubmit : function(){
		//To start - fix validate email.
		//if (!$.users.validateEmail("#contact-email",true)) {document.getElementById("contact-email").focus();return;};
		//if (!$.users.validateEmail("#contact-cc",false)) {document.getElementById("contact-cc").focus();return;};
		var sFrom = $("#contact-email-address").attr("value");
		var sMessage = $("#contact-email-content").attr("value");
		var sSubject = $("#contact-email-subject").attr("value");
		var sCC= $("#contact-email-cc").attr("value");;
		//alert("in contact submit "+sMessage+" "+sFrom+" "+sCC);
		//if (!validateMessage("#message"){alert("message too short")}
			$.post($.users.MAIL_URL, { from: sFrom,subject:sSubject,cc: sCC,message: sMessage},
			  function(data){
				//$.bm_tabs.setFocus("#blind5");
				messageShow("Your email has been sent.","#contact-message",true);
			    //processXML(data);
			  });
			//window.location.href="";
	},
	processEmail : function(psData){
		alert("in process email "+psData);
	},
	setDefaults : function(){
		try
		{
			
			if (LOCALHOST)  // helps my testing
			{
				document.getElementById("username").value = "bmacmill";
				document.getElementById("password").value = "nevsky";
				document.getElementById("login-submit-button").disabled = false;
			} else
			{
				$("#username").val($.users.DEFAULT_USERNAME);
			}

		} catch(err)
		{
			$.bm_utils.errorHandler("setLoginDefaults",err);
		}
	},
	keyPress : function(evt,e)
	{
		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress start")};}
		//Note that safari doesn't trap tab event
		//Note that there is a general window keyPress handler in cobblestore.js
		var iKey = $.bm_utils.getKeystroke(evt);
		console.log("in keypress "+iKey);
		//var bShiftPressed = getShiftPressed(evt);
		//var bAltPressed = getAltPressed(evt);
		//var bCtrlPressed = getCtrlPressed(evt);
		
		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress for key "+iKey+" "+$(e).attr("id"))};}
		
		// NB Hardwired. Replace with constants.
		if (iKey==$.bm_ui.KEY_SPACE && $(e).attr("id")=="new-user-container"){
			if (window.console) {if ($.bm_ui.debug){window.console.debug(" new-user-container")};}
			$.users.newUserToggleContainer(evt,e);
			return;}
		if (iKey==$.bm_ui.KEY_SPACE && $(e).attr("id")=="remember-me-container"){$.users.rememberMeToggleContainer(evt,e)}
		
		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress 2")};}

		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="password"){$.users.login()}
		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="login-submit-button"){$.users.logout()}
		//if (iKey==$.bm_ui.KEY_TAB && $(e).attr("id")=="login-submit-button"){$.bm_tabs.setFocus($("#blind2"));}

		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress 3")};}
		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="logout-submit-button"){$.users.logout()}
		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="preferences-submit-button"){$.users.userPreferencesSave()}
		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="username"){
			if ($(e).val()>"" && $("#password").val()>"")$.users.login();
		}
		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress 4")};}

		if (iKey==$.bm_ui.KEY_ENTER && $(e).attr("id")=="login-submit-button"){$.users.login()}

		//if (window.console) {if ($.bm_ui.debug){window.console.debug("bm_users keyPress end")};}
	},

	usernameOnFocus : function()
	{
		try
		{
			var e;
			e = document.getElementById("username");
			if (e.value == $.users.DEFAULT_USERNAME)
			{
				e.value = "";
			};
			e.select();
		} catch(err)
		{
			errorHandler("users.usernameOnFocus",err);
		}
	},
	validateUsername : function(psUsername)
	{
		var e;  // local element
		var s = ""; // local string
		var i = 0; // local integer
		try
		{
			if (psUsername == $.users.DEFAULT_USERNAME)
			{
				$.users.errorShow("Please enter a username. It needs to be at least four characters long.");
				return false;
			}
			if (psUsername.length <= 3)
			{
				$.users.errorShow("Your username needs to be at least four characters long.");
				return false;
			} else
			{
				return true;
			}
		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.validateUsername",err);
		}	
	},
	validateEmail : function(e,pbRequired,psMessageField)
	{
		
		var s = ""; // local string
		var i = 0; // local integer
		try
		{
			//test for presence of @ sign and period ?@*.* 
			var sResult = "";
			var bSkipCheck = false; //cc for example can be blank (ie notrequired)
			var sTempString = $(e).val();
			var sReturn = "";
			//NB Brian = trim spaces.
			if (!pbRequired && sTempString.length==0){bSkipCheck=true}
			if (!bSkipCheck)
			{
				if (sTempString.indexOf("@")<0){sResult+="missing required character '@'"} else {/*do nothing*/};

				if (sTempString.indexOf(".")<0){if (sResult.length>0){sResult+="; "};sResult+="missing required character '.' ";} else {/*do nothing*/};


				if (sTempString.length > 3)
				{

					//do nothing. valid condition
				} else
				{

					if (sResult.length>0){sResult+="; "};
					sResult +="email address is less than 4 characters long";
				}

			}
			if (sResult.length>0 && !bSkipCheck){
				sResult = "Invalid email address. ";
				//sResult = "Invalid email address. "+sResult;
				$.users.messageShowContact(psMessageField,sResult,true);
				$(e).css("background-color",$.bm_ui.ERROR_COLOR); 
				$(e).attr("title",sResult); 
				return false;
			} else 
			{
				if (!gbIE) {
					$(e).css("background-color",$.bm_ui.INPUT_COLOR); 
				}
				return true;
			}
		} catch(err)
		{
			$.bm_utils.errorHandler("validateEmail",err);
		}
	},
	validateEmailFocus : function(e)
	{
		try
		{
			$(e).css("background-color",$.bm_ui.INPUT_COLOR); 
		} catch(err)
		{
			errorHandler("validateEmail",err);
		}
	},
	validateNewPassword : function()
	{
		var sReturn = "";
		if (document.getElementById("new-password").value==document.getElementById("confirm-new-password").value)
		{
			// do nothing
		} else
		{
			// raise error
			sReturn = "Password confirmation failure.";
		}
		return sReturn;
	},
	validatePassword : function(psPassword)
	{
		var e;  // local element
		var s = ""; // local string
		var i = 0; // local integer
		try
		{
			if (psPassword==$.bm_ui.DEFAULT_PASSWORD)
			{
				$.users.errorShow("Please enter a valid password. It needs to be at least four characters long.");
				return false;
			}
			if (psPassword.length <= 3)
			{
				$.users.errorShow("Your password needs to be at least four characters long.");
				return false;
			} else 
			{
				return true;
			} 
			
		} catch(err)
		{
			$.bm_utils.errorHandler("validatePassword",err);
		}
	},
	passwordOnFocus : function()
	{
		document.getElementById("password").select();
		//$.bm_main.current_edit_mode = $.bm_main.EDITING_PASSWORD;
		var e = document.getElementById("password");
		if (e.value == $.users.DEFAULT_PASSWORD)
		{
			e.value = "";
		};
	},

	usersUpdate : function()
	{
		try
		{
			var sEmail = document.getElementById("email").value;
			if (sEmail == $.users.DEFAULT_EMAIL)sEmail="";
			var sCity = document.getElementById("city").value;
			var sUserName = document.getElementById("username").value;
			var sPassword = document.getElementById("password").value;
			var sFirstName = document.getElementById("first-name").value;
			var sLastName = document.getElementById("last-name").value;
			var sParams = "?login_name="+escape(sUserName)+"&user_key="+$.users.user_key+"&email="+sEmail+"&city="+escape(sCity)+"&first_name="+escape(sFirstName)+"&last_name="+escape(sLastName)+"&password="+escape(sPassword);
			if ($.users.show_query_parameters) {winWrite("Login query params: "+$.users.USERS_UPDATE_URL+sParams)}
			xmlHttp.open("GET", $.users.USERS_UPDATE_URL+sParams, true);
			xmlHttp.onreadystatechange = $.users.usersUpdate_HttpResponse;
			xmlHttp.send(null);	
		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.usersUpdate",err);
			$.users.login_in_process = false;
		}	
	},
	usersUpdate_HttpResponse : function()
	{
		try
		{
			if (xmlHttp.readyState == 4) 
			{
				var sResults = xmlHttp.responseText;
				var sResultsArray;
				var e;
				if ($.users.show_query_results){winWrite("userUpdate results "+sResults)}
				sResultsArray = sResults.split(",");
				if (sResultsArray[0] == SUCCESS)
				{
					$.users.messageShow("Your changes have been saved.",true);
				} else
				{
					$.users.errorShow("users update failure",false);
				}
			}		
		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.usersUpdate_HttpResponse",err);
		}
	},
	userPreferencesSet : function(piPreferenceArray)
	{
		try
		{
			// NB Brian This needs to by synced with login.php database->getPreferences
			// To start change value to checked.
			$.users.user_key=piPreferenceArray[2];
			
			//alert("setting preferences for user id "+$.users.user_key);
			$('#user-preferences-list div').remove();
			$('#user-preferences-list').append(piPreferenceArray[3]);

			//Populate user preferences elements in login.html
			$.users.populateUserPreferences(0);
			//NB To do - user role implementation
			if ($.users.login_name="bmacmill") $.users.admin=true;
			if ($.users.login_name="bmacmill") $.users.editor=true;
			if ($.users.login_name=="benbarbash@aol.com") $.users.admin=true;

			if ($.users.admin)$(".admin").addClass("active");
			
			//if ($.users.bm)$.bm_tabs.setFocus($("#blind2"));
			
			return;

		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.userPreferencesSet",err);
		}
	},
	userPreferencesShow : function()
	{
		try
		{
			$(".hide-when-logged-in").removeClass("active");
			$(".show-when-logged-in").addClass("active");
		} catch(err)
		{
			$.bm_utils.errorHandler("bm_users.userPreferencesShow",err);
		}
	},

		userPreferencesSave : function()
		{
			try
			{
				var sPassword;
				var sReturn = "";
				var sEmail = document.getElementById("email").value;
				var sNewPassword = document.getElementById("new-password").value;
				var sAlias = document.getElementById("alias").value;
				var sLoginNameIsEmail=checkedToString($("#login_name_is_email").attr("checked"));

				var iUserKey = $.users.user_key;
				var sLoginName = $.users.login_name;
				var sShowHeader="Y";
				var sShowMenus="Y";
				var sShowFooter="Y";
				var sShowComments="Y";
				var sShowHelp="Y";
				var sShowEditor="Y";
				var sShowPreferences="Y";
				var sShowRatings="Y";
				var sShowNavigationControls="Y";
				var sShowQueryParameters="Y";
				var sShowQueryResults="Y";
				var sShowDataChangeMessages="Y";
				var sHideAddDeleteWarnings="Y";
				var iDisplayMode=1;
				$.users.messageShow("");
				$("#preferences-submit-button").removeClass("active");
				$("#confirm-new-password").focus();  //ideally focus on nothing.
				if (sEmail == $.users.DEFAULT_EMAIL)sEmail="";

				var sReturn = $.users.validateNewPassword();

				if (sReturn=="")
				{
					sNewPassword=document.getElementById("new-password").value;
				} else
				{
					document.getElementById("new-password").focus();
					$.users.errorShow(sReturn);
					return;
				}
				//sReturn=$.users.validateEmail("email",false);
				//if (sReturn>""){$.bm_user.errorShow(sReturn);$("#email").focus().select();}

				sShowQueryParameters=checkedToString($("#show-query-parameters").attr("checked"));
				sShowQueryResults=checkedToString($("#show-query-results").attr("checked"));
				sShowDataChangeMessages=checkedToString($("#show-data-change-messages").attr("checked"));
				sHideAddDeleteWarnings=checkedToString($("#hide-add-delete-warnings").attr("checked"));
				iDisplayMode=$("#display-mode").val();

				//var sParams = "?login_name="+escape(sUserName)+"&user_key="+$.users.user_key+"&login_name="+sUserName;
				//sParams += "&show_navigation_arrows="+booleanToInteger(document.getElementById("show-navigation-arrows").checked);
				//sParams += "&wide_text_columns="+booleanToInteger(document.getElementById("wide-text-columns").checked);
				var sParams = "?user_key="+iUserKey+"&login_name="+sLoginName;
				sParams += "&password="+$.users.password;
				sParams += "&new_password="+sNewPassword;
				sParams += "&email="+sEmail;
				sParams += "&alias="+sAlias;
				sParams += "&login_name_is_email="+sLoginNameIsEmail;
				sParams += "&show_query_parameters="+sShowQueryParameters;
				sParams += "&show_query_results="+sShowQueryResults;
				sParams += "&show_data_change_messages="+sShowDataChangeMessages;
				sParams += "&hide_add_delete_warnings="+sHideAddDeleteWarnings;
				sParams += "&display_mode="+iDisplayMode;

				//sParams += "&show_help="+booleanToInteger(document.getElementById("show-help").checked);
				//sParams += "&show_comments="+booleanToInteger(document.getElementById("show-comments").checked);
				sParams += "&show_ratings="+booleanToInteger(document.getElementById("show-ratings").checked);
				sParams += "&show_editor="+booleanToInteger(document.getElementById("show-editor").checked);
				if ($.users.show_query_parameters) {winWrite("Login query params: "+$.users.USER_PREFERENCES_SAVE_URL+sParams)}
				xmlHttp.open("GET", $.users.USER_PREFERENCES_SAVE_URL+sParams, true);
				xmlHttp.onreadystatechange = $.users.userPreferencesSave_HttpResponse;
				xmlHttp.send(null);	
			} catch(err)
			{
				$.bm_utils.errorHandler("bm_users.userPreferencesSave",err);
				$.users.login_in_process = false;
			}
		},

	userPreferencesSave_HttpResponse : function()
		{
			try
			{
				var sResults = xmlHttp.responseText;
				var sResultsArray;
				var e;
				if (xmlHttp.readyState == 4) 
				{
					if ($.users.show_query_results==true){winWrite("preferences save results "+sResults)}
					sResultsArray = sResults.split(",");
					if (sResultsArray[0] == $.users.SUCCESS)
					{
						$.users.messageShow("Your preferences were successfully saved.",true);
					} else
					{
						$.users.errorShow("A problem occurred while saving your preferences.");
					}
				}		
			} catch(err)
			{
				errorHandler("bm_users.preferencesSave_tHttpResponse",err);
			}
		},
	populateUserPreferences : function(piRow)
	{
		if ($("#preferences-results .row").size()>0)
		{
			//to start - fix this references.
			//sTemp = $("#user-preferences-list .row span.show-query-parameters").eq(piRow).text();
			//NB Added because population statements below weren't triggering changes in the
			//bm_users settings.
			$.users.show_query_results = stringToBoolean($("#user-preferences-list .row span.show-query-results").eq(piRow).text());
			$.users.show_query_parameters = stringToBoolean($("#user-preferences-list .row span.show-query-parameters").eq(piRow).text());
			$.users.show_data_change_messages = stringToBoolean($("#user-preferences-list .row span.show-data-change-messages").eq(piRow).text());
			
			$("#show-query-parameters").attr("checked",stringToChecked($("#user-preferences-list .row span.show-query-parameters").eq(piRow).text()));
			$("#show-query-results").attr("checked",stringToChecked($("#user-preferences-list .row span.show-query-results").eq(piRow).text()));
			$("#show-data-change-messages").attr("checked",stringToChecked($("#user-preferences-list .row span.show-data-change-messages").eq(piRow).text()));
			$("#hide-add-delete-warnings").attr("checked",stringToChecked($("#user-preferences-list .row span.hide-add-delete-warnings").eq(piRow).text()));

			$("#contact-email").val($("#user-preferences-list .row span.email").eq(piRow).text());
			$("#email").val($("#user-preferences-list .row span.email").eq(piRow).text());
			$("#alias").val($("#user-preferences-list .row span.alias").eq(piRow).text());
			$("#display-mode").val($("#user-preferences-list .row span.display-mode").eq(piRow).text());
			$.users.toggleEditor(); //display editor if show editor is on.
		} else {
			//$.users.blankPreferences();
		}
	},
	messageShow : function(psMessage,pbHideAfterInterval)
	{
		document.getElementById("login-message").innerHTML=psMessage;
		$("#login-message").addClass("active").removeClass("error");
		if (pbHideAfterInterval)setTimeout("$.users.messageHide()",$.users.MESSAGE_DURATION);
	},
	messageHide : function()
	{
		$("#login-message").removeClass("active");
	},
	errorShow : function(psMessage)
	{
		$("#login-message").addClass("active").addClass("error");
		$("#login-message").html(psMessage);
	},
	messageShowContact : function(psMessageField,psMessage,pbHideAfterInterval)
	{
		$(psMessageField).text(psMessage);
		$(psMessageField).addClass("active").removeClass("error");
		if (pbHideAfterInterval)setTimeout("$.users.messageHideContact('"+psMessageField+"')",$.users.MESSAGE_DURATION);
	},
	messageHideContact : function(psMessageField)
	{
		$(psMessageField).removeClass("active");
	}
}
})

})(jQuery);
