<?php
		$INSERT_SUCCESS_CODE = "0";
		$INSERT_SUCCESS = "BID INSERT SUCCESS";
		$ERROR_MISSING_ARGUMENTS = "INSERT ERROR: required arguments were not supplied to the biddingSave.php script.";
		$ERROR_MISSING_ARGUMENTS_CODE = "1";
		$INSERT_FAILURE_CODE = "2";
		$INSERT_FAILURE = "BID INSERT FAILURE";
		$MISSING_BID_CODE = "3";
		$MISSING_BID = "MISSING BID";
		$PRINT_MESSAGES = false;

		include("../config/config_db.php");  // login information - connectivity and message constants.
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

		$iBidID = 0;
		$iGameID = 0;
		$iUserID = 0;
		$iRoundID = 0;
		$fOverallBids = 0.0;
		$fBid = 0.0;
		$iBidDirection = 0.0;
		$fCurrentAmount = 0.0;

		if (isset($_REQUEST['id'])){
			$iID=$_REQUEST["id"];
		}
		if (isset($_REQUEST["bid_id"])){$iBiddingID=$_REQUEST["bid_id"];}
		if (isset($_REQUEST["game_id"])){$iGameID=$_REQUEST["game_id"];}
		if (isset($_REQUEST["user_id"])){$iUserID=$_REQUEST["user_id"];}
		if (isset($_REQUEST["round_id"])){$iRoundID=$_REQUEST["round_id"];}
		if (isset($_REQUEST["bid_direction"])){$iBidDirection=$_REQUEST["bid_direction"];}

		//if (isset($_REQUEST["overallBids"])){$fOverallBids=$_REQUEST["overallBids"];}
		if (isset($_REQUEST["bid"])){$fBid=$_REQUEST["bid"];}
		//if (isset($_REQUEST["currentAmount"])){$fCurrentAmount=$_REQUEST["currentAmount"];}
		
		if ($iBidID==0){
			$INSERT = "INSERT INTO bid (game_id, user_id, round_id,bid,bid_direction)";
			$INSERT .= "VALUES (".$iGameID.", ".$iUserID.", ".$iRoundID.", ".$fBid.",".$iBidDirection." )";

				
			//print("SQL is " . $INSERT);						

			$mysqli = new mysqli($_SESSION['host'], $_SESSION['username'], $_SESSION['password'], $_SESSION['dbName']);

			if ($mysqli->connect_errno) {

/*				header('Content-type: text/xml');
				$dom = new DOMDocument(); // xml which contains return mesage
			
				$data = $dom->createElement('data');
				$dom->appendChild($data);
		  		$errorCode = $dom->createElement('error_code');
				$errorCodeText = $dom->createTextNode($INSERT_FAILURE_CODE);
				$errorCode->appendChild($errorCodeText);

				$errorMessage = $dom->createElement('error_message');
				$errorMessageText = $dom->createTextNode($INSERT_FAILURE);
				$errorMessage->appendChild($errorMessageText);
				 
				$xmlString = $dom->saveXML();
				echo $xmlString;*/
			    return;
			}

			if ($fBid==0) {

				header('Content-type: text/xml');
				$dom = new DOMDocument(); // xml which contains return mesage
			
				$data = $dom->createElement('data');
				$dom->appendChild($data);
		  		$errorCode = $dom->createElement('error_code');
				$errorCodeText = $dom->createTextNode($MISSING_BID_CODE);
				$errorCode->appendChild($errorCodeText);

				$errorMessage = $dom->createElement('error_message');
				$errorMessageText = $dom->createTextNode($MISSING_BID);
				$errorMessage->appendChild($errorMessageText);
				 
				$data->appendChild($errorCode);
				$data->appendChild($errorMessage);
				$xmlString = $dom->saveXML();
				echo $xmlString;
			    return;
			}

			if ($mysqli->query($INSERT)) {
				$iBidId = $mysqli->insert_id;
				
				header('Content-type: text/xml');
				$dom = new DOMDocument(); // xml which contains return mesage
			
				$data = $dom->createElement('data');
				$dom->appendChild($data);

				$errorCode = $dom->createElement('error_code');
				$errorCodeText = $dom->createTextNode($INSERT_SUCCESS_CODE);
				$errorCode->appendChild($errorCodeText);

				$errorMessage = $dom->createElement('error_message');
				$errorMessageText = $dom->createTextNode($INSERT_SUCCESS);
				$errorMessage->appendChild($errorMessageText);				

				$bidId = $dom->createElement('bid_id');
				$bidIdText = $dom->createTextNode($iBidId);
				$bidId->appendChild($bidIdText);

				$data->appendChild($bidId);
				$data->appendChild($errorCode);
				$data->appendChild($errorMessage);
					 
				$xmlString = $dom->saveXML();
				echo $xmlString;
				return;
			}

			$mysqli->close();
		}
?>