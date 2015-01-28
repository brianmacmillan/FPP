populateInvestorChord = function(){	
    //*******************************************************************
    //  CREATE MATRIX AND MAP
    //*******************************************************************
    ids = new Array();

    d3.json('./data/impact_investors.json', function (error, data) {
      var mpr = chordMpr(data);

      _.each(data, function (elem) {
        //console.log(elem.id);

        ids[ids.length+1]=elem.id;

        mpr.addToMap(name(elem.name))
      })

      mpr.setFilter(function (row, a, b) {
          return (name(row.name) === a.name)
        })
        .setAccessor(function (recs, a, b) {
          if (!recs[0]) return 0;
          var n = 0;
          _.each(recs, function (r) {
            _.each(r.imports, function (i) {
              if (name(i) === b.name) n++;
            });
          });
          return n;
        });
      drawChords(mpr.getMatrix(), mpr.getMap());
    });
    

    function name(name) {
      return name.substring(0, name.lastIndexOf(".")).substring(6);
    }
    //*******************************************************************
    //  DRAW THE CHORD DIAGRAM
    //*******************************************************************
    function drawChords (matrix, mmap) {
      var w = 1180, h = 800, r1 = h / 2, r0 = r1 - 100;

      var fill = d3.scale.ordinal()
          .range(['#c7b570','#c6cdc7','#335c64','#768935','red','orange','yellow','lightgreen','green','cyan','lightblue','blue','darkblue','indigo','violet','#0a3542',
            '#c7b570','#c6cdc7','#335c64','#768935','#507282','#5c4a56','#aa7455','#574109','#837722','#73342d','#0a5564','#9c8f57','#7895a4','#4a5456','#b0a690','#0a3542',]);

      var chord = d3.layout.chord()
          .padding(.07)
          .sortSubgroups(d3.descending)
          .sortChords(d3.descending);

      var arc = d3.svg.arc()
          .innerRadius(r0)
          .outerRadius(r0 + 20);

      var svg = d3.select("#chord").append("svg:svg")
          .attr("width", w)
          .attr("height", h)
          .attr("id","chord-svg")
          .on("mouseover", function () { 
            /* */
            //console.log("svg mouse over");
            $("path.chord.fade").removeClass("fade"); })
          .append("svg:g")
          .attr("id", "circle")
          .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

          svg.append("circle")
              .attr("r", r0 + 20);

      var rdr = chordRdr(matrix, mmap);
      chord.matrix(matrix);

      var g = svg.selectAll("#chord-svg g.group")
          .data(chord.groups())
          .enter().append("#chord-svg:g")
          .attr("class", "group")
          .on("mouseover", mouseoverGroup)
          .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

      g.append("#chord-svg:path")
          .style("stroke", "black")
          .style("fill", function(d) { return fill(rdr(d).gname); })
          .attr("d", arc);

      g.append("#chord-svg:text")
          .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
          .attr("dy", ".35em")
          .style("font-family", "helvetica, arial, sans-serif")
          .style("font-size", "10px")
          .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
          .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (r0 + 26) + ")"
                + (d.angle > Math.PI ? "rotate(180)" : "");
          })
          .text(function(d) { return rdr(d).gname; });
  
          //console.log(ids);
          // find the position of the clicked element in the array of ids and then display the summary.
          $("g.group").children("text").click(function(){

            //alert("clicked "+this);
            var i = ($("g.group").children("text").index(this));
            i=i+i+1;
            $(".client-summary").removeClass("active");
            $("#"+ids[i]).addClass("active");
          });

/*            var chordPaths = svg.selectAll("#svg-chord path.chord")
              .data(chord.chords())
              .enter().append("svg:path")
              .attr("class", "chord")
              .style("stroke", function(d) { return d3.rgb(fill(rdr(d).sname)).darker(); })
              .style("fill", function(d) { return fill(rdr(d).sname); })
              .attr("d", d3.svg.chord().radius(r0))
              .on("mouseover", function (d) {
                d3.select("#tooltip")
                  .style("visibility", "visible")
                  .html(chordTip(rdr(d)))
                  .style("top", "0px")
                  .style("left", "0px")
              })
              .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });*/

        var chordPaths = svg.selectAll("#svg-chord path.chord")
              .data(chord.chords())
              .enter().append("svg:path")
              .attr("class", "chord")
              .style("stroke", function(d) { return d3.rgb(fill(rdr(d).sname)).darker(); })
              .style("fill", function(d) { return fill(rdr(d).sname); })
              .attr("d", d3.svg.chord().radius(r0))
              .on("mouseover", function (d) {
                d3.select("#tooltip")
                  .style("visibility", "visible")
                  .html(chordTip(rdr(d)))
                  .style("top", function () { return (d3.event.pageY - 700)+"px"})
                  .style("left", function () { return (d3.event.pageX - 100)+"px";})
              })
              .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

        function chordTip (d) {
          //console.log("chordTip");
          var p = d3.format(".1%"), q = d3.format(",.2r")
          return "Chord Details:<br/>"
            +  d.sname + " → " + d.tname
            + ": " + q(d.svalue) + "<br/>"
            + p(d.svalue/d.stotal) + " of " + d.sname + "'s Total (" + q(d.stotal) + ")<br/>"
            + p(d.svalue/d.mtotal) + " of Matrix Total (" + q(d.mtotal) + ")<br/>"
            + "<br/>"
            + d.tname + " → " + d.sname
            + ": " + q(d.tvalue) + "<br/>"
            + p(d.tvalue/d.ttotal) + " of " + d.tname + "'s Total (" + q(d.ttotal) + ")<br/>"
            + p(d.tvalue/d.mtotal) + " of Matrix Total (" + q(d.mtotal) + ")";
        }

        function groupTip (d) {
          //console.log(d);

          var p = d3.format(".1%"), q = d3.format(",.2r")
          return "Detail:<br/>"
              + d.gname + " : " + q(d.gvalue) + "<br/>"
              + p(d.gvalue/d.mtotal) + " of Total (" + q(d.mtotal) + ")"
        }
        /* Brian addition position is hard wired */
/*
        function mouseoverGroup(d, i) {
          d3.select("#tooltip")
            .style("visibility", "visible")
            .html(groupTip(rdr(d)))
            .style("top", "0px")
            .style("left", "0px")

          chordPaths.classed("fade", function(p) {
            return p.source.index != i
                && p.target.index != i;
          });
        }*/
         // position is based on mouse pointer

        function mouseoverGroup(d, i) {
          d3.select("#tooltip")
            .style("visibility", "visible")
            .html(groupTip(rdr(d)))
            .style("top", function () { return (d3.event.pageY - 800)+"px"})
            .style("left", function () { return (d3.event.pageX - 130)+"px";
            
            //console.log(" "+d.name);

          })

          chordPaths.classed("fade", function(p) {
            return p.source.index != i
                && p.target.index != i;
          });
        }
        
    }
}