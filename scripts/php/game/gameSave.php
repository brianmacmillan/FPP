<?php
		print("games default save");

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
		if($sTarget=="game-create"){
			$SQL = "INSERT INTO game (game_id, system_id, game_description,num_players, num_rounds, endowment, multiplier, lowest_donation, highest_donation, donation_increment, outcome_view,punitive_bid)";
			$SQL .= "VALUES (".$iGameID.",".$SYSTEM_ID.",'".$sGameDescription."',".$iNumPlayers.",".$iNumRounds.",".$fEndowment.",".$fMultiplier.",".$fLowestDonation.",".$fHighestDonation.",".$fDonationIncrement . "," . $iOutcomeView . "," . $iPunitiveBid .")";
		} else if ($sTarget=="game-default"){
			$SQL = "UPDATE game_default SET num_players = $iNumPlayers, num_rounds=$iNumRounds, endowment=$fEndowment, multiplier=$fMultiplier, lowest_donation=$fLowestDonation, highest_donation=$fHighestDonation, donation_increment=$fDonationIncrement, outcome_view = $iOutcomeView, punitive_bid = $iPunitiveBid WHERE game_default_id = $iGameDefaultID";
		}

		// print("SQL is " . $SQL);						
		
		$mysqli = new mysqli("localhost", "admin", "admin", "pgg");

		if ($mysqli->connect_errno) {
		    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
		}

		if ($mysqli->query($SQL)) {
		    printf("Insert successful.\n");
		}

		$mysqli->close();

?>