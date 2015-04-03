<?php
		print("start address insert");

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


		$iAddressID = 0;
		$sAddress1 = "";
		$sAddress2 = "";
		$sAddress3 = "";
		$sCity = "";
		$sState = "";
		$sPostalCode = "";
		$sCountry = "";
		$sPoliticalDivision1 = "";
		$sPoliticalDivision2 = "";
		

		print("second");


		//$dbConnect = new DatabaseAPI();

		//if ($dbConnect){
		//	print("connection ");
		//} else {print("no connection");
	//		return;
	//	}


		if (isset($_GET['id'])){
			$iID=$_GET["id"];
		}
		if (isset($_GET["addressID"])){$iAddressID=$_GET["addressID"];}
		if (isset($_GET["address1"])){$sAddress1=$_GET["address1"];}
		if (isset($_GET["address2"])){$sAddress2=$_GET["address2"];}
		if (isset($_GET["address3"])){$sAddress3=$_GET["address3"];}
		if (isset($_GET["city"])){$sCity=$_GET["city"];}
		if (isset($_GET["state"])){$sState=$_GET["state"];}
		if (isset($_GET["postalCode"])){$sPostalCode=$_GET["postalCode"];}
		if (isset($_GET["country"])){$sCountry=$_GET["country"];}
		if (isset($_GET["politicalDivision1"])){$sPoliticalDivision1=$_GET["politicalDivision1"];}
		if (isset($_GET["politicalDivision2"])){$sPoliticalDivision2=$_GET["politicalDivision2"];}
		
		
		$INSERT = "INSERT INTO address (addressID, address1, address2, address3, city, state, postalCode, country, politicalDivision1, politicalDivision2)";
		$INSERT .= "VALUES (".$iAddressID.",'".$sAddress1."','".$sAddress2."','".$sAddress3."','".$sCity."','".$sState."','".$sPostalCode."', '".$sCountry."', '".$sPoliticalDivision1."', '".$sPoliticalDivision2."' )";

			
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