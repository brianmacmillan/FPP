<?php

# Database access API. Based on material from Poly midterm, but edited to conform to 
# the standards for brianmacmillan.com

# Note that function naming conventions are different than with javascript
# Function names begin with a capital. This is done so that developers don't
# confuse php function calls with javascript function calls.

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#check for global constant 'API'. This is defined in midterm_brian.php
#this is a dependency check. If the constant is not found
#then a failure condition is raised.

//NB Brian. This is a depedency check perhaps worth reinitiating
//if(!defined('API')) { header("Status: 404 Not Found"); die(""); exit; }

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/***
 *	 Midterm.php Annotated by Brian MacMillan October 29, 2008
 *	 This class provides a basic php database interface API
 *   Access was tested on a MySQL MAMP implementation
*/
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class DatabaseAPI {
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//Connected to database
	var $DBLINK = false;
	//contains data
	var $info = '';
	//added by BM.Oct 29 - unformated print statements when = 1
	var $debug = 0;
#====================================================================================
	function DatabaseAPI() {}
#------------------------------------------------------------------------------------
// Establish database connectivity
	function OpenConnection($HOST,$USERNAME, $PASSWORD,$DBNAME) {
		if ($this->debug==1)
		{
				print("in OpenConnection");
		}
		#CLIENT_MULTI_STATEMENTS=65536 - required to call stored procs, apparently.
		if(!$this->DBLINK=@mysql_connect($HOST, $USERNAME, $PASSWORD,CLIENT_MULTI_STATEMENTS))	return $this->loginError();
		if(!@mysql_select_db($DBNAME, $this->DBLINK))					return $this->loginError();
		if ($this->debug==1)
		{		
			print($this->DBLINK);
		}
	}
	function iOpenConnection($HOST,$USERNAME, $PASSWORD,$DBNAME) {
		if ($this->debug==1)
		{
				print("in OpenConnection");
		}
		#CLIENT_MULTI_STATEMENTS=65536 - required to call stored procs, apparently.
		if(!$this->DBLINK=@mysqli_connect($HOST, $USERNAME, $PASSWORD,$DBNAME))	return $this->loginError();

	}
#====================================================================================
#  drop handle to database
	function CloseConnection() {
#------------------------------------------------------------------------------------
		if(!$this->DBLINK)				return false;
		if(!mysql_close($this->DBLINK))	return $this->error();
	}
	#  drop handle to database
	function iCloseConnection() {
	#------------------------------------------------------------------------------------
			if(!$this->DBLINK)				return false;
			if(!mysqli_close($this->DBLINK))	return $this->error();
		}
	#=======
#====================================================================================
# handles fatal errors, both database and non database.
#
	function error($err='') {
#------------------------------------------------------------------------------------
		if(strlen($err)>3)	{die('Error: '.$err);}
		else				{die('<b>Error: </b>'.mysql_errno().' : '.mysql_error());}
		return false;
	}
#====================================================================================
# added by Brian MacMillan October 29, 2008
# provides non fatal error handling for logins.
	function loginError($err='') {
#------------------------------------------------------------------------------------
		if(strlen($err)>3)	{die('Error: '.$err);}
		else				{
			//return mysql_errno().' : '.mysql_error();
			//print("in loginError");
			return 'Error : '.mysql_errno().' : '.mysql_error();
			}
		return false;
		}
#====================================================================================
# reads column structure for a $tbname into an associative array
# used by Update and Insert to create generic update and insert queries.
	function getColnames($tbName){
#------------------------------------------------------------------------------------
		if(!$this->DBLINK) return false;
		$sql = mysql_query("SHOW COLUMNS FROM ".$tbName, $this->DBLINK);
		$result = '';
		while($row = mysql_fetch_array($sql, MYSQL_ASSOC)){ $result[$row['Field']] = $row['Field']; }
		mysql_free_result($sql);
		return $result;
	}
#====================================================================================
# returns a query resultset as a data object
	function SQL($query){
#------------------------------------------------------------------------------------
		if ($this->$debug==1)
		{
			print("in SQL");
		}
		if(!$this->DBLINK) return false;
		$sql = mysql_query($query, $this->DBLINK);
		$this->info = mysql_info();
		return $sql;
	}
#====================================================================================


	function getUserKey($query)
	{
		// Send a select query to MSSQL

		// Check if there were any records
	    $result = mysqli_query($this->DBLINK,$query); 
		$sReturn="";
	    while (($row = mysqli_fetch_array($result, MYSQL_BOTH))) 
	    { 

	        $sReturn = $row['bm_user_key']; 
	    }
		if ($sReturn=="")
		{
			return 0;
		} else
		{
			return $sReturn;
		}
		// Free the query result
		mysql_free_result($query);
	}
	function iQuery($query)
	{
		if(!$this->DBLINK) return false;
		if(!($sql = mysqli_query($this->DBLINK,$query))) $this->error();
		$result = '';
		while($row = mysqli_fetch_array($sql, MYSQL_ASSOC,MYSQLI_USE_RESULT)) 
		{ 
			$result[]=$row; 
		}
		mysqli_free_result($sql);
		return $result;
	}
	function iExecute($query)
	{
		//for queries with no result set.
		if(!$this->DBLINK) return false;
		if(!($sql = mysqli_query($this->DBLINK,$query))) $this->error();
		$result = '';
		return;
	}
		function execute($query)
		{
			//for queries with no result set.
			if(!$this->DBLINK) return false;

			if(!($sql = mysql_query($query,$this->DBLINK))) $this->error();
			$result = '';
			return;
		}
	
	function query($query)
	{
		if(!$this->DBLINK) return false;

		if(!($sql = mysql_query($query,$this->DBLINK))) $this->error();
		$result = '';
		//Error mysql_fetch_array() expects parameter 1 to be resource, boolean given
		while($row = mysql_fetch_array($sql, MYSQL_ASSOC)) 
		{ 
			$result[]=$row; 
		}
		$this->info = mysql_info();
		//Error mysql_free_result() expects parameter 1 to be resource, boolean given
		mysql_free_result($sql);
		return $result;
	}

	function getResults($psQuery) 
	{
		$cols = array('');
		$rows  = array('');
		$sReturn = "";

		$dbResult = $this->query($psQuery);
		if ($dbResult)
		{
			// Loop through rows and columns result sets.
			#print(Iin get results returning results ");
			for ($i=0;$i<count($dbResult);$i++)
			{
				#rows
				$dataArray=$dbResult[$i];

				for ($n=1;$n<count($dataArray);$n++)
				{
					#cols
					$Line = each ($dataArray);
					if ($i==0)
					{
						#$cols[$n] = "<th>$Line[key]</th>";
						#print("$Line[key]");
					}
					$rows[$n]=",$Line[value]";
					$sReturn .= $rows[$n];
				}
			}
		} else
		{
			return 9999;
		}
		#print("out of getResults");
		return $sReturn;
	}


	function insert($tableName, $VALUES)
	{
		#====================================================================================
		# insert a new row into a table
		# steps: 	test for database connectivity
		#			test for an array of values that can be used to update the table
		#			construct a SQL insert statement
		#				1. construct insert clause
		#				2. create an column name/value pairing for each column
		# 				3. flatten the column / value array into a string, using implode.
		#				4. execute the query using the mysql_query function
		#Note: this function assumes that VALUES are passed in column order.
		#Therefore the calling routine must be aware of the actual column order of the
		#table being updated.
		if(!$this->DBLINK) return false;
		if(count($VALUES)<=0){return $this->error('Array of values submitted has '.$valueCount.' elements and thus unacceptable. Exiting.');}
		
		$query	= "INSERT INTO $tableName SET ";
		$UPDATEVAL = array();
		foreach($this->getColnames($tableName) as $colName){
			if(array_key_exists($colName, $VALUES)){
				$UPDATEVAL[] = $colName.'='.((is_numeric($VALUES[$colName]))?$VALUES[$colName]:"'".$VALUES[$colName]."'");
			}
		}
		$query.= implode(', ', $UPDATEVAL);
		
		if(!mysql_query($query, $this->DBLINK)) return $this->error();
		$this->info = mysql_info();
		return mysql_insert_id($this->DBLINK);
	}

	function update($tableName, $VALUES, $CONDITION='') 
	{
		#====================================================================================
		# UPDATE
		# updates row(s) based on $CONDITION
		# steps: 	test for databse connectivity
		#			test that update values exist and an update condition (where clause) exists
		#			$CONDITION must restrict the updates to a specific set of row(s ) 
		#			construct a SQL update statement
		#				1. create a column / value array
		# 				2. flatten the column value array into a string, using implode.
		#				3. execute the query using mysql_query
		#				4. return an error should mysql_query fail. 
		#Note: this function assumes that VALUES are passed in column order.
		#Therefore the calling routine must be aware of the actual column order of the
		#table being updated.
		if(!$this->DBLINK) return false;
	
		if(count($VALUES)<=0)		
		{return $this->error('Array of values submitted has '.$valueCount.' elements and thus unacceptable. Exiting.');}
		if(strlen($CONDITION)==0)	{return $this->error('No condition specified');}
	
		$query = "UPDATE $tableName SET ";
		$UPDATEVAL = array();	
		foreach($this->getColnames($tableName) as $colName){
			if(array_key_exists($colName, $VALUES)){
				$UPDATEVAL[] = $colName.'='.((is_numeric($VALUES[$colName]))?$VALUES[$colName]:"'".$VALUES[$colName]."'");
			}
		}	
		$query.= implode(', ', $UPDATEVAL);
		$query.= ' WHERE '.$CONDITION;
	
		if(!mysql_query($query, $this->DBLINK)) return $this->error();
		return true;
	}


#====================================================================================

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

?>
