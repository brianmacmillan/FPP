<?php ?>
<!DOCTYPE html>
<html>
<head>    
    <script src="../scripts/js/jquery-1.11.1.min.js"></script>
    <script src="../scripts/js/jquery/jquery-ui/jquery-ui.js"></script>
  	<script src="../scripts/js/d3.v3.min.js"></script>
    <script src="../scripts/js/chord.js"></script>
    <script src="../scripts/js/mapper.js"></script>
    <script src="../scripts/js/underscore.js"></script>

</head>
<body>
<div id="game">
	<!-- put chord here-->
  <div id="investors-and-issues" class="container">
      <div class="row">
         <div class="">
            <div class="head">
            
               <h2>Game</h2>
            
            </div>
         </div>
      </div>
      <div id="chord-container">
        <div id="tooltip"></div>
        <div id="chord-details">
            <div id="client-summary-container"></div>
            <!-- ********* Add investor data here ******** -->
                <?php //include("../data/client_summary.html"); ?>
            <!--  ****************  -->
        </div>
        <div class="center" id="chord"></div>

        <div id="chord-legend">
          <div id="load-issues" class="button">Load Game</div>
        </div>  
    </div>
      <script>
        //populateInvestorChord();
      </script>
    </div>
</div>
</body>
<script>
	$(document).ready(
		function(){
	        populateInvestorChordIssues();
		    $("#load-issues").click(function(){
		      populateInvestorChordIssues();
		    });
		}
	);
</script>
</html>