<?php
		//print("games default save - create new game, edit meta data for existing game, create default game");

		$ERROR_MISSING_ARGUMENTS = "1,INSERT ERROR: required arguments were not supplied to the preferencesSave.php script.";
		$INSERT_SUCCESS = "0,INSERT SUCCESS";
		$INSERT_FAILURE = "1,INSERT FAILURE";
		$PRINT_MESSAGES = true;

		include("../config/config_db.php");  // login information - connectivity and message constants.
		include("../config/config_actions.php"); //action constants; used in logging.
		include("../clsDatabase.php");  // wrapper for database connectivity
		//NB Brian session handling needs work

		$_SESSION['host']=$HOST;
		$_SESSION['username']=$USERNAME;
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		// Check if arguments were passed to this routine. 
		if (count($_REQUEST)==0)
		{
			if ($PRINT_MESSAGES)
			{
				print($ERROR_MISSING_ARGUMENTS);
			}
			return;
		}


		$iGameDefaultID = 0;
		$iGameID = 0;
		$iUserID = 0;
		$iNumPlayers = 0;
		$iNumRounds = 0;
		$fEndowment = 0;
		$fMultiplier = 0.0;
		$fLowestDonation= 0.0;
		$fHighestDonation= 0.0;
		$fDonationIncrement = 0.0;
		$iOutcomeView = 0;
		$iPunitiveBid = 0;
		$sTarget="";
		$sGameDescription="";


		if (isset($_REQUEST["game_default_id"])){$iGameDefaultID=$_REQUEST["game_default_id"];}
		if (isset($_REQUEST["game_id"])){$iGameID=$_REQUEST["game_id"];}
		if (isset($_REQUEST["user_id"])){$iUserID=$_REQUEST["user_id"];}
		if (isset($_REQUEST["game_description"])){$sGameDescription=$_REQUEST["game_description"];}
		if (isset($_REQUEST["num_players"])){$iNumPlayers=$_REQUEST["num_players"];}
		if (isset($_REQUEST["num_rounds"])){$iNumRounds=$_REQUEST["num_rounds"];}
		if (isset($_REQUEST["endowment"])){$fEndowment=$_REQUEST["endowment"];}
		if (isset($_REQUEST["multiplier"])){$fMultiplier=$_REQUEST["multiplier"];}
		if (isset($_REQUEST["lowest_donation"])){$fLowestDonation=$_REQUEST["lowest_donation"];}
		if (isset($_REQUEST["highest_donation"])){$fHighestDonation=$_REQUEST["highest_donation"];}
		if (isset($_REQUEST["donation_increment"])){$fDonationIncrement=$_REQUEST["donation_increment"];}
		if (isset($_REQUEST["outcome_view"])){$iOutcomeView=$_REQUEST["outcome_view"];}
		if (isset($_REQUEST["punitive_bid"])){$iPunitiveBid=$_REQUEST["punitive_bid"];}
		
		if (isset($_REQUEST["target"])){$sTarget=$_REQUEST["target"];}

		// If game/preference id exists, update, otherwise insert
		if($sTarget=="create-game"){
			$SQL = "INSERT INTO game (system_id, game_description,num_players, num_rounds, endowment, multiplier, lowest_donation, highest_donation, donation_increment, outcome_view,punitive_bid)";
			$SQL .= "VALUES (".$SYSTEM_ID.",'".$sGameDescription."',".$iNumPlayers.",".$iNumRounds.",".$fEndowment.",".$fMultiplier.",".$fLowestDonation.",".$fHighestDonation.",".$fDonationIncrement . "," . $iOutcomeView . "," . $iPunitiveBid .")";
		} else if ($sTarget=="update-default-game") {
			$SQL = "UPDATE game_default SET num_players = $iNumPlayers, num_rounds=$iNumRounds, endowment=$fEndowment, multiplier=$fMultiplier, lowest_donation=$fLowestDonation, highest_donation=$fHighestDonation, donation_increment=$fDonationIncrement, outcome_view = $iOutcomeView, punitive_bid = $iPunitiveBid 
			WHERE game_default_id = $iGameDefaultID AND user_id = $iUserID";
		} else if($sTarget=="update-game")
		{
			$SQL = "UPDATE game SET game_description = '$sGameDescription', num_players = $iNumPlayers, num_rounds=$iNumRounds, endowment=$fEndowment, multiplier=$fMultiplier, lowest_donation=$fLowestDonation, highest_donation=$fHighestDonation, donation_increment=$fDonationIncrement, outcome_view = $iOutcomeView, punitive_bid = $iPunitiveBid WHERE game_id = $iGameID";
		}					
		
		$mysqli = new mysqli("localhost", "admin", "admin", "pgg");

		if ($mysqli->connect_errno) {
		    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
		}
		if ($mysqli->query($SQL)) {
		   //printf($sTarget ." successful.\n");
		}
		if ($sTarget=="create-game"){
			$iGameID =$mysqli->insert_id;
			header('Content-type: text/xml');
			$dom = new DOMDocument(); // xml which contains return mesage
		
			$data = $dom->createElement('data');
			$dom->appendChild($data);

			$gameId = $dom->createElement('game-id');
			$gameIdText = $dom->createTextNode($iGameID);
			$gameId->appendChild($gameIdText);

			$data->appendChild($gameId);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
			return;
		}
		$mysqli->close();
?>