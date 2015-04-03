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


$$ = $.fn.main = function() {

};

$.extend({main : {
	pageLoaded : false, //maintained in user preferences
	gameID : 1,
	gameDefaultID : 1,
	debug : true,
	eventHandler : function(psModifier){
	}
}
})

})(jQuery);
