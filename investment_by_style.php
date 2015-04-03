<?php ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>FPPCo</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./interface/css/jquery.mobile-1.4.5.min.css">
	<link rel="stylesheet" href="./interface/css/fpp.css">
	<link type="image/x-icon" href="./interface/images/favicon.ico" rel="shortcut icon"/>

	<script src="./scripts/js/jquery.js"></script>
	<script src="./scripts/js/jquery.mobile-1.4.5.min.js"></script>
    <script src="./scripts/js/d3.v3.min.js"></script>
    <script src="./scripts/js/mapper.js"></script>
    <script src="./scripts/js/underscore.js"></script>
	<script src="./scripts/js/investor_chord.js"></script>
	<script src="./scripts/js/fpp.js"></script>
	<script>
		$( document ).on( "pagecreate", function() {
			$( "body > [data-role='panel']" ).panel();
			$( "body > [data-role='panel'] [data-role='listview']" ).listview();
		});
		$( document ).on( "pageshow", function() {
			pageShow();
		});
	</script>
</head>
<body>
	<div data-role="header" data-position="fixed" data-theme="a">
		<h1>Impact Investors by Style<span class="invisible"> &copy; <a href="#">FPP Co</a></span></h1>
		<a href="#outside" data-icon="bars" data-iconpos="notext">About FPPCo</a>
		<div data-role="navbar">
			<ul>
				<li><a href="index.php">By Issue</a></li>
				<li><a class="ui-btn-active" href="investment_by_style.php">By Style</a></li>
				<li><a href="investment_by_amount.php">By Amount</a></li>
			</ul>
		</div>
	</div><!-- /header -->

	<div data-role="page" id="a">

		<div role="main" class="ui-content">

		<div class="center" id="chord-style"></div>
		<!--
		$("#inside-a").panel("open");
		<a href="#inside-a" class="ui-btn ui-shadow ui-corner-all ui-btn-inline">Show Details</a>
		-->
		</div><!-- /content -->

		<div data-role="panel" id="inside-a" data-position="right" data-display="overlay" data-theme="b">
			<ul data-role="listview">
				<li data-icon="back"><a href="#" data-rel="close">Close</a></li>
				<li>Investor Details</li>
				<li>Arnold</li>
				<li>Blank</li>
				<li>Eychaner</li>
				<li>Munger</li>
				<li>Hughes</li>
				<li>Lucas</li>
				<li>Schultz</li>
				<li>Skoll</li>
				<li>Walton</li>
			</ul>
	        <div id="chord-details">
	            <div id="client-summary-container"></div>
	            <!-- ********* Add investor data here ******** -->
	                <?php include("./data/client_summary.html"); ?>
	            <!--  ****************  -->
	        </div>
		</div>

		<div data-role="footer" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a class="ui-btn-active" href="index.php" class="ui-btn-active ui-state-persist">Impact Investors</a></li>
					<li><a href="marriage_equality.html">Marriage Equality</a></li>
					<li><a href="common_core.html">Common Core</a></li>
				</ul>
			</div>
		</div><!-- /header -->

	</div><!-- /page -->

	<div data-role="panel" id="outside" data-theme="b">
		<ul data-role="listview">
			<li data-icon="back"><a href="#" data-rel="close">Close</a></li>
			<li>About FPP Co</li>
		</ul>
	    <p class="first-paragraph">
	Forward Progress in Politics (FPPCO) was born out of deep experience operating and building organizations in the political reform space. Every initiative the team has led has reached national prominence as measured by money raised, media penetration, public engagement, organizational strength, and public policy impact.
	</p>
	<p>
	We are in the business of creating tangible and actionable insights and pathways for Impact Investors who seek to be effective in deploying capital into political reform. Our goal is to help investors and organizations make sound decisions about political investments based on a solid strategic foundation, robust analytics, a strong operating base, and focused tools that yield the highest probability of return. 
	</p>
	</div>
</body>
<script>
	$(document).ready(function(){
		console.log("in document ready investment by style");
		populateInvestorChord('./data/impact_investors/impact_investors_styles_all.json',"chord-svg-styles");
	  	$("#inside-a").panel("open");
	});
</script>
</html>
