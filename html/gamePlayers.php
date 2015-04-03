<?php
/**
* @return bool
*/
/*function is_session_started()
{
    if ( php_sapi_name() !== 'cli' ) {
        if ( version_compare(phpversion(), '5.4.0', '>=') ) {
            return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
        } else {
            return session_id() === '' ? FALSE : TRUE;
        }
    }
    return FALSE;
}
*/
// Example
if (session_status() == PHP_SESSION_ACTIVE){print("already active");return;}
//print("starting gamePlayers.php");
session_start();

//if ( is_session_started() === FALSE ) {session_start();print("starting session");} else {print("already loaded");return;};
?>
<html>
<head>
	<script src="../scripts/js/jquery/jquery-1.7.2.min.js" type="text/javascript"></script>
	
	<script src="../scripts/js/jquery/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
	

	<script id="jquery-mobile"></script>
<!--
    <script src="../scripts/js/jquery.emulatedisabled.js" type="text/javascript"></script>
-->
	<script src="../scripts/js/jquery.picklists.js" type="text/javascript"></script>
    <script src="../scripts/js/popup-iframe-player.js" id="map-script"></script>
   	<link rel="stylesheet" href="../interface/css/jquery.mobile-1.4.5.min.css">

</head>
<style>
	#players-tab select{width:90%;margin:5px auto;}
</style>
<body>
	<div id="game-players">
		<div id="players-tab" class="page">
			<div id="exTwo" class="picklist-container">
				<label></label>
				<select id="player" name="player" multiple="multiple">
					<?php include("../scripts/php/player/getPlayerList.php"); ?>
				</select>
			</div>
<!-- 			<div>
    			<a href="#popupNewPlayer" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Add/Edit Player</a>
    			<div data-role="popup" id="popupNewPlayer" data-overlay-theme="a" data-theme="a" data-corners="false" data-tolerance="15,15">
    				<a href="#" data-rel="back" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
    				<iframe src="" width="480" height="320" seamless=""></iframe>
    			</div>
    		</div> -->

			<button class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Update Game</button>
			<button class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Invite New Players</button>

		</div>
	</div>
</body>
<script>
	var first=false;
	$(document).ready(function(){
	    //$("button").button();
	    console.log("beginning of doc ready for gamePlayers.php");
		$(function()
		{
		    $("#player").pickList(
		    {
		        sourceListLabel:    "Unadded",
		        targetListLabel:    "Added",
		        addAllLabel:        "Add All",
		        addLabel:           "Add",
		        removeAllLabel:     "Remove All",
		        removeLabel:        "Remove",
		        sortAttribute:      "value",
		        items:
		        [
		            {
		                value: 6,
		                label: "Afterwards #1",
		                selected: false
		            }
		        ]
		    });
			$("#b_to_player").addClass("ui-btn").addClass("ui-corner-all").addClass("ui-shadow").addClass("ui-btn-inline");
			$("#b_from_player").addClass("ui-btn").addClass("ui-corner-all").addClass("ui-shadow").addClass("ui-btn-inline");
			//alert($("#b_to_player").size());
			//$("button").button();
		});
		//attach jquery mobile after picklist initialized
		//$("#jquery-mobile").attr("src","../scripts/js/jquery.mobile-1.4.5.min.js");
		
		console.log("end of doc ready for gamePlayers.php");
	});
</script>
</html>