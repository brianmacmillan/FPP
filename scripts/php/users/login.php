<?php
	# There is a need to separate the SQL from the functionality
	# Note - capitalized variables function like constants and are imported from config_*.php files
	#        lower case variables function like regular variables

	// Test for ip information. Need to secure the site.
	#http://localhost:8888/brianmacmillan.net/php/logintest.php
	#example: php/login.php?user_name=bmacmill&password=nevsky&new_user=true
	try
	{
			
		include("../config/config_db.php");  // login information - connectivity and message constants.
		include("../config/config_actions.php"); //action constants; used in logging.
		include("../clsDatabase.php");  // wrapper for database connectivity

		$sReturn="";


		$iSystemId = $SYSTEM_ID; //from config_db
		$sUserName="guest";
		$sPassword="guest";
		$iUserId=0;
		$iAdmin=0; // admin rights 0 = guest, 1 = experimenter, 2 = sysadmin
		$sNewUser="false";
		$sAlias="";
		$sEmail="";
		$sUserNameIsEmailAddress="N";
		$bNewUser=false;

		$DEBUG_LEVEL=2;
		if ($DEBUG_LEVEL==1){
			print("in login line 43");
		}
		if (isset($_REQUEST['new_user'])){$sNewUser=$_REQUEST["new_user"];}
		if (isset($_REQUEST["user_id"])){$iUserId=$_REQUEST["user_id"];}
		if (isset($_REQUEST["user_name"])){$sUserName=$_REQUEST["user_name"];}

		if (isset($_REQUEST["user_name_is_email_address"])){$sUserNameIsEmailAddress=$_REQUEST["user_name_is_email_address"];}

		if (isset($_REQUEST["password"])){$sPassword=$_REQUEST["password"];}
		if (isset($_REQUEST["alias"])){$sAlias=$_REQUEST["alias"];}
		if (isset($_REQUEST["email"])){$sEmail=$_REQUEST["email"];}

		if ($DEBUG_LEVEL==1){
			print("login.php line 59 - new user ".$sNewUser);
		}
		// Check if arguments were passed to this routine. 
		if (count($_REQUEST)==0)
		{
			//print($LOGIN_ERROR_MISSING_ARGUMENTS);
			header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage

			$data = $dom->createElement('data');
			$dom->appendChild($data);
			$errorCode = $dom->createElement('error_code');
			$errorCodeText = $dom->createTextNode($LOGIN_ERROR_MISSING_ARGUMENTS_CODE);
			$errorCode->appendChild($errorCodeText);
				 
			$errorMessage = $dom->createElement('error_message');
			$errorMessageText = $dom->createTextNode($LOGIN_ERROR_MISSING_ARGUMENTS);
			$errorMessage->appendChild($errorMessageText);
				 				 
			$returnXML = $dom->createElement('returnXML');
			$returnXML->appendChild($errorCode);
			$returnXML->appendChild($errorMessage);
				 
			$data->appendChild($returnXML);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
			return;
		}

		
		$_SESSION['host']=$HOST; #"localhost";
		$_SESSION['username']=$USERNAME; #'bmacmill';
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		
		$PREFERENCES_SELECT = "SELECT 
			last_game_id, select_row
		 FROM 
			bm_user_preferences 
		WHERE 
			user_id='". $iUserId . "'";

		#print($SELECT_PREFERENCES);

		$dbConnect = new DatabaseAPI();

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
		if ($dbResult)
		{
			//print($LOGIN_ERROR_NO_DATABASE_CONNECTION);
			header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage
			$data = $dom->createElement('data');
			$dom->appendChild($data);

			$errorCode = $dom->createElement('error_code');
			$errorCodeText = $dom->createTextNode($LOGIN_ERROR_NO_DATABASE_CONNECTION_CODE);
			$errorCode->appendChild($errorCodeText);
				 
			$errorMessage = $dom->createElement('error_message');
			$errorMessageText = $dom->createTextNode($LOGIN_ERROR_NO_DATABASE_CONNECTION);
			$errorMessage->appendChild($errorMessageText);
				 				 
			$returnXML = $dom->createElement('returnXML');
			$returnXML->appendChild($errorCode);
			$returnXML->appendChild($errorMessage);
				 
			$data->appendChild($returnXML);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
			return;
		}
		$USERS_SELECT = "SELECT user_id, admin FROM user WHERE system_id = ".$iSystemId. " AND user_name = '".$sUserName ."' AND password='". $sPassword."'";
		
		if ($DEBUG_LEVEL==1){
			print("login.php line 134 - logging in with sql-".$USERS_SELECT);
		}
		$result = mysqli_query($dbConnect->DBLINK,$USERS_SELECT,MYSQLI_USE_RESULT); 
		if ($result){

		    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
		    { 
		        $iUserId = $row['user_id']; 
		        $iAdmin = $row['admin'];
		    }
			$_SESSION['user_id'] = $iUserId;
			$_SESSION['admin'] = $iAdmin;
			$_SESSION['row_limit'] = 10;  // To be read from user_preferences table
			
			// Free the query result
			mysqli_free_result($result);
		}
		if ($DEBUG_LEVEL==1){
			print("line 152 iUserId " . $iUserId . "admin ". $iAdmin);
		}

		//print("user key is ".$iUserId." ".$user_id_SELECT);
		# A new user is trying to use the login of an existing user
		# OR an existing user is trying to log in as a new user
		# An interesting bit of error handling would be to verify IP addresses for
		# the current login under a user name and the last login for that user name.
		# I couldn't do that for a commercial site from a security perspective
		# but for my story site, where things are not
		# commercial, it might be a nice way to rectify a user error.

		#User has flagged him/herself as a new user but logged in correctly
		if ($iUserId > 0 && $sNewUser == "true") 
		{
			//print($LOGIN_ERROR_USER_NAME_ALREADY_EXISTS);
			$dbResult = $dbConnect->iCloseConnection();

	 		header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage
			$data = $dom->createElement('data');
			$dom->appendChild($data);
		
			$errorCodeText = $dom->createTextNode($$LOGIN_ERROR_USER_NAME_ALREADY_EXISTS_CODE);
			$errorCode->appendChild($errorCodeText);
				 
			$errorMessage = $dom->createElement('error_message');
			$errorMessageText = $dom->createTextNode($LOGIN_ERROR_USER_NAME_ALREADY_EXISTS);
			$errorMessage->appendChild($errorMessageText);
				 				 
			$returnXML = $dom->createElement('returnXML');
			$returnXML->appendChild($errorCode);
			$returnXML->appendChild($errorMessage);
				 
			$data->appendChild($returnXML);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
			return;
		}
		#New user false and no row found in user table for password / username combination
		if ($iUserId == 0 && $sNewUser == "false") 
		{
			if ($DEBUG_LEVEL>2){
				print("line 191 login successful \n");
			}
			$dbResult = $dbConnect->iCloseConnection();
	 		header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage
			$data = $dom->createElement('data');
			$dom->appendChild($data);

			$errorCode = $dom->createElement('error_code');
			$errorCodeText = $dom->createTextNode($LOGIN_ERROR_INVALID_USERNAME_PASSWORD_CODE);
			$errorCode->appendChild($errorCodeText);

			if ($DEBUG_LEVEL==1){
				print("line 200 \n");
			}
				 
			$errorMessage = $dom->createElement('error_message');
			$errorMessageText = $dom->createTextNode($LOGIN_ERROR_INVALID_USERNAME_PASSWORD);
			$errorMessage->appendChild($errorMessageText);
				 				 
			//$returnXML = $dom->createElement('returnXML');
			$data->appendChild($errorCode);
			$data->appendChild($errorMessage);

			if ($DEBUG_LEVEL>2){
				print("line 212 \n");
			}
				 
			//$data->appendChild($returnXML);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;

			return;
		}
		#New user
		if ($iUserId == 0 && $sNewUser == "true") 
		{
			
			$USERS_INSERT = "INSERT INTO user (system_id,user_name,password,alias,email) VALUES (".$iSystemId.",'". $sUserName."','".$sPassword . "','".$sAlias . "','".$sEmail ."')";
			$dbResult = mysqli_query($dbConnect->DBLINK,$USERS_INSERT); 

			# INSERT row into users table
			//$dbResult = $dbConnect->iExecute($USERS_INSERT);	
			//$iUserId=0;
			$result = mysqli_query($dbConnect->DBLINK,$USERS_SELECT); 

			//NB Should only be one row
			if ($result){
				
			    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
			    { 
			        $iUserId = $row['user_id']; 
			        $iAdmin = $row['admin'];
			        //if ($DEBUG_LEVEL>0){print("line 234 admin = ".$iAdmin."\n");}
			    }
				// Free the query result
				mysqli_free_result($result);
			}
			//print("new user key".$iUserId);

			$bUserPreferences = false;
			if ($bUserPreferences){
				$PREFERENCES_INSERT = "INSERT INTO user_preferences (system_id,user_id,user_name) VALUES (".$iSystemId.",". $iUserId.",'". $_GET["user_name"] . "')";
				$dbResult = $dbConnect->iExecute($PREFERENCES_INSERT);	
			}
		}
		#Existing user has successfully logged in
		if ($iUserId > 0 && $sNewUser == "false") { 
			// login success
		}
		#Successful login, return preferences
		#To do
		$bGetPreferences=false;
		if ($bGetPreferences){
			$GET_PREFERENCES = "call sp_user_preferences_get(".$iSystemId.",".$iUserId.",'".$sUserName."')";
			$sPreferences = getData($GET_PREFERENCES,$dbConnect);	
			$sReturn = $LOGIN_SUCCESS . "," . $iUserId.",".$sPreferences;
		} else {
			//  $sReturn = $LOGIN_SUCCESS . "," . $iUserId;
	 		header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage
		
			$data = $dom->createElement('data');
			$dom->appendChild($data);

			$id = $dom->createElement('id');
			$idText = $dom->createTextNode($iUserId);
			$id->appendChild($idText);

			$admin = $dom->createElement('admin');
			$adminValue = $dom->createTextNode($iAdmin);
			$admin->appendChild($adminValue);
				 
			$errorCode = $dom->createElement('error_code');
			$errorCodeText = $dom->createTextNode($LOGIN_SUCCESS_CODE);
			$errorCode->appendChild($errorCodeText);

			$errorMessage = $dom->createElement('error_message');
			$errorMessageText = $dom->createTextNode($LOGIN_SUCCESS);
			$errorMessage->appendChild($errorMessageText);

			//$returnXML = $dom->createElement('returnXML');
			$data->appendChild($id);
			$data->appendChild($admin);
			$data->appendChild($errorCode);
			$data->appendChild($errorMessage);

			//$data->appendChild($returnXML);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
		}
		//print("succesful login ".$xmlString);

		#$iUserId = $dbConnect->getUserKey($user_id_SELECT);
		#print($iUserId.",".$sReturn);			
		//print($sReturn);

		# Log the visit
		$dbResult = $dbConnect->iCloseConnection();
		logEvent($dbConnect,$iUserId,$sUserName,0,"Successful Login");
		return;
	} catch (Exception $err)
	{
		print("Error in login.php $err");
	}
	function logEvent($pdbConnect,$piUserId,$psUserName,$piActionCode,$psAction){

		$remote_addr="";
		$http_host="";
		$http_x_forwarded="";
		$http_x_coming_from="";
		$http_via="";

		if (isset($_SERVER['REMOTE_ADDR'])){$remote_addr = $_SERVER['REMOTE_ADDR'];}
		if (isset($_SERVER['HTTP_HOST'])){$http_host = $_SERVER['HTTP_HOST'];}	
		if (isset($_SERVER['HTTP_X_FORWARDED'])){$http_x_forwarded = $_SERVER['HTTP_X_FORWARDED'];}
		if (isset($_SERVER['HTTP_X_COMING_FROM'])){$http_x_comming_from = $_SERVER['HTTP_X_COMING_FROM'];}
		if (isset($_SERVER['HTTP_VIA'])){$http_via = $_SERVER['HTTP_VIA'];}

		$dbResult = $pdbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
    		

		$USER_LOG_INSERT = "INSERT INTO log (user_id,user_name,action_id,action_description,remote_addr,http_host,http_x_forwarded,http_x_coming_from, http_via)";
		$USER_LOG_INSERT .= "VALUES (".$piUserId.",'".$psUserName."',".$piActionCode.",'".$psAction."','$remote_addr','$http_host',";
		$USER_LOG_INSERT .= "'$http_x_forwarded','$http_x_coming_from','$http_via')";

		$dbResult = $pdbConnect->iExecute($USER_LOG_INSERT);		
		$dbResult = $pdbConnect->iCloseConnection();
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
				$sReturn .= "<div id='id' class='$bEvenOdd row'><span class='one user-key'>".$row['user_id']."</span>";
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
				$sReturn .= "<span class='nine login-name-is-email-address'>".$row['user_name_is_emaiL_address']."</span>";
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