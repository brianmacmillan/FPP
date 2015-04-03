<?php
	#Standard header and file information. 
	#There is a need to determine how best to get the client to cache
	#static content.

	
	$HEADER1='<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	$HEADER2='<html"><head>';
	$TITLE='<title id="title">Brian MacMillan Writing</title>';
	$META1='<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>';
	$META_EXPIRES='<meta http-equiv="expires" content="Wed, 16 Sep 2009 00:00:01 GMT"/>';
	$META_POETRY='<meta name="keywords" content="poetry Brian MacMillan" content=""/>';

	//$MIME_TYPE='<meta http-equiv="content-script-type" content="text/javascript">';
	$MIME_TYPE="";
	/*
		
		<meta name="robots" content="all">
		<meta name="author" content="Brian MacMillan, brianmacmillan(at)brianmacmillan(dot)com">
		<meta name="copyright" content="(c) 1990-20010 Brian MacMillan">
	*/

	$FOOTER='</html>';
	$ICON='<link rel="shortcut icon" href="content/images/favicons/starburst.ico" type="image/x-icon"/>';
	$CSS_MAIN-'';
	//$CSS_MAIN='<link href="css/bm_main.css" rel="stylesheet" type="text/css" media="screen" id="bm_main_css" title="bm_main_css"/>';
	//$CSS_DOCK='<link href="css/icon_dock.css" rel="stylesheet" type="text/css" media="screen">';
	$CSS_PHOTOGRAPHS='<link href="css/bm_photographs.css" rel="stylesheet" type="text/css" media="screen"/>';
	$CSS_TABS='<link href="css/tab.css" rel="stylesheet" type="text/css" media="screen" id="tab_css" title="tab_css"/>';
	$CSS_BLACK='<link href="css/black.css" title="black.css" rel="alternate stylesheet" type="text/css" media="screen"/>';
	$CSS_WHITE='<link href="css/white.css" title="white.css" rel="stylesheet" type="text/css" media="screen"/>';
	
	//$CSS_BM_POEMS='<link href="css/poetry.css" type="text/css" rel="stylesheet"/>';
	$CSS_SCROLL='<link href="css/scroll.css" title="scroll.css" rel="stylesheet" type="text/css" media="screen"/>';

	$JS_BM_MAIN='<script type="text/javascript" src="js/jquery.bm_main.js"></script>';
	$JS_BM_LOGS='<script type="textt/javascript" src="js/jquery.bm_logs.js"></script>';
	$JS_BM_USERS='<script type="text/javascript" src="js/jquery.bm_users.js"></script>';
	$JS_BM_UTILS='<script type="text/javascript" src="js/bm_utilities.js"></script>';

	$JS_BM_UTIL='<script type="text/javascript" src="js/bm_utilities.js"></script>';
	//Slide show
	$JS_JQUERY_SS='<script type="text/javascript" src="js/jquery.bm_ss.js"></script>';

	$JS_BM_COMMENTS='<script type="text/javascript" src="js/jquery.bm_comments.js"></script>';
	$JS_BM_STORIES='<script type="text/javascript" src="js/bm_stories.js"></script>';
	$JS_BM_DATABASE='<script type="text/javascript" src="js/bm_database.js"></script>';
	$JS_BM_USER_INTERFACE='<script type="text/javascript" src="js/jquery.bm_user_interface.js"></script>';
	$JS_BM_PRODUCTS='<script type="text/javascript" src="js/jquery.bm_products.js"></script>';
	$JS_BM_DOCUMENTS='<script type="text/javascript" src="js/jquery.bm_documents.js"></script>';
	
	$JS_BROWSER_DETECTION='<script type="text/javascript" src="js/browser_detection.js"></script>';
	
	$JS_BM_POEMS='<script type="text/javascript" src="js/bm_poems.js"></script>';
	$JS_SERIAL_SCROLL_INIT_POEMS='<script type="text/javascript" src="js/serial_scroll_init_poems.js"></script>';
	$JS_JQUERY_BM_POEMS='<script type="text/javascript" src="js/jquery.bm_poems.js"></script>';

	$JS_JQUERY='<script type="text/javascript" src="js/jquery/jquery.js"></script>';
	$JS_JQUERY_1_2_6='<script type="text/javascript" src="js/jquery/jquery_1.2.6.js"></script>';
	$JS_JQUERY_1_3_1='<script type="text/javascript" src="js/jquery/jquery_1_3_1.js"></script>';
	$JS_JQUERY_1_4_2='<script type="text/javascript" src="js/jquery/jquery_1.4.2-min.js"></script>';

	/* jquery ui not used 
	$JS5='<script type="text/javascript" src="js/jquery-ui-1.5.2.js"></script>';
	$JS6='<script type="text/javascript" src="js/jquery_ui.core.js"></script>';
	$JS7='<script type="text/javascript" src="js/jquery_ui.dragable.js"></script>';
	$JS8='<script type="text/javascript" src="js/jquery_ui.dropable.js"></script>';
	*/
	//$JS_COLFLOW='<script type="text/javascript" src="js/min/jquery.colflow-min.js"></script>';
	$JS_COLFLOW='<script type="text/javascript" src="js/jquery.colflow.js"></script>';

	$JS_IUTIL='<script type="text/javascript" src="js/jquery.iutil.js"></script>';
	$JS_IFISHEYE='<script type="text/javascript" src="js/jquery.ifisheye.js"></script>';
	$JS_ITOOLTIP='<script type="text/javascript" src="js/jquery.itooltip.js"></script>';

	//$JS12='<script type="text/javascript" src="js/bm_photographs.js"></script>';

	$JS_SCROLL_TO='<script type="text/javascript" src="js/jquery.scroll_to_min.js"></script>';
	$JS_SERIAL_SCROLL='<script type="text/javascript" src="js/jquery.serial_scroll.js"></script>';
	$JS_SERIAL_SCROLL_INIT_PHOTOGRAPHS='<script type="text/javascript" src="js/serial_scroll_init_photographs.js"></script>';

	$JS_BM_TAB='<script type="text/javascript" src="js/bm_tabs.js"></script>';
	$JS_JQ_BM_TAB='<script type="text/javascript" src="js/jquery.bm_tabs.js"></script>';
	
	$JS_NAVBAR='<script type="text/javascript" src="js/bm_navbar.js"></script>';
	$JS_ACCORDION='<script type="text/javascript" src="js/accordion.js"></script>';

	$JS_IDTABS='<script type="text/javascript" src="js/jquery.idtabs.js"></script>';
	//	http://davecardwell.co.uk/javascript/jquery/plugins/jquery-em/ - to replace text resize detection 
		//$JS10='<script type="text/javascript" src="js/jquery.JQem.js"></script>'; // traps for font resize events


/*
	$JS8='<script type="text/javascript" src="galleria/jquery.min.js"></script>';
	$JS9='<script type="text/javascript" src="galleria/jquery.galleria.js"></script>';
*/
?>
