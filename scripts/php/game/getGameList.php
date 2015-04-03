<?php
	try
	{
		//Asbolute path because this file is loaded at root by index.php
		include_once("/scripts/php/config/config_db.php");  // login information - connectivity and message constants.
		include_once("/scripts/php/clsDatabase.php");  // wrapper for database connectivity

		//include_once("../config/config_db.php");  // login information - connectivity and message constants.
		//include_once("../clsDatabase.php");  // wrapper for database connectivity

		$_SESSION['host']=$HOST;
		$_SESSION['username']=$USERNAME;
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		$iRowLimit = 10;

		if (isset($_REQUEST["row_limit"])){$iRowLimit=$_REQUEST["row_limit"];}
		

		$dbConnect = new DatabaseAPI();

		$iGameDefaultID = 1;

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);

		$SQL = "SELECT 
		game_id, game_description, num_players, num_rounds, endowment, multiplier, 
		lowest_donation, highest_donation, donation_increment, outcome_view, punitive_bid
		FROM game ORDER BY game_id LIMIT $iRowLimit";


		$result = mysqli_query($dbConnect->DBLINK,$SQL); 

		if ($result){
			echo("<option num-players='' num-rounds='' endowment='' multiplier='' lowest-donation='' highest-donation='' donation-increment='' outcome-view='' punitive-bid='' value='0'>Default Game</option>");	
		    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
		    { 
				echo("<option num-players='".$row['num_players']."' num-rounds='".$row['num_rounds']."' endowment='".$row['endowment']."' multiplier='".$row['multiplier']."' lowest-donation='".$row['lowest_donation']."' highest-donation='".$row['highest_donation']."' donation-increment='".$row['donation_increment']."' outcome-view='".$row['outcome_view']."' punitive-bid='".$row['punitive_bid']."' value='".$row['game_id']."'>".$row['game_description']."</option>");	
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
		print("Error in getGameList.php $err");
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