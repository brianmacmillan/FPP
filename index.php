<?php ?>
<!DOCTYPE html>
<html>
  <head>
    <title>FPP Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link type="image/x-icon" href="images/favicon.ico" rel="shortcut icon"/>

    <link rel="stylesheet" href="css/jquery_ui_smoothness.css">

    <link rel="stylesheet" href="css/bootstrapx.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/elements.css">
    <link rel="stylesheet" type="text/css" href="css/classes.css"/>
    <link rel="stylesheet" type="text/css" href="css/FPP.css"/>


    <link rel="stylesheet" href="./css/jquery-ui-1.11.2-slider.css">

    <script src="./js/jquery-1.10.2.js"></script>
    <script src="./jquery-ui-1.11.2-slider/jquery-ui.js"></script>
    <script src="./js/d3.v3.min.js"></script>
    <script src="js/underscore.js"></script>

    <script src="./js/topojson.v1.min.js"></script>
    <script src="./js/zoom-map.js"></script>
    <script src="./js/slider.js"></script>
    <script src="./js/mapper.js"></script>
    <script src="./js/investors-and-issues-chord.js"></script>

  </head>

  <body>

  <!--nav bar-->
  <div class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
 
    <div class="container">    
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".bs-navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon icon-bar"></span>
          <span class="icon icon-bar"></span>
          <span class="icon icon-bar"></span>
        </button>     
      </div>
      <a name="home" id="home"></a>

      <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      	<div class="logo"><img src="images/fppco_logo.png">
          <span class="copyright">&copy;2015</span>
        </div>

        <a name="home" id="landscape"></a>
        <ul class="nav navbar-nav">
         <!-- Navigation links. Note down the class name. It is important -->
          <li><a href="#landscape" class="anchorLink">The Landscape</a></li>
          <li><a href="#investors-and-issues" class="anchorLink">Investors and Issues</a></li>
          <li><a href="#issues-and-amounts-anchor" class="anchorLink">Issues and Amounts</a></li>
          <li><a href="#marriage-equality-anchor" class="anchorLink">Marriage Equality</a></li>
          <li><a href="#campaigns-anchor" class="anchorLink">Campaigns</a></li>
          <li><a href="#about-anchor" class="anchorLink">About</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <!--landscape-->

 <div id="landscape" class="container">
   <div class="row">
      <div class="">
        <div class="head">
          
           <h2 id="landscape-header">Overview of the Reform Landscape Study</h2>
          
        </div>

        <div class="slideshow-container">
            <div class="arrow left"><</div>
            <div class="slideshow active" slideshow-id='1'>
                <div class="slide active"><img src="./images/rls_slideshow/page_01_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_02_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_03_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_04_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_05_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_06_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_07_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_08_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_09_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_10_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_11_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_12_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_13_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_14_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_15_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_16_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_17_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_18_640px_h.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_19_640px_h.png"></div>

<!--                 <div class="slide active"><img src="./images/rls_slideshow/page_01_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_02_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_03_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_04_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_05_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_06_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_07_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_08_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_09_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_10_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_11_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_12_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_13_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_14_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_15_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_16_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_17_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_18_640px.png"></div>
                <div class="slide"><img srcx="./images/rls_slideshow/page_19_640px.png"></div>
 -->            </div>
            <div class="arrow right">></div>
        </div>
      </div>
    </div>

   </div>
  <!--Investors and Issues - chord -->
  <a name="investors-and-issues" id="investors-and-issues"></a>
  <div class="itop-container">
      <div class="itop">
        <a href="#home" class="anchorLink"><i class="fa chevron-up"></i></a>
      </div> 
      <div class="itop">  
        <a href="#issues-and-amounts-anchor" class="anchorLink"><i class="fa chevron-down"></i></a>
      </div>
   </div>
  <div id="investors-and-issues" class="container">
      <div class="row">
         <div class="">
            <div class="head">
            
               <h2>Investors and Issues</h2>
            
            </div>
         </div>
      </div>
      <div id="chord-container">
        <div id="tooltip"></div>
        <div id="chord-details">
            <div id="client-summary-container"></div>
            <!-- ********* Add investor data here ******** -->
                <?php include("./data/investors-and-issues.html"); ?>
            <!--  ****************  -->
            <div id="chord-legend"></div>  
        </div>
        <div class="center" id="chord"></div>
    </div>
      <script>
        populateInvestorChord();
      </script>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">         
          <div class="modal-body">                
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

  <!--End Investors and Issues - chord -->

  <div class="border"></div>
  <a name="issues-and-amounts-anchor" id="issues-and-amounts-anchor"></a>
  <div class="itop-container">
      <div class="itop"><a href="#home" class="anchorLink">
        <i class="fa chevron-up"></i></a>
      </div>
  </div>
  <div class="border"></div>

  <!-- Issues and Amounts -->
  <div class="container">
    <div class="row">
        <div class="head">
            <h2>Issues and Amounts</h2>
        </div>
    </div>
  </div>
  <div id="issues-and-amounts-container"></div>
  <script>
    var fill = d3.scale.category10();

    var data = [
     [0,0,  0,0,800,200,400],
     [0,0,  0,0,800,200,400],
     [0,0,  0,0,800,200,400],
     [0,0,  0,0,800,200,400],
     [800,  800, 800,800,0,0,0],
     [200,  200, 200,200,0,0,0],
     [400,  400, 400,400,0,0,0]
     ];

    labels = new Array(3);
    labels[0]="Education";
    labels[1]="Marriage Equality";
    labels[2]="Gun Control";
    labels[3]="Electoral Reform";
    labels[4]="Walton";
    labels[5]="Soros";
    labels[6]="Bloomberg";

    // Visualize
    var chord = d3.layout.chord()
        .padding(.05)
        .sortSubgroups(d3.descending)
        .matrix(data);

    var width = 960,
        height = 500,
        r1 = height / 2,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1,
        outer

    var svg = d3.select("#issues-and-amounts-container").append("svg")
        .attr("width", width+200)
        .attr("height", height+200)
        .append("g")
        .attr("transform", "translate(" + (width+200) / 2 + "," + (height+200) / 2 + ")");

    svg.append("g").selectAll("path")
        .data(chord.groups)
        .enter().append("path")
        .attr("class", "arc")
        .style("fill", function(d) {
            return d.index < 4 ? '#444444' : fill(d.index);
        })
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .on("mouseover", fade(.1))
        .on("mouseout", fade(.7));


    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord.chords)
        .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) { return fill(d.target.index); })
        .style("opacity", 0.7);

    svg.append("g").selectAll(".arc")
        .data(chord.groups)
        .enter().append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return ((d.startAngle + d.endAngle) / 2) > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
          return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180 / Math.PI - 90) + ")"
              + "translate(" + (r1 - 15) + ")"
              + (((d.startAngle + d.endAngle) / 2) > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) {
            return labels[d.index];
        });

    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
        return function(g, i) {
        svg.selectAll(".chord path")
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
            .transition()
            .style("opacity", opacity);
        };
    }
  </script>  
  <a name="marriage-equality-anchor" id="marriage-equality-anchor"></a>
  <hr>
  <div class="itop"><a href="#home" class="anchorLink"><i class="fa chevron-up"></i></a></div>

  <div class="container">
      <div class="row">
         <div class="">
            <div class="head">
				<h2>Marriage Equality</h2>
              <div class="subtitle">Click on a state to zoom in and out.</div>
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

                </script>
              </div>
            </div>

         </div>  
      </div>
   </div>

  <div class="border"></div>
  <a name="campaigns-anchor" id="campaigns-anchor"></a>
  <hr>
  <div class="itop"><a href="#home" class="anchorLink">
    <i class="fa chevron-up"></i></a>
  </div>
  <div class="border"></div>

  <!-- Campaigns -->
  <div class="row">
        <div class="head">
            <h2>Campaigns</h2>
        </div>
  </div>

  <a name="about-anchor" id="about-anchor"></a>
  <hr>
  <div class="itop"><a href="#home" class="anchorLink">
    <i class="fa chevron-up"></i></a>
  </div>
    <!-- About -->

  <div class="container about">
    <div class="row">
          <div class="head">
              <h2>About</h2>
          </div>
          <div class="bor"></div>
          <div class="content">
    <p class="first-paragraph">
Forward Progress in Politics (FPPCO) was born out of deep experience operating and building organizations in the political reform space. Every initiative the team has led has reached national prominence as measured by money raised, media penetration, public engagement, organizational strength, and public policy impact.
</p>
<p>
We are in the business of creating tangible and actionable insights and pathways for Impact Investors who seek to be effective in deploying capital into political reform. Our goal is to help investors and organizations make sound decisions about political investments based on a solid strategic foundation, robust analytics, a strong operating base, and focused tools that yield the highest probability of return. 
</p>
          </div>
     </div>
  </div>

  <div class="border"></div>
  <hr>
  <div class="itop"><a href="#home" class="anchorLink">
    <i class="fa chevron-up"></i></a>
  </div>
  <div class="border"></div>


  <div class="border"></div>
  <a name="photos" id="photos"></a>


  <footer>
  <div class="container">
    <div class="row">
      <div class="">
            <p>Copyright &copy;<a href="#">FPP Co</a></p>
            <div class="border"></div>
      </div>
    </div>
  <div class="clearfix"></div>

  </div>
</footer>
  
  </body>

  <script src="./js/fpp.js"></script>
</html>