<?php
		print("start user insert");

		$ERROR_MISSING_ARGUMENTS = "1,INSERT ERROR: required arguments were not supplied to the usersSave.php script.";
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

		$iUserID = 0;
		$sFirstName = "";
		$sMiddleName = "";
		$sLastName = "";
		$dDateOfBirth = "";
		$sEthnicity = "";
		$sFirstLanguage = "";
		$sSecondLanguage = "";

		print("second");


		//$dbConnect = new DatabaseAPI();

		//if ($dbConnect){
		//	print("connection ");
		//} else {print("no connection");
	//		return;
	//	}


		if (isset($_REQUEST["userID"])){$iUserID=$_REQUEST["userID"];}		
		if (isset($_REQUEST["firstName"])){$sFirstName=$_REQUEST["firstName"];}		
		if (isset($_REQUEST["middleName"])){$sMiddleName=$_REQUEST["middleName"];}		
		if (isset($_REQUEST["lastName"])){$sLastName=$_REQUEST["lastName"];}		
		if (isset($_REQUEST["dateOfBirth"])){$dDateOfBirth=$_REQUEST["dateOfBirth"];}		
		if (isset($_REQUEST["ethnicity"])){$sEthnicity=$_REQUEST["ethnicity"];}		
		if (isset($_REQUEST["firstLanguage"])){$sFirstLanguage=$_REQUEST["firstLanguage"];}		
		if (isset($_REQUEST["secondLanguage"])){$sSecondLanguage=$_REQUEST["secondLanguage"];}		
		
		$INSERT = "INSERT INTO users (userID, firstName, middleName, lastName, dateOfBirth, ethnicity, firstLanguage, secondLanguage)";
		$INSERT .= "VALUES (".$iUserID.", '".$sFirstName."', '".$sMiddleName."', '".$sLastName."', '".$dDateOfBirth."', '".$sEthnicity."', '".$sFirstLanguage."', '".$sSecondLanguage."'  )";

			
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