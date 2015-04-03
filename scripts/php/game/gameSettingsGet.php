<?php
		print("start");

		$ERROR_MISSING_ARGUMENTS = "1,INSERT ERROR: required arguments were not supplied to the insert.php script.";
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
		if (count($_GET)==0)
		{
			if ($PRINT_MESSAGES)
			{
				print($ERROR_MISSING_ARGUMENTS);
			}
			return;
		}


		$iID = 0;
		$sStationName = "";
		$iAvailableDocks = 0;
		$iTotalDocks = 0;
		$fLatitude = 0.0;
		$fLongitude = 0.0;
		$sStatusValue = "";
		$sStatusKey = "";
		$iAvailableBikes = 0;
		$sStAddress1 = "";
		$sStAddress2 = "";
		$sCity = "";
		$sPostalCode = "";
		$sLocation = "";
		$fAltitude = 0.0;
		$btestStation = 0;
		$dLastCommunicationTime = "";
		$sLandMark = "";

		print("second");


		$dbConnect = new DatabaseAPI();

		if ($dbConnect){
			print("connection ");
		} else {print("no connection");
			return;
		}


		if (isset($_GET['id'])){
			$iID=$_GET["id"];
		}
		if (isset($_GET["stationName"])){$sStationName=$_GET["stationName"];}
		if (isset($_GET["availableDocks"])){$iAvailableDocks=$_GET["availableDocks"];}
		if (isset($_GET["totalDocks"])){$iTotalDocks=$_GET["totalDocks"];}
		if (isset($_GET["latitude"])){$fLatitude=$_GET["latitude"];}
		if (isset($_GET["longitude"])){$fLongitude=$_GET["longitude"];}
		if (isset($_GET["statusValue"])){$sStatusValue=$_GET["statusValue"];}
		if (isset($_GET["statusKey"])){$sStatusKey=$_GET["statusKey"];}
		if (isset($_GET["availableBikes"])){$iAvailableBikes=$_GET["availableBikes"];}
		if (isset($_GET["stAddress1"])){$sStAddress1=$_GET["stAddress1"];}
		if (isset($_GET["stAddress2"])){$sStAddress2=$_GET["stAddress2"];}
		if (isset($_GET["city"])){$sCity=$_GET["city"];}
		if (isset($_GET["postalCode"])){$sPostalCode=$_GET["postalCode"];}
		if (isset($_GET["location"])){$sLocation=$_GET["location"];}
		if (isset($_GET["altitude"])){$fAltitude=$_GET["altitude"];}
		if (isset($_GET["testStation"])){$btestStation=$_GET["testStation"];}
		if (isset($_GET["lastCommunicationTime"])){$dLastCommunicationTime=$_GET["lastCommunicationTime"];}
		if (isset($_GET["landMark"])){$sLandMark=$_GET["landMark"];}
		
		$INSERT = "INSERT INTO stationdata (id,stationName,availableDocks,totalDocks,latitude,longitude,statusValue,statusKey,";
		$INSERT .="availableBikes,stAddress1,stAddress2,city,postalCode,location,altitude,testStation,lastCommunicationTime,landMark) ";
		$INSERT .= "VALUES (".$iID.",'".$sStationName."',".$iAvailableDocks.",".$iTotalDocks.",".$fLatitude.",".$fLongitude.",'".$sStatusValue."','".$sStatusKey."',".$iAvailableBikes.",'".$sStAddress1."','".$sStAddress2."','".$sCity."','".$sPostalCode."','".$sLocation."',".$fAltitude.",".$btestStation.",'".$dLastCommunicationTime."','".$sLandMark."')";

			
		//print("SQL is " . $INSERT);						

		$mysqli = new mysqli("localhost", "admin", "", "citibike");

		if ($mysqli->connect_errno) {
		    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
		}

		if ($mysqli->query($INSERT)) {
		    printf("Insert successful.\n");
		}

		$mysqli->close();

?>