marriageEqualityInit = function(){
  // map code to be moved here from index.html
}
function clicked(d) {

  //console.log(d);
  var i = $(d).attr("id");
  var state = getState(i);

  console.log("id= "+i);

  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

  svg.transition()
      .duration(750)
      .call(zoom.translate(translate).scale(scale).event);
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  svg.transition()
      .duration(750)
      .call(zoom.translate([0, 0]).scale(1).event);
}

function zoomed() {
  g.style("stroke-width", 1.5 / d3.event.scale + "px");
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}

getState = function(i){
  console.log("in getState for id "+i);
  var state="";
  if (i==1){state="Alabama"}
    else if(i==2){state="Alaska"}
    else if(i==3){state="3 unknown"}
    else if(i==4){state="Arizona"}
    else if(i==5){state="Arkansas"}
    else if(i==6){state="California"}
    else if(i==7){state="7 unknown"}
    else if(i==8){state="Colorado"}
    else if(i==9){state="Connecticut"}
    else if(i==10){state="Delaware"}
    else if(i==11){state="District of Columbia"}
    else if(i==12){state="Florida"}
    else if(i==13){state="Georgia"}
    else if(i==14){state="14 unknown"}
    else if(i==15){state="Hawaii"}
    else if(i==16){state="Idaho"}
    else if(i==17){state="illinois"}
    else if(i==18){state="Indiana"}
    else if(i==19){state="Iowa"}
    else if(i==20){state="Kansas"}
    else if(i==21){state="Kentucky"}
    else if(i==22){state="Louisiana"}
    else if(i==23){state="Maine"}
    else if(i==24){state="Maryland"}
    else if(i==25){state="Massachusetts"}
    else if(i==26){state="Michigan"}
    else if(i==27){state="Minnesota"}
    else if(i==28){state="Mississippi"}
    else if(i==29){state="Missouri"}
    else if(i==30){state="Montana"}
    else if(i==31){state="Nebraska"}
    else if(i==32){state="Nevada"}
    else if(i==33){state="New Hampshire"}
    else if(i==34){state="New Jersey"}
    else if(i==35){state="New Mexico"}
    else if(i==36){state="New York"}
    else if(i==37){state="North Carolina"}
    else if(i==38){state="North Dakota"}
    else if(i==39){state="Ohio"}
    else if(i==40){state="Oklahoma"}
    else if(i==41){state="Oregon"}
    else if(i==42){state="Pennsylvania"}
    else if(i==43){state="Puerto Rico"}
    else if(i==44){state="Rhode Island"}
    else if(i==45){state="South Carolina"}
    else if(i==46){state="South Dakota"}
    else if(i==47){state="Tennessee"}
    else if(i==48){state="Texas"}
    else if(i==49){state="Utah"}
    else if(i==50){state="Vermont"}
    else if(i==51){state="Virgina"}
    else if(i==53){state="Washington"}
    else if(i==54){state="West Virginia"}
    else if(i==55){state="Wisconsin"}
    else if(i==56){state="Wyoming"}
    return state;
}
getIdFromState = function(psState){
  console.log("getIdFromState");
  if (psState == "Washington")return 0;
  if (psState == "Montana")return 1;
  if (psState == "Idaho")return 2;
  if (psState == "North Dakota")return 3;
  if (psState == "Minnesota")return 4;
  if (psState == "Maine")return 5;
  if (psState == "Michigan")return 6;
  if (psState == "Wisconsin")return 7;
  if (psState == "Oregon")return 8;
  if (psState == "South Dakota")return 9;
  if (psState == "New Hampshire")return 10;
  if (psState == "Vermont")return 11;
  if (psState == "New York")return 12;
  if (psState == "Wyoming")return 13;
  if (psState == "Iowa")return 14;
  if (psState == "Nebraska")return 15;
  if (psState == "Massachusetts")return 16;
  if (psState == "Illinois")return 17;
  if (psState == "Pennsylvania")return 18;
  if (psState == "Connecticut")return 19;
  if (psState == "Rhode Island")return 20;
  if (psState == "California")return 21;
  if (psState == "Utah")return 22;
  if (psState == "Nevada")return 23;
  if (psState == "Ohio")return 24;
  if (psState == "Indiana")return 25;
  if (psState == "New Jersey")return 26;
  if (psState == "Colorado")return 27;
  if (psState == "West Virginia")return 28;
  if (psState == "Missouri")return 29;
  if (psState == "Kansas")return 30;
  if (psState == "Delaware")return 31;
  if (psState == "Maryland")return 32;
  if (psState == "Virginia")return 33;
  if (psState == "Kentucky")return 34;
  if (psState == "District of Columbia")return 35;
  if (psState == "Arizona")return 36;
  if (psState == "Oklahoma")return 37;
  if (psState == "New Mexico")return 38;
  if (psState == "Oklahoma")return 39;
  if (psState == "North Carolina")return 40;
  if (psState == "Texas")return 41;
  if (psState == "Arkansas")return 42;
  if (psState == "South Carolina")return 43;
  if (psState == "Alabama")return 44;
  if (psState == "Georgia")return 45;
  if (psState == "Mississippi")return 46;
  if (psState == "Louisiana")return 47;
  if (psState == "Florida")return 48;
  if (psState == "Hawaii")return 49;
  if (psState == "Alaska")return 50;

}