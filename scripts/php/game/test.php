<?php

$PRINT_MESSAGES = true;

if ($PRINT_MESSAGES){
	//print("get defaults start");
}
include("../config/config_db.php");  // login information - connectivity and message constants.
//include("config_actions.php"); //action constants; used in logging.
//include("./clsDatabase.php");  // wrapper for database connectivity
//NB Brian session handling needs work

$_SESSION['host']=$HOST;
$_SESSION['username']=$USERNAME;
$_SESSION['password']=$PASSWORD;
$_SESSION['dbName']=$DBNAME;



header('Content-type: text/xml');
	 
$dom = new DOMDocument();
	 
$datas = $dom->createElement('data');
$dom->appendChild($datas);
	 
$id = $dom->createElement('id');
$idText = $dom->createTextNode('1');
$id->appendChild($idText);
	 
$title = $dom->createElement('title');
$titleText = $dom->createTextNode('PHP Undercover');
$title->appendChild($titleText);
	 
$author = $dom->createElement('author');
$authorText = $dom->createTextNode('Wiwit');
$author->appendChild($authorText);
	 
$book = $dom->createElement('book');
$book->appendChild($id);
$book->appendChild($title);
$book->appendChild($author);
	 
$datas->appendChild($book);
	 
$xmlString = $dom->saveXML();
echo $xmlString;
?>