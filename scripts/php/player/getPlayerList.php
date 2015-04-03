<?php
	try
	{
		//Asbolute path because this file is loaded at root by index.php
		include_once("../scripts/php/config/config_db.php");  // login information - connectivity and message constants.
		include_once("../scripts/php/clsDatabase.php");  // wrapper for database connectivity
		//include_once("/scripts/php/config/config_db.php");  // login information - connectivity and message constants.
		//include_once("/scripts/php/clsDatabase.php");  // wrapper for database connectivity
		//include_once("../config/config_db.php");  // login information - connectivity and message constants.
		//include_once("../clsDatabase.php");  // wrapper for database connectivity

		$_SESSION['host']=$HOST;
		$_SESSION['username']=$USERNAME;
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		$iRowLimit = 10;

		//if (isset($_REQUEST["row_limit"])){$iRowLimit=$_REQUEST["row_limit"];}
		
		if (isset($_SESSION["row_limit"])){$iRowLimit=$_SESSION["row_limit"];}
		if (isset($_SESSION["user_id"])){$iUserId=$_SESSION["user_id"];}
		$dbConnect = new DatabaseAPI();

		$iOwnerId = 1;

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);

		$SQL = "SELECT 
		game_id, user_id, owner_id, alias_id 
		FROM player WHERE owner_id = $iOwnerId ORDER BY creation_time DESC LIMIT $iRowLimit";

		//print($SQL);
		
		$result = mysqli_query($dbConnect->DBLINK,$SQL); 

		if ($result){
			//echo("<option>Default Game</option>");	
		    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
		    { 
				echo("<option user-id='".$row['user_id']."' owner-id='".$row['owner_id']."' game-id='".$row['game_id']. "'>".$row['alias_id']."</option>");	
		    }
			// Free the query result
			mysqli_free_result($result);
		} else {
		  	echo("<option value='0'>No Game</option>");
		}

		//$result = mysqli_query($dbConnect->DBLINK,$USERS_SELECT,MYSQLI_USE_RESULT); 

/*		if ($result=$mysqli->query($SQL)) {
			while ($row = $result->fetch_array(MYSQLI_ASSOC)){
					echo("<option value='".$row['game_id']."'>".$row['description']."</option>");	
			}
			$result->free();
		}		
*/	} catch (Exception $err)
	{
		print("Error in getPlayerList.php $err");
		/*
		header('Content-type: text/xml');
		$dom = new DOMDocument(); // xml which contains return mesage
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
		*/
	}
?>