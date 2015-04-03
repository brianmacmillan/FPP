<?php ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>FPPCo</title>
	<link type="image/x-icon" href="./interface/images/favicon.ico" rel="shortcut icon"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./interface/css/jquery.mobile-1.4.5.min.css">
	<link rel="stylesheet" href="./interface/css/fpp.css">
	<link rel="stylesheet" href="./interface/css/me.css">
    <link rel="stylesheet" href="./interface/css/jquery-ui-1.11.2-slider.css">

    <script src="./scripts/js/jquery-1.10.2.js"></script>
    <script src="./scripts/js/jquery-ui-1.11.2-slider/jquery-ui.js"></script>
    <script>
      // rename to avoid conflict with jquery mobile slider
      $.fn.uislider = $.fn.slider;
    </script>
	<script src="./scripts/js/jquery.mobile-1.4.5.min.js"></script>
    <script src="./scripts/js/d3.v3.min.js"></script>
    <script src="./scripts/js/mapper.js"></script>
    <script src="./scripts/js/underscore.js"></script>
    <script src="./scripts/js/investor_chord.js"></script>

	<!-- D3 map -->
    <script src="./scripts/js/slider.js"></script>
    <script src="./scripts/js/topojson.v1.min.js"></script>
    <script src="./scripts/js/zoom-map.js"></script>
    <script src="./scripts/js/fpp.js"></script>
    <!-- end chord -->

	<script>
		$( document ).on( "pagecreate", function() {
			pageCreate();
  		});
		$( document ).on( "pageshow", function() {
			pageShow();
		});
	</script>
</head>
<body>
	<div data-role="header" data-position="fixed" data-theme="a">
		<h1>Impact Investors by Issue<span class="invisible"> &copy; <a href="#">FPP Co</a></span></h1>
		<a href="#outside" data-icon="bars" data-iconpos="notext">Menu</a>
		<div data-role="navbar">
			<ul>
				<li><a class="ui-btn-active" href="index.php">By Reform Issue</a></li>
				<li><a href="investment_by_style.php">By Style</a></li>
				<li><a href="investment_by_amount.php">By Amount</a></li>
				<li><a class="" href="#d">By All Issues</a></li>
			</ul>
		</div>
	</div><!-- /header -->

	<div data-role="page" id="f">
		<div role="main" class="ui-content">
		  <div class="container">
		      <div class="row">
		         <div class="">
		            <div class="head">
		              <div class="subtitle center">Click on a state to zoom in and out.</div>
		            </div>
		            <div id="marriage-equality-container">
		              <div id="marriage-equality">
		                <div id="slider-me-and-details">
		                  <div id="slider-me-container" class="left">
		                    <div id="slider-me" class="active"></div>
		                  </div>
		                  <br/>
		                  <div id="slider-me-title" class="title">1971</div>
		                  <br/>
		                  <div id="slider-me-description" class="description">Same sex marriages not recognized in any state.</div> 
		                  <br/>
		                  <div id="slider-me-add-year" class="no-select active">Scroll</div>
		                </div>
		                <script>
		                	console.log("marriage_equality script start");
		                    //to marriageEqualityInit() ;
		                    var width = 800,
		                          height = 500,
		                          active = d3.select(null);

		                      var projection = d3.geo.albersUsa()
		                          .scale(1000)
		                          .translate([width / 2, height / 2]);

		                      var zoom = d3.behavior.zoom()
		                          .translate([0, 0])
		                          .scale(1)
		                          .scaleExtent([1, 8])
		                          .on("zoom", zoomed);

		                      var path = d3.geo.path()
		                          .projection(projection);

		                      var svg = d3.select("#marriage-equality").append("svg")
		                          .attr("width", width)
		                          .attr("height", height)
		                          .on("click", stopped, true);

		                      svg.append("rect")
		                          .attr("class", "background")
		                          .attr("width", width)
		                          .attr("height", height)
		                          .on("click", reset);

		                      var g = svg.append("g");

		                      svg
		                          .call(zoom) // delete this line to disable free zooming
		                          .call(zoom.event);

		                      d3.json("./data/us.json", function(error, us) {
		                        g.selectAll("path")
		                            .data(topojson.feature(us, us.objects.states).features)
		                          .enter().append("path")
		                            .attr("d", path)
		                            .attr("class", "feature")
		                            .on("click", clicked);

		                        g.append("path")
		                            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
		                            .attr("class", "mesh")
		                            .attr("d", path);
		                      });
		                	console.log("marriage_equality script end");

		                </script>
		              </div>
		            </div>

		         </div>  
		      </div>
		   </div>
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
					<li><a href="marriage_equality.php">Marriage Equality</a></li>
					<li><a href="common_core.php">Common Core</a></li>
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
		$("#marriage-equality svg").attr("id","map-container");

  		//$("#inside-a").panel("open");
		//$.mobile.changePage(function(){console.log("changepage");});  		
	    //$(":mobile-pagecontainer").pagecontainer('change', response.controller + '/' + response.method,
	    //    {allowSamePageTransition: true, showLoadMsg: true, reload: true}
	    //);
	});
</script>
</html>
