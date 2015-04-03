    // d3-processing.js

    // var diameter = 500,
    //     radius = 250,
    //     innerRadius = radius - 120;


    // var cluster = d3.layout.cluster()
    //       .size([360, innerRadius])
    //       .sort(null)
    //       .value(function(d) { return d.tripduration; });
   

    // var bundle = d3.layout.bundle();

    // var line = d3.svg.line.radial()
    //     .interpolate("bundle")
    //     .tension(.85)
    //     .radius(function(d) { 
    //       return d.y; })
    //     .angle(function(d) { 
    //         return d.x / 180 * Math.PI; });

    // var svg = d3.select("#chord").append("svg")
    //       .attr("width", diameter)
    //       .attr("height", diameter)
    //       .append("g")
    //       .attr("transform", "translate(" + radius + "," + radius + ")");

    // var link = svg.append("g").selectAll(".link"),
    //     node = svg.append("g").selectAll(".node");  

    //     d3.csv("data/investors_issues_fpp.csv", function(error, data){
    //       var hier = packageHierarchy(data);
    //       var nodes = cluster.nodes(hier);
    //       var links = getEdges(nodes);

    //          link = link
    //           .data(bundle(links))
    //           .enter().append("path")
    //           .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
    //           .attr("class", "link")
    //           .attr("d", line);

    //         node = node
    //           .data(nodes.filter(function(n) { return !n.children; }))
    //           .enter().append("text")
    //           .attr("class", "node")
    //           .attr("dy", ".31em")
    //           .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
    //           .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    //           .text(function(d) { return d.key; })
    //           .on("mouseover", mouseovered)
    //           .on("mouseout", mouseouted);
    //             });

    //     function transformator(d) {
    //         var trans = "rotate(" + (d.x) + ")translate(" + -d.y + ")";

    //         if (0<d.x && d.x<=90)
    //           trans+="rotate(0)";

    //         if (90<d.x && d.x<=180)
    //           trans+="rotate(180)";

    //         if (180<d.x && d.x<=270)
    //           trans+="rotate(175)";

    //         if (270<d.x && d.x<=360)
    //           trans+="rotate(5)";

    //         return trans;
    //       }

    //     function mouseovered(d) {
    //       node
    //           .each(function(n) { n.target = n.source = false; console.log("moveover node");});

    //       link
    //           .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
    //           .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
    //         .filter(function(l) { return l.target === d || l.source === d; })
    //           .each(function() { this.parentNode.appendChild(this); });

    //       node
    //           .classed("node--target", function(n) { return n.target; })
    //           .classed("node--source", function(n) { return n.source; });
    //     }

    //     function mouseouted(d) {
    //       link
    //           .classed("link--target", false)
    //           .classed("link--source", false);

    //       node
    //           .classed("node--target", false)
    //           .classed("node--source", false);
    //     }  

    //     function packageHierarchy(classes){
    //       //console.log(classes);
    //       var map = {};

    //       function find(name, data) {       
    //          //console.log(name);
    //       // var node = map[name], i;  
    //         var node = map[name], i;           
    //         if (!node) {
    //           node = map[name] = data || {name: name, children: []};
    //            if(name.length){
    //               if(name === "station"){
    //                 node.parent = find("");
    //               }else
    //                 node.parent = find("station");
    //                 node.parent.children.push(node);
    //                 node.key = name.substring(i + 1);
    //            }
    //         }
    //          return node;
    //         }
    //       classes.forEach(function(d) {
    //           find(d.name, d);
    //            // console.log(d);
    //            //console.log(d.name); 
    //          });
    //         return map[""];
    //     }


    //     function getEdges(nodes){
    //       console.log("nodes");
    //       var map = {},
    //           edges = [];

    //       // Compute a map from name to node.
    //       nodes.forEach(function(d) {
    //         map[d.name] = d;
    //       });

    //       // For each import, construct a link from the sourFce to target node.
    //       nodes.forEach(function(d) {
    //         if (typeof d.direction !== 'undefined')
    //           edges.push({source: map[d.name], target: map[d.direction]});
    //       });

    //       return edges;
    //     }