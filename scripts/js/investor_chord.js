var HEIGHT = 600;
var WIDTH = 900;
populateInvestorChordIssues = function(){  
  //$("#chord-legend").children(".button").removeClass("active");
  //document.getElementById("load-issues").classList.add("active");
  populateInvestorChord("./data/impact_investors/impact_investors_ten_issues.json","chord-svg-issues");
}    

populateInvestorChordIssuesAll = function(){ 
  //$("#chord-legend").children(".button").removeClass("active");
  //document.getElementById("load-issues-all").classList.add("active");
  populateInvestorChord('./data/impact_investors/impact_investors_all_issues.json',"chord-svg-issues-all");
}

populateInvestorChordStyles = function(){ 
  //$("#chord-legend").children(".button").removeClass("active");
  //document.getElementById("load-styles").classList.add("active");
  populateInvestorChord('./data/impact_investors/impact_investors_styles_all.json',"chord-svg-styles");
}
populateInvestorChordAmounts = function(){ 
  //$("#chord-legend").children(".button").removeClass("active");
  //document.getElementById("load-amounts").classList.add("active");
  populateInvestorAmounts('./data/impact_investors/impact_investors_amounts.json',"chord-svg-amounts");
}

populateInvestorAmounts = function(psFilename,psChordId){
    console.log("pia start");
    psParent = "#chord-amount";
    var sChordId = psChordId; //"chord-svg-amounts";


/*    if (document.getElementById("chord-svg-issues")){
      document.getElementById("chord-svg-issues").classList.remove('active');
    }

    if (document.getElementById("chord-svg-issues-all")){
      document.getElementById("chord-svg-issues-all").classList.remove('active');
    }
    if (document.getElementById("chord-svg-styles")){
      document.getElementById("chord-svg-styles").classList.remove('active');
    }
    if (document.getElementById(sChordId)){
      document.getElementById(sChordId).classList.add('active');
    }
*/
    if (document.getElementById(sChordId)) return;
    console.log("pia middle");
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

    var width = WIDTH,
        height = HEIGHT,
        r1 = height / 2,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1,
        outer

    var svg = d3.select(psParent).append("svg")
        .attr("width", width+200)
        .attr("height", height+200)
        .attr("class","chord-svg active")
        .attr("id","chord-svg-amounts")        
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
    console.log("pia end");
}

populateInvestorChord = function(psFilename,psChordId,psParent){    
    //alert("file name is "+psFilename+" "+psChordId);
    //*******************************************************************
    //  CREATE MATRIX AND MAP
    //*******************************************************************
    //$("#chord-svg-issues").removeClass("active");
    //$("#chord-svg-styles").removeClass("active");
    //$(".chord-svg").children("svg").removeClass("active");

/*    if (document.getElementById("chord-svg-issues")){
      document.getElementById("chord-svg-issues").classList.remove('active');
    }
    if (document.getElementById("chord-svg-issues-all")){
      document.getElementById("chord-svg-issues-all").classList.remove('active');
    }
    if (document.getElementById("chord-svg-styles")){
      document.getElementById("chord-svg-styles").classList.remove('active');
    }
    if (document.getElementById("chord-svg-amounts")){
      document.getElementById("chord-svg-amounts").classList.remove('active');
    }
    if (document.getElementById(psChordId)){
      document.getElementById(psChordId).classList.add('active');
    }
*/

    if (document.getElementById(psChordId)) return;
    var oldCursor = document.body.style.cursor;
    document.body.style.cursor = "wait";

    if (psChordId == "chord-svg-issues"){
      issues_ids = new Array();
      psParent = "#chord-issues";
    }
    if (psChordId == "chord-svg-issues-all"){
      issues_all_ids = new Array();
      psParent = "#chord-issues-all";
    }
    if (psChordId == "chord-svg-styles"){
      styles_ids = new Array();
      psParent = "#chord-styles";
    }

    d3.json(psFilename, function (error, data) {

      var mpr = chordMpr(data);

      _.each(data, function (elem) {
        //console.log(elem.id);

        if (psChordId == "chord-svg-issues"){
          issues_ids[issues_ids.length] = elem.id;
        }
        if (psChordId == "chord-svg-issues-all"){
          issues_all_ids[issues_all_ids.length] = elem.id;
        }
        if (psChordId == "chord-svg-styles"){
          styles_ids[styles_ids.length] = elem.id;
        }

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
    drawChords(mpr.getMatrix(), mpr.getMap(),psParent);
    document.body.style.cursor = oldCursor;
  });



    function name(name) {
      return name.substring(0, name.lastIndexOf(".")).substring(6);
    }
    //*******************************************************************
    //  DRAW THE CHORD DIAGRAM
    //*******************************************************************
    function drawChords (matrix, mmap,parent) {
      var w = WIDTH, h = HEIGHT, r1 = h / 2, r0 = r1 - 100;

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

      var svg = d3.select(parent).append("svg:svg")
          .attr("width", w)
          .attr("height", h)
          .attr("id",psChordId)
          .attr("class","active chord-svg")
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

//      var g = svg.selectAll("#chord-svg g.group")
      var g = svg.selectAll("#"+psChordId+" g.group")
          .data(chord.groups())
          .enter().append("#"+psChordId+":g")
          .attr("class", "group")
          .on("mouseover", mouseoverGroup)
          .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

      g.append("#"+psChordId+":path")
          .style("stroke", "black")
          .style("fill", function(d) { return fill(rdr(d).gname); })
          .attr("d", arc);

      g.append("#"+psChordId+":text")
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
          $("#"+psChordId+" g.group").children("text").click(function(){
            //open panel: $("#inside-a").panel("open");
            var i = ($("#"+psChordId+" g.group").children("text").index(this));
            
            $(".client-summary").removeClass("active");

            if (psChordId == "chord-svg-issues"){
              $("#"+issues_ids[i]).addClass("active");
             console.log("id is "+issues_ids[i]);
            }
            if (psChordId == "chord-svg-issues-all"){
              $("#"+issues_all_ids[i]).addClass("active");
             console.log("id is "+issues_all_ids[i]);
            }
            if (psChordId == "chord-svg-styles"){
              $("#"+styles_ids[i]).addClass("active");
             console.log("id is "+styles_ids[i]);
            }
            //$("#"+ids[i]).addClass("active");
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

        var chordPaths = svg.selectAll("#"+psChordId+" path.chord")
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
/*chordMpr = function(){
 var mpr = {}, mmap = {}, n = 0,
      matrix = [], filter, accessor;

  mpr.setFilter = function (fun) {
    filter = fun;
    return this;
  },
  mpr.setAccessor = function (fun) {
    accessor = fun;
    return this;
  },
  mpr.getMatrix = function () {
    matrix = [];
    _.each(mmap, function (a) {
      if (!matrix[a.id]) matrix[a.id] = [];
      _.each(mmap, function (b) {
       var recs = _.filter(data, function (row) {
          return filter(row, a, b);
        })
        matrix[a.id][b.id] = accessor(recs, a, b);
      });
    });
    return matrix;
  },
  mpr.getMap = function () {
    return mmap;
  },
  mpr.printMatrix = function () {
    _.each(matrix, function (elem) {
      console.log(elem);
    })
  },
  mpr.addToMap = function (value, info) {
    if (!mmap[value]) {
      mmap[value] = { name: value, id: n++, data: info }
    }
  },
  mpr.addValuesToMap = function (varName, info) {
    var values = _.uniq(_.pluck(data, varName));
    _.map(values, function (v) {
      if (!mmap[v]) {
        mmap[v] = { name: v, id: n++, data: info }
      }
    });
    return this;
  }
  return mpr;
}*/
// blog-post - http://www.delimited.io/blog/2013/12/8/chord-diagrams-in-d3
//*******************************************************************
// CHORD MAPPER
//*******************************************************************
/*function chordMpr (data) {
var mpr = {}, mmap = {}, n = 0,
matrix = [], filter, accessor;
 
mpr.setFilter = function (fun) {
filter = fun;
return this;
},
mpr.setAccessor = function (fun) {
accessor = fun;
return this;
},
mpr.getMatrix = function () {
matrix = [];
_.each(mmap, function (a) {
if (!matrix[a.id]) matrix[a.id] = [];
_.each(mmap, function (b) {
var recs = _.filter(data, function (row) {
return filter(row, a, b);
})
matrix[a.id][b.id] = accessor(recs, a, b);
});
});
return matrix;
},
mpr.getMap = function () {
return mmap;
},
mpr.printMatrix = function () {
_.each(matrix, function (elem) {
console.log(elem);
})
},
mpr.addToMap = function (value, info) {
if (!mmap[value]) {
mmap[value] = { name: value, id: n++, data: info }
}
},
mpr.addValuesToMap = function (varName, info) {
var values = _.uniq(_.pluck(data, varName));
_.map(values, function (v) {
if (!mmap[v]) {
mmap[v] = { name: v, id: n++, data: info }
}
});
return this;
}
return mpr;
}*/
//*******************************************************************
// CHORD READER
//*******************************************************************
/*function chordRdr (matrix, mmap) {
return function (d) {
var i,j,s,t,g,m = {};
if (d.source) {
i = d.source.index; j = d.target.index;
s = _.where(mmap, {id: i });
t = _.where(mmap, {id: j });
m.sname = s[0].name;
m.sdata = d.source.value;
m.svalue = +d.source.value;
m.stotal = _.reduce(matrix[i], function (k, n) { return k + n }, 0);
m.tname = t[0].name;
m.tdata = d.target.value;
m.tvalue = +d.target.value;
m.ttotal = _.reduce(matrix[j], function (k, n) { return k + n }, 0);
} else {
g = _.where(mmap, {id: d.index });
m.gname = g[0].name;
m.gdata = g[0].data;
m.gvalue = d.value;
}
m.mtotal = _.reduce(matrix, function (m1, n1) {
return m1 + _.reduce(n1, function (m2, n2) { return m2 + n2}, 0);
}, 0);
return m;
}
} */