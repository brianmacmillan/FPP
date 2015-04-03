<?php
	/* Get lookups related to an individual bm_products record */
	try
	{
		//print("productUpdate.php start");


		$ERROR_MISSING_ARGUMENTS = "1,USERS UPDATE ERROR.";
		$ERROR_NO_LOOKUP = "2,NO LOOKUP: required arguments were not supplied.";

		include("./../config/config_db.php");  // login information - connectivity and message constants.
		//include("./../config/config_actions.php"); //action constants; used in logging.
		include("./../clsDatabase.php");  // wrapper for database connectivity

		// Check if arguments were passed to this routine. 
		if (count($_GET)==0)
		{
			print($ERROR_MISSING_ARGUMENTS);
			return;
		}
		$iUserKey=0;
		if (isset($_GET["user_key"])){$iUserKey=$_GET["user_key"];}
		$_SESSION['host']=$HOST; #"localhost";
		$_SESSION['username']=$USERNAME; #'bmacmill';
		$_SESSION['password']=$PASSWORD;
		$_SESSION['dbName']=$DBNAME;

		$GET_PREFERENCES = "call sp_user_preferences_get(".$iSystemId.",".$iProductKey.")";
		//print($GET_PREFERENCES);
		$dbConnect = new DatabaseAPI();
	    $dbResult = $dbConnect->iOpenConnection($_SESSION['host'],$_SESSION['username'],$_SESSION['password'],$_SESSION['dbName']);
		if ($dbResult) {print($LOGIN_ERROR_NO_DATABASE_CONNECTION);return;}
		$sResult .= getData($GET_PREFERENCES,$dbConnect,$sList);	
		$dbResult = $dbConnect->iCloseConnection();
		$GET_PREFERENCES_SUCCESS = "0,GET PREFERENCES SUCCESS";
		print($sResult);
		return;
	} catch (Exception $err)
	{
		print("Error in productLookups.php $err");
	}
	function getData($pQuery,$pdbConnect,$psLookup){
		try
		{
		    $result = mysqli_query($pdbConnect->DBLINK,$pQuery);
			$sReturn="";
			$iCounter=0;
			$bReturnHtml = true;
			$bFirstTime = true;
			$bEvenOdd = 'odd';
			if (!$result){return $sReturn;}
			    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC))
				{
					if (($iCounter % 2)==0){$bEvenOdd="even";} else{$bEvenOdd="odd";}
/* fields available but not used
						show_header,
						show_menus,
						show_footer,
						show_comments,
						show_help,
						show_editor,
						show_preferences,
						show_ratings,
						show_navigation_controls,
S*/
						if ($bFirstTime)
						{
							$sReturn="<div id='preferences-results' class='lookup-list invisible'>";$bFirstTime=false;
						};
						$sReturn .= "<div id='id' class='$bEvenOdd row'><span class='one user-key'>".$row['user_key']."</span>";
						$sReturn .= "<span class='two user-preference-key'>".$row['user_preference_key']."</span>";
						$sReturn .= "<span class='three show-query-results'>".$row['show_query_results']."</span>";
						$sReturn .= "<span class='four show-data-change-messages'>".$row['show_data_change_messages']."</span>";
						$sReturn .= "<span class='five hide-add-delete-warnings'>".$row['hide_add_delete_warnings']."</span>";
						$sReturn .= "<span class='six show-query-parameters'>".$row['show_query_date']."</span>";
						$sReturn .= "<span class='seven hide-add-delete-warnings'>".$row['death_date']."</span>";
						$sReturn .= "<span class='eight display-mode'>".$row['display_mode']."</span>";
						$sReturn .= "</div>";
					$iCounter++;
			    }
				if ($iCounter>0 && $bReturnHtml){$sReturn.="</div>";};
			}
			mysqli_free_result($result);
			return $sReturn;
		} catch(exception $err)
		{ 
			print($err);		
		}
	}

?>