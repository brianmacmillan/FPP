     //Tab element constants. These are used to main renaming elements easier
var TAB_MAIN=0;
var TAB_ATTRIBS=1;
var TAB_GAMES=2;


var TAB_CONTAINER="#main-inner"; //Note the # - for use by jQuery UI tabs
var TAB_ID_LOGIN="#login-tab";
var TAB_ID_DEFAULTS="#defaults-tab";
var TAB_ID_CURRENT_GAME="#current-game-tab";
var TAB_ID_PLAYERS="#players-tab";
var TAB_ID_ADMIN="#admin-tab";

var FIRST_FIELD="username"; // used to  handle focus events on load
var SECOND_FIELD="password"; 


 initializeMainTab=function(){
    $( "#tabs" ).tabs();
    //$(TAB_ID_ATTRIB).tabs();
    //$(TAB_ID_GAMES).tabs();
    $(TAB_CONTAINER).tabs({
        activate: function(event, ui) {
            if (mbCancelEvent) return; // stop from being activated until after document.Ready or during ajax requests()
            var iTab=currentTab(TAB_CONTAINER);

            $(TAB_CONTAINER).tabs('option', 'active');

            if (iTab==TAB_MAIN){
            } 
            if (iTab==TAB_ATTRIBS){
            } 
            if (iTab==TAB_GAMES){
            } 

            //getData(document.getElementById(SEL_NAV));
        }
    });
}
initializeTabControls = function(){
        $( "#remember-me-container" ).buttonset();
        $( "#new-player-chk").button().click(function(event){
            event.preventDefault;
            event.cancelBubble;
            bChecked = $(this).prop("checked");
            if (bChecked){
               $("#new-player-details-container").removeClass("invisible");
               document.getElementById("confirm-password").focus();
             } else {
               document.getElementById("login-submit").focus();
               $("#new-player-details-container").addClass("invisible");
             }
        });
        $("#bid-submit").button().click(
            function(){
                bidSubmit();
            }
        );
        $( "#new-player-chk").removeAttr("checked");

        
        $("#login-submit" ).button().removeClass("ui-button-disabled").click(function(event){
            //$("#login-tab").removeClass("visible");
            // get user info
            // get defaults
            
            $.users.login(this);
            event.cancelBubble=true;
            event.preventDefault();
            event.returnValue=false;

        });
        /* game defaults */
        var iLimit=20;
        $( "#num-players" ).spinner({
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "#num-rounds" ).spinner({
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });

        $( "#endowment" ).spinner({
            step: 0.01,
            numberFormat: "n",
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1.0 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "#multiplier" ).spinner({
            step: 0.01,
            numberFormat: "n",
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1.0 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "#highest-donation" ).spinner({
            step: 0.01,
            numberFormat: "C",
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "#lowest-donation" ).spinner({
            step: 0.01,
            numberFormat: "C",            
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "#donation-increment" ).spinner({
            step: 0.01,
            numberFormat: "C",            
            spin: function( event, ui ) {
            if ( ui.value > iLimit ) {
            $( this ).spinner( "value", 1 );
            return false;
            } else if ( ui.value < 1 ) {
            $( this ).spinner( "value", iLimit );
            return false;
            }
            }
        });
        $( "select#select-game" ).selectmenu({
            change: function(event) {
                gamePopulateControls(this);
                event.cancelBubble;
            }
        });
        $( "#outcomes-view" ).selectmenu();
        $( "#outcomes-view-num").selectmenu();
        $("#punitive-bid").selectmenu();
        $("#bid-direction").selectmenu();
        $("#create-game").button().click(
            function(){
                gameCreateAndUpdate("create-game");
            }
        );
        $("#update-game").button().click(
            function(){
                gameCreateAndUpdate("update-game");
            }
        );
        $("#update-default-game").button().click(
            function(){
                gameCreateAndUpdate("update-default-game");
            }
        );
        /*
        var spinner = $( "#num-players" ).spinner();
        $( "#disable" ).click(function() {
        if ( spinner.spinner( "option", "disabled" ) ) {
        spinner.spinner( "enable" );
        } else {
        spinner.spinner( "disable" );
        }
        });
        $( "#destroy" ).click(function() {
        if ( spinner.spinner( "instance" ) ) {
        spinner.spinner( "destroy" );
        } else {
        spinner.spinner();
        }
        });
        $( "#getvalue" ).click(function() {
        alert( spinner.spinner( "value" ) );
        });
        $( "#setvalue" ).click(function() {
        spinner.spinner( "value", 5 );
        });
        */
}

currentTab=function(psTab){
    var iReturn=$(psTab).tabs('option', 'active');  
    return iReturn;
}

getAttribs=function(e){}
getGames = function(e){}
getData = function(e){

    var iCurrentTab=currentTab(TAB_CONTAINER);

    updateControls(e);
    //Only update data for visible tab and main tab
    //No need to do lots of lookups if only editing main table data
    
    if (iCurrentTab==TAB_ATTRIBS){

        getAttribs(e);
    }
    if (iCurrentTab==TAB_GAMES){
        getGames(e);
    }

    var s=document.getElementById("username").value;
    s=s.substring(0,20)+"";

    $('#main-tabs ul:first li:eq(0) a').text("Name: "+s);

    mbCancelEvent=false;
}
updateControls = function(e){}
