<?php

	//example: call sp_user_preferences_update(1,0,'system','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y',1)
	try
	{
		$ERROR_MISSING_ARGUMENTS = "1,PREFERENCES UPDATE ERROR: required arguments were not supplied to the preferencesUpdate.php script.";
		$PREFERENCES_UPDATE_SUCCESS = "0,PREFERENCES UPDATE SUCCESS";
		$PREFERENCES_UPDATE_FAILURE = "1,PREFERENCES UPDATE FAILURE";
		include("./../config/config_db.php");  // login information - connectivity and message constants.
		include("./../clsDatabase.php");  // wrapper for database connectivity

		// Check if arguments were passed to this routine. 
		if (count($_GET)==0)
		{
			print($ERROR_MISSING_ARGUMENTS);
			return;
		}
		$iSystemKey = $SYSTEM_KEY; //from config_db
		$iUserKey=0;
		$sLoginName="system";
		$sShowHeader="Y";
		$sShowMenus="Y";
		$sShowFooter="Y";
		$sShowComments="Y";
		$sShowHelp="Y";
		$sShowEditor="Y";
		$sShowPreferences="Y";
		$sShowRatings="Y";
		$sShowNavigationControls="Y";
		$sShowQueryParameters="Y";
		$sShowQueryResults="Y";
		$sShowDataChangeMessages="Y";
		$sHideAddDeleteWarnings="Y";
		$sEmail="";
		$sAlias="";
		$sNewPassword="";
		$sLoginNameIsEmail="";
		$iDisplayMode=1;
		$sReturn="";

		if (isset($_GET["user_key"])){$iUserKey=$_GET["user_key"];}
		if (isset($_GET["login_name"])){$sLoginName=$_GET["login_name"];}
		if (isset($_GET["new_password"])){$sNewPassword=$_GET["new_password"];}
		if (isset($_GET["login_name_is_email"])){$sLoginNameIsEmail=$_GET["login_name_is_email"];}
		if (isset($_GET["alias"])){$sAlias=$_GET["alias"];}
		if (isset($_GET["email"])){$sEmail=$_GET["email"];}
		if (isset($_GET["show_header"])){$sShowHeader=$_GET["show_header"];}
		if (isset($_GET["show_menus"])){$sHowMenus=$_GET["show_menus"];}
		if (isset($_GET["show_footer"])){$sShowFooter=$_GET["show_footer"];}
		if (isset($_GET["show_comments"])){$sShowComments=$_GET["show_comments"];}
		if (isset($_GET["show_help"])){$sShowHelp=$_GET["show_help"];}
		if (isset($_GET["show_editor"])){$sShowEditor=$_GET["show_editor"];}
		if (isset($_GET["show_preferences"])){$sShowPreferences=$_GET["show_preferences"];}
		if (isset($_GET["show_ratings"])){$sShowRatings=$_GET["show_ratings"];}
		if (isset($_GET["show_navigation_controls"])){$sShowNavigationControls=$_GET["show_navigation_controls"];}
		if (isset($_GET["show_query_parameters"])){$sShowQueryParameters=$_GET["show_query_parameters"];}
		if (isset($_GET["show_query_results"])){$sShowQueryResults=$_GET["show_query_results"];}
		if (isset($_GET["show_data_change_messages"])){$sShowDataChangeMessages=$_GET["show_data_change_messages"];}
		if (isset($_GET["hide_add_delete_warnings"])){$sHideAddDeleteWarnings=$_GET["hide_add_delete_warnings"];}
		if (isset($_GET["display_mode"])){$iDisplayMode=$_GET["display_mode"];}

		$_SESSION['host']=$HOST; #"localhost";
		$_SESSION['username']=$USERNAME; #'bmacmill';
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		$PREFERENCES_UPDATE = "call sp_user_preferences_update(".$iSystemKey.",";
		$PREFERENCES_UPDATE .= $iUserKey.",'".$sLoginName."','".$sShowHeader."','".$sShowMenus."','";
		$PREFERENCES_UPDATE .= $sShowFooter."','".$sShowComments."','";
		$PREFERENCES_UPDATE .= $sShowHelp."','".$sShowEditor."','".$sShowPreferences."','".$sShowRatings."','".$sShowNavigationControls."','";
		$PREFERENCES_UPDATE .= $sShowQueryParameters."','".$sShowQueryResults."','";
		$PREFERENCES_UPDATE .= $sShowDataChangeMessages."','".$sHideAddDeleteWarnings."',".$iDisplayMode.")";

		//print($PREFERENCES_UPDATE);
		
		$dbConnect = new DatabaseAPI();

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);

		if ($dbResult)
		{
			print($LOGIN_ERROR_NO_DATABASE_CONNECTION);
			return;
		}

		$sResult = $dbConnect->iExecute($PREFERENCES_UPDATE);	
		$dbResult = $dbConnect->iCloseConnection();
		//To do - change password and update alias
		if ($sNewPassword>""){
	    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
			$USER_UPDATE = "UPDATE bm_users set password = '".$sNewPassword."' WHERE user_key = ".$iUserKey ." AND system_key =" . $iSystemKey;
			$sResult = $dbConnect->iExecute($USER_UPDATE);
			$dbResult = $dbConnect->iCloseConnection();
		}	
    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
		$USER_UPDATE = "UPDATE bm_users set alias = '".$sAlias."', email = '".$sEmail."' WHERE user_key = ".$iUserKey ." AND system_key =". $iSystemKey ;
		//print("user update ".$USER_UPDATE);
		$sResult = $dbConnect->iExecute($USER_UPDATE);	

		if ($sReturn>"")
		{
			$sReturn = $PREFERENCES_UPDATE_FAILURE . "," .$sResult;
		} else
		{
			$sReturn = $PREFERENCES_UPDATE_SUCCESS . "," . $sResult;
		}
		print($sReturn);
		$dbResult = $dbConnect->iCloseConnection();
		return;
	} catch (Exception $err)
	{
		print("Error in preferencesUpdate.php $err");
	}
?>