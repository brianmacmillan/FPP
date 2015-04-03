<?php
		print("start preferences insert");

		$ERROR_MISSING_ARGUMENTS = "1,INSERT ERROR: required arguments were not supplied to the preferencesSave.php script.";
		$INSERT_SUCCESS = "0,INSERT SUCCESS";
		$INSERT_FAILURE = "1,INSERT FAILURE";
		$PRINT_MESSAGES = true;

		include("./config_db.php");  // login information - connectivity and message constants.
		//include("config_actions.php"); //action constants; used in logging.
		//include("./clsDatabase.php");  // wrapper for database connectivity
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


		$iPreferencesID = 0;
		$iGameID = 0;
		$iRound = 0;
		$fEndowment = 0;
		$fMultiplierFactor = 0.0;
		$fLowestDonation= 0.0;
		$fHighestDonation= 0.0;


		if (isset($_REQUEST["preferencesID"])){$iPreferencesID=$_REQUEST["preferencesID"];}
		if (isset($_REQUEST["gameID"])){$iGameID=$_REQUEST["gameID"];}
		if (isset($_REQUEST["round"])){$iRound=$_REQUEST["round"];}
		if (isset($_REQUEST["endowment"])){$fEndowment=$_REQUEST["endowment"];}
		if (isset($_REQUEST["multiplierFactor"])){$fMultiplierFactor=$_REQUEST["multiplierFactor"];}
		if (isset($_REQUEST["lowestDonation"])){$fLowestDonation=$_REQUEST["lowestDonation"];}
		if (isset($_REQUEST["highestDonation"])){$fHighestDonation=$_REQUEST["highestDonation"];}

		
		// If game/preference id exists, update, otherwise insert

		$INSERT = "INSERT INTO preferences (preferencesID, gameID,round, endowment, multiplierFactor, lowestDonation, highestDonation)";
		$INSERT .= "VALUES (".$iPreferencesID.",".$iGameID.",".$iRound.",".$fEndowment.",".$fMultiplierFactor.",".$fLowestDonation.",".$fHighestDonation.")";

			
		print("SQL is " . $INSERT);						

		$mysqli = new mysqli("localhost", "admin", "admin", "pgg");

		if ($mysqli->connect_errno) {
		    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
		}

		if ($mysqli->query($INSERT)) {
		    printf("Insert successful.\n");
		}

		$mysqli->close();

?>