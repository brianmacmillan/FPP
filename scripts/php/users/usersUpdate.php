<?php
	# There is a need to separate the SQL from the functionality
	# Note - capitalized variables function like constants and are imported from config_*.php files
	#        lower case variables function like regular variables

	// Test for ip information. Need to secure the site.
	#http://localhost:8888/brianmacmillan.net/php/logintest.php
	try
	{
		$ERROR_MISSING_ARGUMENTS = "1,USERS UPDATE ERROR: required arguments were not supplied to the usersUpdate.php script.";
		$USERS_UPDATE_SUCCESS = "0,USERS UPDATE SUCCESS";
		include("config_db.php");  // login information - connectivity and message constants.
		include("config_actions.php"); //action constants; used in logging.
		include("clsDatabase.php");  // wrapper for database connectivity

		// Check if arguments were passed to this routine. 
		if (count($_GET)==0)
		{
			print($ERROR_MISSING_ARGUMENTS);
			return;
		}
		$iUserKey=$_GET["user_key"];
		$sEmail=$_GET["email"];
		$sCity=$_GET["city"];
		$sFirstName=$_GET["first_name"];
		$sLastName=$_GET["last_name"];
		$sPassword=$_GET["password"];
/*
		login_name,
		middle_name,
		postal_code,
		userid_is_email_flag,
		email,
*/

		$_SESSION['host']=$HOST; #"localhost";
		$_SESSION['username']=$USERNAME; #'bmacmill';
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

/*
		show_navigation_arrows_flag, 
		wide_text_columns_flag,
		show_footer_flag,
		show_help_flag,
		show_comments_flag,
		show_preferences_flag,
		show_ratings_flag,
		show_editor_flag 
*/

		#print($SELECT_PREFERENCES);
		$iSystemKey = $SYSTEM_KEY; 
		
		$USERS_UPDATE = "call sp_users_update(".$iSystemKey.",".$iUserKey.",'".$sEmail."','" .$sCity."','".$sFirstName."','".$sLastName."','".$sPassword."')";
		
		$dbConnect = new DatabaseAPI();

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);


		if ($dbResult)
		{
			print($LOGIN_ERROR_NO_DATABASE_CONNECTION);
			return;
		}


		$sResult = $dbConnect->iInsertUpdate($USERS_UPDATE);	

		#Read from preferences table or insert defaults.

		// Get user preferences
		// Does the user has a row in the bm_user_preferences table?
		#print($PREFERENCES_UPDATE);

#		$sResult = $dbConnect->iInsertUpdate($PREFERENCES_UPDATE);

		#Successful login, return preferences
		$sReturn = $USERS_UPDATE_SUCCESS . " " . $sResult;
		print($sReturn);
		$dbResult = $dbConnect->iCloseConnection();
		return;
	} catch (Exception $err)
	{
		print("Error in preferencesUpdate.php $err");
	}
?>