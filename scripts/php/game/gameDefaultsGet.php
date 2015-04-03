<?php
	try
	{
			
		include("../config/config_db.php");  // login information - connectivity and message constants.
		# include("../config/config_actions.php"); //action constants; used in logging.
		include("../clsDatabase.php");  // wrapper for database connectivity


		$_SESSION['host']=$HOST;
		$_SESSION['username']=$USERNAME;
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		$dbConnect = new DatabaseAPI();

		$iGameID = 1;

    	$dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
    	// echo $_SESSION['host'] . $_SESSION['username'] . $_SESSION['password'] . $_SESSION['dbName'];
		$SQL = "SELECT game_id,num_players, num_rounds, endowment, multiplier, lowest_donation, highest_donation, donation_increment, outcome_view, punitive_bid, game_description FROM game WHERE game_id = $iGameID";

		//print($SQL);

		//if ($dbResult) {
			$result = mysqli_query($dbConnect->DBLINK,$SQL,MYSQLI_USE_RESULT); 
			if ($result){

			    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
			    { 
					$iNumPlayers= $row['num_players'];
					$iNumRounds=$row['num_rounds'];
					$sGameDescription=$row['game_description'];
					$fEndowment=$row['endowment'];
					$fMultiplier=$row['multiplier'];
					$fLowestDonations=$row['lowest_donation'];
					$fHighestDonations=$row['highest_donation'];
					$fRangeIncrement=$row['donation_increment'];
					$iOutcomeView=$row['outcome_view'];
					$iPunitiveBid=$row['punitive_bid'];
					$sGameDescription=$row['game_description'];
			   }
				// Free the query result
				mysqli_free_result($result);
			}
			
			header('Content-type: text/xml');
				 
			$dom = new DOMDocument();
				 
			$data = $dom->createElement('data');
			$dom->appendChild($data);
			
			// Naming XML Tags	 
			$gameDescription = $dom->createElement('game_description');
			$gameDescriptionValue = $dom->createTextNode($sGameDescription);
			$gameDescription->appendChild($gameDescriptionValue);

			$numPlayers = $dom->createElement('num_players');
			$numPlayersValue = $dom->createTextNode($iNumPlayers);
			$numPlayers->appendChild($numPlayersValue);

			$numRounds = $dom->createElement('num_rounds');
			$numRoundsValue = $dom->createTextNode($iNumRounds);
			$numRounds->appendChild($numRoundsValue);

			$endowment = $dom->createElement('endowment');
			$endowmentValue = $dom->createTextNode($fEndowment);
			$endowment->appendChild($endowmentValue);

			$multiplier = $dom->createElement('multiplier');
			$multiplierValue = $dom->createTextNode($fMultiplier);
			$multiplier->appendChild($multiplierValue);
				 
			$lowest_donation = $dom->createElement('lowest_donation');
			$lowest_donationValue = $dom->createTextNode($fLowestDonations);
			$lowest_donation->appendChild($lowest_donationValue);
				 
			$highest_donation = $dom->createElement('highest_donation');
			$highest_donationValue = $dom->createTextNode($fHighestDonations);
			$highest_donation->appendChild($highest_donationValue);
				 
			$donation_increment = $dom->createElement('donation_increment');
			$donation_incrementValue = $dom->createTextNode($fRangeIncrement);
			$donation_increment->appendChild($donation_incrementValue);
				 
			$outcome_view = $dom->createElement('outcome_view');
			$outcome_viewValue = $dom->createTextNode($iOutcomeView);
			$outcome_view->appendChild($outcome_viewValue);
				 
			$punitive_bid = $dom->createElement('punitive_bid');
			$punitive_bidValue = $dom->createTextNode($iPunitiveBid);
			$punitive_bid->appendChild($punitive_bidValue);

			$data->appendChild($gameDescription);
			$data->appendChild($numPlayers);
			$data->appendChild($numRounds);
			$data->appendChild($endowment);
			$data->appendChild($multiplier);
			$data->appendChild($lowest_donation);
			$data->appendChild($highest_donation);
			$data->appendChild($donation_increment);
			$data->appendChild($outcome_view);
			$data->appendChild($punitive_bid);
				 
			$xmlString = $dom->saveXML();
			echo $xmlString;
		// }
	} catch (Exception $err)
	{
		print("Error in gameDefaultsGet.php $err");
	}



?>