<?php
	# There is a need to separate the SQL from the functionality
	# Note - capitalized variables function like constants and are imported from config_*.php files
	#        lower case variables function like regular variables

	// Test for ip information. Need to secure the site.
	#http://localhost:8888/brianmacmillan.net/php/logintest.php
	#example: php/login.php?login_name=bmacmill&password=nevsky&new_user=true
	try
	{
		include("../config/config_db.php");  // login information - connectivity and message constants.
		include("../config/config_actions.php"); //action constants; used in logging.
		include("../clsDatabase.php");  // wrapper for database connectivity

		$remote_addr="";
		$http_host="";
		$http_x_forwarded="";
		$http_x_coming_from="";
		$http_via="";
		$sReturn="";

		$iSystemKey = $SYSTEM_KEY; //from config_db
		$sLoginName="system";
		$sPassword="system";
		$iUserKey=0;
		$sNewUser="false";
		$sAlias="";
		$sEmail="";
		$sLoginNameIsEmailAddress="N";
		$bNewUser=false;

		//print("in login");
		if (isset($_SERVER['REMOTE_ADDR'])){$remote_addr = $_SERVER['REMOTE_ADDR'];}
		if (isset($_SERVER['HTTP_HOST'])){$http_host = $_SERVER['HTTP_HOST'];}	
		if (isset($_SERVER['HTTP_X_FORWARDED'])){$http_x_forwarded = $_SERVER['HTTP_X_FORWARDED'];}
		if (isset($_SERVER['HTTP_X_COMING_FROM'])){$http_x_comming_from = $_SERVER['HTTP_X_COMING_FROM'];}
		if (isset($_SERVER['HTTP_VIA'])){$http_via = $_SERVER['HTTP_VIA'];}

		if (isset($_GET['new_user'])){$sNewUser=$_GET["new_user"];}
		if (isset($_GET["user_key"])){$iUserKey=$_GET["user_key"];}
		if (isset($_GET["login_name"])){$sLoginName=$_GET["login_name"];}

		if (isset($_GET["login_name_is_email_address"])){$sLoginNameIsEmailAddress=$_GET["login_name_is_email_address"];}

		if (isset($_GET["password"])){$sPassword=$_GET["password"];}
		if (isset($_GET["alias"])){$sAlias=$_GET["alias"];}
		if (isset($_GET["email"])){$sEmail=$_GET["email"];}


		//print("still in login.php; new user ".$new_user);
		// Check if arguments were passed to this routine. 
		if (count($_GET)==0)
		{
			print($LOGIN_ERROR_MISSING_ARGUMENTS);
			return;
		}

		
		$_SESSION['host']=$HOST; #"localhost";
		$_SESSION['username']=$USERNAME; #'bmacmill';
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		
	//	print("logging in with sql-".$USERS_SELECT);

/*
		$PREFERENCES_SELECT = "
		SELECT 
			show_navigation_arrows_flag, 
			wide_text_columns_flag,
			show_footer_flag,
			show_help_flag,
			show_comments_flag,
			show_preferences_flag,
			show_ratings_flag,
			show_editor_flag 
		 FROM 
			bm_user_preferences 
		WHERE 
			login_name='". $_GET["login_name"] . "'";
*/
		#print($SELECT_PREFERENCES);

		$dbConnect = new DatabaseAPI();

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
		if ($dbResult)
		{
			print($LOGIN_ERROR_NO_DATABASE_CONNECTION);
			return;
		}
		$USER_KEY_SELECT = "SELECT user_key FROM bm_users WHERE system_key = ".$iSystemKey. " AND login_name = '".$sLoginName ."' AND password='". $sPassword."'";
		$result = mysqli_query($dbConnect->DBLINK,$USER_KEY_SELECT,MYSQLI_USE_RESULT); 
		if ($result){

		    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
		    { 
		        $iUserKey = $row['user_key']; 
		    }
			// Free the query result
			mysqli_free_result($result);
		}

		//print("iuserkey ".$USER_KEY_SELECT." ".$iUserKey);


		//print($USERS_INSERT);


		//print("user key is ".$iUserKey." ".$USER_KEY_SELECT);
		# A new user is trying to use the login of an existing user
		# OR an existing user is trying to log in as a new user
		# An interesting bit of error handling would be to verify IP addresses for
		# the current login under a user name and the last login for that user name.
		# I couldn't do that for a commercial site from a security perspective
		# but for my story site, where things are not
		# commercial, it might be a nice way to rectify a user error.

		if ($iUserKey > 0 && $sNewUser == "true") 
		{
			print($LOGIN_ERROR_USER_NAME_ALREADY_EXISTS);
			$dbResult = $dbConnect->iCloseConnection();
			return;
		}
		#New user false and no row found in user table
		if ($iUserKey == 0 && $sNewUser == "false") 
		{
			print($LOGIN_ERROR_INVALID_USERNAME_PASSWORD);
			$dbResult = $dbConnect->iCloseConnection();
			return;
		}
		#New user
		if ($iUserKey == 0 && $sNewUser == "true") 
		{
			
			$USERS_INSERT = "INSERT INTO bm_users (system_key,login_name,password,alias,email,login_name_is_email_address) VALUES (".$iSystemKey.",'". $sLoginName."','".$sPassword . "','".$sAlias . "','".$sEmail . "','". $sLoginNameIsEmailAddress."')";
			$dbResult = mysqli_query($dbConnect->DBLINK,$USERS_INSERT); 

			# INSERT row into users table
			//$dbResult = $dbConnect->iExecute($USERS_INSERT);	
			//$iUserKey=0;
			$result = mysqli_query($dbConnect->DBLINK,$USER_KEY_SELECT); 

			//NB Should only be one row
			if ($result){

			    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
			    { 
			        $iUserKey = $row['user_key']; 
			    }
				// Free the query result
				mysqli_free_result($result);
			}
			//print("new user key".$iUserKey);

			$PREFERENCES_INSERT = "INSERT INTO bm_user_preferences (system_key,user_key,login_name) VALUES (".$iSystemKey.",". $iUserKey.",'". $_GET["login_name"] . "')";
			$dbResult = $dbConnect->iExecute($PREFERENCES_INSERT);	
		}
		#Existing user has successfully logged in
		if ($iUserKey > 0 && $sNewUser == "false") { 
			//
		}
		
		$GET_PREFERENCES = "call sp_user_preferences_get(".$iSystemKey.",".$iUserKey.",'".$sLoginName."')";
		
		//print($GET_PREFERENCES);
		
		$sPreferences = getData($GET_PREFERENCES,$dbConnect);	
		//print("preferences are ".$sPreferences);

		#Successful login, return preferences
		$sReturn = $LOGIN_SUCCESS . "," . $iUserKey.",".$sPreferences;

		#$iUserKey = $dbConnect->getUserKey($USER_KEY_SELECT);
		#print($iUserKey.",".$sReturn);			
		//print($sReturn);
		# Log the visit
		$dbResult = $dbConnect->iCloseConnection();
		$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
    	
		$USER_LOG_INSERT = "INSERT INTO bm_user_logs (user_key,login_name,remote_addr,http_host,http_x_forwarded,http_x_coming_from, http_via,action_key)";
		$USER_LOG_INSERT .= "VALUES (".$iUserKey.",'".$sLoginName."','$remote_addr','$http_host',";
		$USER_LOG_INSERT .= "'$http_x_forwarded','$http_x_coming_from','$http_via',$ACTION_LOGIN)";

		$dbResult = $dbConnect->iExecute($USER_LOG_INSERT);
		
		$dbResult = $dbConnect->iCloseConnection();
		print($sReturn);
		return;
	} catch (Exception $err)
	{
		print("Error in login.php $err");
	}
	function getData($pQuery,$pdbConnect)
	{
		try
		{
		    $result = mysqli_query($pdbConnect->DBLINK,$pQuery);
			$sReturn="";
			$iCounter=0;
			$bReturnHtml = true;
			$bFirstTime = true;
			$bEvenOdd = 'odd';
			if (!$result){return $sReturn;}
		    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC))
			{
				if (($iCounter % 2)==0){$bEvenOdd="even";} else{$bEvenOdd="odd";}
/* fields available but not used
					show_header,
					show_menus,
					show_footer,
					show_comments,
					show_help,
					show_editor,
					show_preferences,
					show_ratings,
					show_navigation_controls,

					$sReturn .= $row['show_navigation_arrows'] .",". $row['show_footer'].",";
					$sReturn .= $row['show_help']."," . $row['show_comments'].",";
					$sReturn .= $row['show_preferences']."," . $row['show_ratings'] ."," . $row['show_editor'] ."," ;					
*/
				if ($bFirstTime)
				{
					$sReturn="<div id='preferences-results' class='lookup-list invisible'>";$bFirstTime=false;
				};
				$sReturn .= "<div id='id' class='$bEvenOdd row'><span class='one user-key'>".$row['user_key']."</span>";
				$sReturn .= "<span class='two user-preference-key'>".$row['user_preference_key']."</span>";
				$sReturn .= "<span class='three show-query-results'>".$row['show_query_results']."</span>";
				$sReturn .= "<span class='four show-data-change-messages'>".$row['show_data_change_messages']."</span>";
				$sReturn .= "<span class='five hide-add-delete-warnings'>".$row['hide_add_delete_warnings']."</span>";
				$sReturn .= "<span class='six show-query-parameters'>".$row['show_query_parameters']."</span>";
				$sReturn .= "<span class='six show-editor'>".$row['show_editor']."</span>";
				$sReturn .= "<span class='seven show-ratings'>".$row['show_ratings']."</span>";
				$sReturn .= "<span class='nine display-mode'>".$row['display_mode']."</span>";
				$sReturn .= "<span class='nine alias'>".$row['alias']."</span>";
				$sReturn .= "<span class='nine email'>".$row['email']."</span>";
				$sReturn .= "<span class='nine email-verified'>".$row['email_verified']."</span>";
				$sReturn .= "<span class='nine login-name-is-email-address'>".$row['login_name_is_emaiL_address']."</span>";
				$sReturn .= "</div>";
				$iCounter++;
		    }
			if ($iCounter>0 && $bReturnHtml){$sReturn.="</div>";};
			mysqli_free_result($result);
			return $sReturn;
		} catch(exception $err)
		{ 
			print($err);		
		}
	}
?>