marriageEqualityInit = function(){
  // map code to be moved here from index.html
}
function clicked(d) {
  // state has been clicked on
  var i = $(d).attr("id");
  var state = getState(i);

  //console.log("state id = "+state+" "+i);
  //var x = $("#map-container").children("g").children("path.feature").index(d);

  if ($("#slider-me-title").html()==state){
      // zoom out
      $("#slider-me").addClass("active");
      $("#slider-me-add-year").addClass("active");
      var iTemp = $("#slider-me").slider('option','value');
      $("#slider-me").slider('value', iTemp);
  } else {
      // zoom in on state
      $("#slider-me").removeClass("active");
      $("#slider-me-add-year").removeClass("active");
      $("#slider-me-description").html(getStateActivity(state));  
      $("#slider-me-title").html(state);
  }
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
resetMap = function(){
  for (i=0;i<51;i++){
    if (i==35){
      //skip - not defined in this data set
    } else {
      $("#map-container").children("g").children("path").eq(i).css("fill","lightgrey");              
    }
  }
}

getStateActivity = function(psState){
  var sReturn="";
  if (psState=="Arkansas"){

    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas,Georgia,Kentucky,Michigan,North Dakota,Mississippi,Montana,Oregon,Oklahoma,Ohio,Utah)</p>';
    sReturn += '<p>2014: Arkansas Circuit Judge Chris Piazza issues a ruling in Arkansas striking down the state&#39s ban on same-sex couples from marrying. The decision takes effect immediately, and over the next week, more than 400 same-sex couples receive marriage licenses in Arkansas.</p>';
  }
  if (psState=="Arizona"){
    sReturn += '<p>2006: Arizona becomes the first state to reject an anti-gay marriage amendment at the ballot.</p>';
    sReturn += '<p>2008: Anti-gay forces in California push through Proposition 8, an anti-gay constitutional amendment that strips away same-sex couples’ freedom to marry and restricts marriage to different-sex couples. Similar amendments are passed in Florida and Arizona.</p>';
    sReturn += '<p>2014: Following the 9th Circuit ruling taking effect, federal judges in Arizona and Wyoming struck down marriage bans, and state officials quickly after announced that they would not appeal, allowing the rulings to take effect once and for all.</p>';
  }
  if (psState=="California"){
    sReturn +='<p>1999: California becomes the first state to create a domestic partnership statute, allowing same-sex couples to receive some, but not all, of the protections afforded by marriage.</p>';
    sReturn += '<p>2005: The California legislature becomes the first state legislature to pass a freedom to marry bill. The landmark bill is vetoed soon after passage by Governor Arnold Schwarzenegger.</p>';
    sReturn +='<p>2008: The California Supreme Court determines in "In Re: Marriage Cases," a case brought by Lambda Legal, the American Civil Liberties Union, and the National Center for Lesbian Rights, that a state statute excluding same-sex couples from marriage is unconstitutional.</p>';
    sReturn += '<p>2008: Anti-gay forces in California push through Proposition 8, an anti-gay constitutional amendment that strips away same-sex couples’ freedom to marry and restricts marriage to different-sex couples. Similar amendments are passed in Florida and Arizona.</p>';
    sReturn += '<p>2009: The California Supreme Court rules, in a case brought by Lambda Legal, the ACLU and NCLR, that, notwithstanding Prop 8, marriages between same-sex couples that occurred in the four months between June and November remain valid.</p>';
    sReturn += '<p>2010: The U.S. District Court of Northern California declares, in a case brought by the American Foundation for Equal Rights, that Proposition 8 violates the U.S. Constitution’s due process and equal protection clauses, finding it unconstitutional to exclude same-sex couples from marriage.</p>';
    sReturn += '<p>2011: The U.S. Bankruptcy Court for the Central District of California in Los Angeles releases an opinion finding Section 3 of the so-called Defense of Marriage Act unconstitutional.</p>';
    sReturn += '<p>2012: The U.S. Ninth Circuit Court of Appeals upholds the August 4 ruling that found that Proposition 8 in California violates the U.S. Constitution.</p>';
    sReturn += '<p>2012: The full U.S. Court of Appeals for the Ninth Circuit denies anti-gay activists&#39 petition for an en banc rehearing of the Proposition 8 case.</p>';
    sReturn += '<p>2012: The U.S. Supreme Court announces that it will hear two marriage cases at the federal level - Windsor v. United States, which the ACLU filed to take on DOMA, and Hollingsworth v. Perry, which the American Foundation for Equal Rights filed to challenge California&#39s Proposition 8.</p>';
    sReturn += '<p>2013: The United States Supreme Court hears oral arguments in two landmark marriage cases: Hollingsworth v. Perry, the challenge to California&#39s Proposition 8, and Windsor v. United States, a challenge to the so-called Defense of Marriage Act.</p>';
  }
  if (psState=="Colorado"){
    sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
    sReturn += '<p>2014: District Court Judge Scott Crabtree in Colorado state court strikes down the state&#39s law denying the freedom to marry to same-sex couples. The decision is stayed before it can take effect. Just weeks later, a federal judge in Colorado rules in a separate case that denying the freedom to marry is unconstitutional.</p>';
  }
  if (psState=="Connecticut"){
    sReturn += '<p>2005: Connecticut Governor Jodi Rell signs a civil union bill into law, affording same-sex couples some – but not all – of the projections that marriage provides.</p>';
    sReturn += '<p>2012: In Connecticut, U.S. District Court Judge Vanessa Bryant finds the Defense of Marriage Act unconstitutional in &#39Pedersen v. Office of Personnel Management.&#39</p>';
  }
  if (psState=="Delaware"){
    sReturn = '<p>2011: Illinois Governor Pat Quinn signs a civil union bill into law after it is approved by the state Senate and House of Representatives. Later in 2011, civil union laws are also approved in Hawaii, Delaware, and Rhode Island.</p>';
    sReturn += '<p>2013: Delaware Governor Jack Markell signs a freedom to marry bill into law immediately after it is approved by the Delaware Senate.</p>';
  }
  if (psState=="District of Columbia"){
    sReturn += '<p>2009: District of Columbia Mayor Adrian Fenty signs a freedom to marry bill into law after it passes by a large majority of City Council members.</p>';
  }
  if (psState=="Florida"){
    sReturn += '<p>2008: Anti-gay forces in California push through Proposition 8, an anti-gay constitutional amendment that strips away same-sex couples’ freedom to marry and restricts marriage to different-sex couples. Similar amendments are passed in Florida and Arizona.</p>';
    sReturn += '<p>2014: Chief Circuit Judge Luis Garcia rules in Florida state court that Florida&#39s law denying same-sex couples the freedom to marry is unconstitutional.</p>';
  }
  if (psState=="Georgia"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas,Georgia,Kentucky,Michigan,North Dakota,Mississippi,Montana,Oregon,Oklahoma,Ohio,Utah)</p>';
  }
  if (psState=="Hawaii"){
    sReturn += '<p>1993: The Hawaii Supreme Court rules in &#39Baehr v. Lewin&#39 that denying marriage to same-sex couples violates the Equal Protection Clause of the Hawaii Constitution.</p>';
    sReturn += '<p>1996: Following the world&#39s first-ever trial on the freedom to marry, led by co-counsel Dan Foley and Evan Wolfson, Judge Kevin Chang in Hawaii rules that the state did not have a legitimate reason for depriving same-sex couples of the freedom to marry.';
    sReturn += '<p>1998: Anti-gay forces succeed in amending the Hawaii Constitution so as to prevent the courts from ending the exclusion of same-sex couples; under the Amendment, only the legislature can now cure that discrimination, notwithstanding the Equal Protection Clause.</p>';
    sReturn += '<p>1999: The Hawaii Supreme Court, bound by the new restrictive constitutional amendment, dismisses the couples&#39 challenge and leaves standing the denial of marriage.</p>';
    sReturn = '<p>2011: Illinois Governor Pat Quinn signs a civil union bill into law after it is approved by the state Senate and House of Representatives. Later in 2011, civil union laws are also approved in Hawaii, Delaware, and Rhode Island.</p>';
    sReturn += '<p>2013: Governor Neil Abercrombie signed the freedom to marry into law in Hawaii after a three-week Special Session where legislators discussed why marriage matters to same-sex couples and their families.</p>';
  }
  if (psState=="Idaho"){
      sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
      sReturn += '<p>2014: U.S. Magistrate Candy Dale issues a ruling in Idaho striking down the state&#39s ban on same-sex couples from marrying.</p>';
      sReturn += '<p>2014: The United States Court of Appeals for the 9th Circuit becomes the fourth federal appellate court to rule in favor of the freedom to marry when it rules in favor of same-sex couples in marriage cases from Idaho and Nevada.</p>';
  }
  if (psState=="Iowa"){
    sReturn = '<p>2009: The Iowa Supreme Court hands down a unanimous decision in favor of the freedom to marry in &#39Varnum v. Brien,&#39 a case brought by Lambda Legal.</p>';
  }
  if (psState=="Illinois"){
    sReturn = '<p>2011: Illinois Governor Pat Quinn signs a civil union bill into law after it is approved by the state Senate and House of Representatives. Later in 2011, civil union laws are also approved in Hawaii, Delaware, and Rhode Island.</p>';
    sReturn += '<p>2013: Governor Pat Quinn signed the freedom to marry into law in Illinois after it was approved earlier in the year by the Illinois Senate and House.</p>';
  }
  if (psState=="Indiana"){
   sReturn += '<p>2014: U.S. District Judge Richard L. Young strikes down anti-marriage laws in Indiana.</p>';
   sReturn += '<p>2014: In a unanimous victory, the U.S. Court of Appeals for the 7th Circuit becomes the third federal appellate court to affirm the freedom to marry when it upholds the trial court ruling in three Indiana marriage cases and Wisconsin&#39s Wolf v. Walker.</p>';
   sReturn += '<p>2014: The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
  }
  if (psState=="Kansas"){
   sReturn += '<p>2005: The discriminatory constitutional amendment Proposition 2 is passed in Texas, constitutionally excluding same-sex couples from marriage. Same-sex couples in Kansas are denied any form of family recognition by a similar anti-gay constitutional amendment.</p>';    
  }

  if (psState=="Kentucky"){
    sReturn += '<p>1973: The Kentucky Court of Appeals rules in &#39Jones v. Hallahan&#39 that same-sex couples may not marry. The case comes after Marjorie Jones and Tracy Knight applied for and were denied a marriage license in Jefferson County, KY. </p>';
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn += '<p>2014: U.S. District Court Judge John G. Heyburn II (appointed by President George H.W. Bush) issues a ruling in Kentucky ordering the state to respect the marriages of same-sex couples legally performed in other states.</p>';
  }
  if (psState=="Louisiana"){
    sReturn = '<p>2005: The Louisiana Supreme Court reinstates a hurtful anti-family ban on marriage between same-sex couples, bringing the number of states with constitutional amendments against marriage to 17.</p>';
  }
  if (psState=="Maine"){
   sReturn += '<p>2009: Maine Governor John Baldacci signs a freedom to marry bill into law previously approved by the state Senate and House of Representatives.</p>';
   sReturn += '<p>2009: Anti-gay forces in Maine push through an anti-gay ballot measure to overturn the freedom to marry in the state and restrict marriage to different-sex couples.</p>';
   sReturn = '<p>2012: The Maine Freedom to Marry Coalition delivers more than 105,000 signatures to the Secretary of State to place a citizen’s initiative on the November 2012 ballot. The measure would allow same-sex couples to receive a marriage license while also protecting religious freedom.</p>';
   sReturn += '<p>2012: The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
  }
  if (psState=="Maryland"){
    sReturn+= '<p>1973: Maryland becomes the first state to pass a statute banning marriage between same-sex couples when it includes in its Family Law Code a line reading, &ldquo;Only a marriage between a man and a woman is valid in this State.&rdquo;</p>';
    sReturn += '<p>2008: Maryland Governor Martin O’Malley signs into law a domestic partnership bill allowing same-sex couples in Maryland some – but not all – of the benefits that marriage affords.</p>';
    sReturn += '<p>2012: Maryland Governor Martin O’Malley signs the freedom to marry into law after it passes out of the state Senate and House.</p>';
    sReturn += '<p>2012: The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
   sReturn += '<p>2012: The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
  }
  if (psState=="Massachusetts"){
    sReturn = '<p>2003: Massachusetts Superior Judicial Court rules ban on same sex marriage unconstitutional</p>';
    sReturn = '<p>2004: Massachuessetts legislature passes law allowing same sex marriage.</p>'; 
    sReturn = '<p>2010: A U.S. District Court rules in &#39Gill v. Office of Personnel Management&#39 (a case brought by Gay & Lesbian Advocates & Defenders) and &#39Commonwealth of Massachusetts v. United States Department of Health and Human Services&#39 (a case brought by MA Attorney General Martha Coakley) that DOMA’s Section 3, which restricts marriage to different-sex couples, is unconstitutional.</p>';
    sReturn += '<p>2012: The U.S. First Circuit Court of Appeals finds the Defense of Marriage Act unconstitutional in two cases: &#39Gill v. Office of Personnel Management&#39 (brought by Gay & Lesbian Advocates & Defenders) and &#39Massachusetts v. United States Department of Health and Human Services&#39 (brought by MA Attorney General Martha Coakley).</p>';
  }
  if (psState=="Michigan"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn += '<p>2014: U.S. District Judge Bernard Friedman issues a ruling in Michigan in favor of the freedom to marry for same-sex couples, following a two-week trial on why marriage matters. The ruling takes effect immediately, and for nearly 24 hours, same-sex couples have the freedom to marry in Michigan.</p>';
  }
  if (psState=="Minnesota"){
    sReturn += '<p>1972: The U.S. Supreme Court dismisses Baker v. Nelson (291 Minnesota 310, 191 N.W.2d 185 (1971)), one of three cases brought by same-sex couples, challenging the denial of marriage. </p>';
    sReturn += '<p>2012: The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
    sReturn += '<p>2013: Minnesota Governor Mark Dayton signs a freedom to marry bill into law after both houses of the Minnesota legislature overwhelmingly approve the marriage bill.</p>';
  }
  if (psState=="Mississippi"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
  }
  if (psState=="Missouri"){
    sResult += '<p>2014: After a wave of several limited pro-marriage rulings in Missouri, U.S. District Court Judge Ortrie D. Smith rules in favor of the freedom to marry in a federal case from Missouri, striking down the state&#39s marriage ban.</p>';
  }
  if (psState=="Montana"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
  }
  if (psState=="Nebraska"){
    sReturn = '<p>2000: Anti-gay forces in Nebraska push through the discriminatory Initiative Measure 416 at the ballot, constitutionally prohibiting the state from respecting any form of family status or recognition for same-sex couples.</p>';
  }
  if (psState=="Nevada"){
    sReturn += '<p>2009: Nevada approves a broad domestic partnership bill after the state legislature overrides a veto from the state’s governor. Later that summer, Wisconsin also approves a less expansive domestic partnership bill.</p>';
    sReturn += '<p>2014: The United States Court of Appeals for the 9th Circuit becomes the fourth federal appellate court to rule in favor of the freedom to marry when it rules in favor of same-sex couples in marriage cases from Idaho and Nevada.</p>';
  }
  if (psState=="New Hampshire"){
    sReturn += '<p>2009: New Hampshire Governor John Lynch signs into law a freedom to marry bill approved by the state Senate and House of Representatives.</p>';
  }
  if (psState=="New Jersey"){
    sReturn = '<p>2006: The New Jersey Supreme Court issues a unanimous ruling in &#39Lewis v. Harris&#39 (a case brought by Lambda Legal) that same-sex couples are entitled to all state-level spousal rights and responsibilities.</p>';
    sReturn += '<p>2012: The New Jersey legislature approves the freedom to marry, but soon after, New Jersey Governor Chris Christie vetoes the bill.</p>';
    sReturn += '<p>2013: Same-sex couples begin marrying at midnight in New Jersey after a court ruling declaring the freedom to marry across the state. Just hours after weddings begin in NJ, Gov. Chris Christie drops his appeal, halting efforts to restrict marriage to different-sex couples.</p>';
  }
  if (psState=="New Mexico"){
    sReturn += '<p>2013: The New Mexico Supreme Court issues a landmark decision in a lawsuit brought by the National Center for Lesbian Rights seeking clarification on laws regarding the freedom to marry in the state. The ruling affirmed the freedom to marry in every county in the state, making New Mexico the 17th state where same-sex couples can marry.</p>';
  }
  if (psState=="New York"){
    sReturn += '<p>2011: New York Governor Andrew Cuomo signs a freedom to marry bill into law, more than doubling the number of Americans living in a state with the freedom to marry.</p>';
  }
  if (psState=="North Carolina"){
    sReturn += '<p>2012: Voters in North Carolina approve a constitutional amendment that bans all forms of relationship recognition for same-sex couples.</p>';
  }
  if (psState=="North Dakota"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
  }
  if (psState=="Ohio"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn += '<p>2014: U.S. District Judge Timothy Black issues a ruling in Ohio declaring that the state must respect the marriages of same-sex couples legally performed in other states.</p>';
  }
  if (psState=="Oklahoma"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn = '<p>2014: U.S. District Court Judge Terence Kern issues a ruling in favor of the freedom to marry in Oklahoma, a tremendous step forward for same-sex couples in the state.</p>';
    sReturn += '<p>2014: The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
  }
  if (psState=="Oregon"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn += '<p>2014: U.S. District Judge Michael McShane issues a ruling in Oregon striking down the state&#39s ban on marriage for same-sex couples.</p>';
  }
  if (psState=="Pennsylvania"){
    sReturn += '<p>2014: U.S. District Judge John E. Jones III strikes down Pennsylvania&#39s ban on marriage for same-sex couples.</p>';
  }
  if (psState=="Rhode Island"){
    sReturn = '<p>2011: Illinois Governor Pat Quinn signs a civil union bill into law after it is approved by the state Senate and House of Representatives. Later in 2011, civil union laws are also approved in Hawaii, Delaware, and Rhode Island.</p>';
    sReturn += '<p>2013: Rhode Island Governor Lincoln Chafee signs a freedom to marry bill into law hours after it is approved by the Rhode Island Senate. The bill had already been approved overwhelmingly by the RI House.</p>';
  }
  if (psState=="South Carolina"){
      sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
  }
  if (psState=="South Dakota"){
      sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
  }
  if (psState=="Tennessee"){
      sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
  }
  if (psState=="Texas"){
   sReturn += '<p>2005: The discriminatory constitutional amendment Proposition 2 is passed in Texas, constitutionally excluding same-sex couples from marriage. Same-sex couples in Kansas are denied any form of family recognition by a similar anti-gay constitutional amendment.</p>';    
   sReturn += '<p>2014: U.S. District Judge Orlando Garcia issues a ruling in Texas in favor of the freedom to marry for same-sex couples.</p>';
  }
  if (psState=="Utah"){
    sReturn += '<p>2004: Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota, Ohio, Oklahoma, Oregon, Utah)</p>';
    sReturn += '<p>2013: U.S. District Court Judge Robert J. Shelby issues a ruling declaring that laws prohibiting same-sex couples from marrying in Utah are unconstitutional, conflicting with the U.S. Constitution&#39s guarantees of equal protection and due process under the law.</p>';
    sReturn += '<p>2014: The U.S. Court of Appeals for the 10th Circuit upholds the trial court ruling in Utah&#39s Kitchen v. Herbert, agreeing that banning same-sex couples from marrying is unconstitutional.</p>';
    sReturn += '<p>2014: The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
  }
  if (psState=="Vermont"){
    sReturn += '<p>1999: The Vermont Supreme Court rules in &#39Baker v. State of Vermont&#39 (a case brought by Gay & Lesbian Advocates & Defenders) that same-sex couples must be treated equally to different-sex married couples.</p>';
    sReturn += '<p>2009: Vermont pushes past civil union and embraces the freedom to marry when the state legislature overwhelmingly votes to override a veto from Governor Jim Douglas.</p>';
  }
  if (psState=="Virginia"){
    sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
    sReturn += '<p>2014: U.S. District Judge Arenda L. Wright Allen issues a ruling in Virginia in favor of the freedom to marry for same-sex couples.</p>';
    sReturn += '<p>2014: The United States Court of Appeals for the 4th Circuit becomes the second federal appellate court to rule in favor of the freedom to marry when it upholds the trial court ruling in Virginia&#39s Bostic v. Schaefer.</p>';
    sReturn += '<p>2014: The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
 }
  if (psState=="Washington"){
    sReturn += '<p>1974: The Court of Appeals of Washington denies the case of Seattle residents John Singer and Paul Barwick, who challenged the denial of the freedom to marry to same-sex couples.</p>';
    sReturn +='<p>2007: Washington state Governor Christine Gregoire signs a domestic partnership bill into law. In the weeks that follow, Oregon Governor Ted Kulongski and New Hampshire Governor John Lynch also sign a domestic partnership law and a civil union law, respectively.</p>';
    sReturn += '<p>2012: Washington Governor Christine Gregoire signs the freedom to marry into law after the state Senate and House approve it.</p>';
    sReturn += '<p>2012: The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
  }
  if (psState=="Wisconsin"){
    sReturn += '<p>2006: Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
    sReturn += '<p>2009: Nevada approves a broad domestic partnership bill after the state legislature overrides a veto from the state’s governor. Later that summer, Wisconsin also approves a less expansive domestic partnership bill.</p>';
    sReturn += '<p>2014: U.S. District Judge Barbara Crabb strikes down Wisconsin&#39s ban on marriage for same-sex couples.</p>';
    sReturn += '<p>2014: The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
  }
  if (psState=="Wyoming"){
    sReturn += '<p>2014: Following the 9th Circuit ruling taking effect, federal judges in Arizona and Wyoming struck down marriage bans, and state officials quickly after announced that they would not appeal, allowing the rulings to take effect once and for all.</p>';
  }
  console.log(psState+" " +sReturn);
  return sReturn; 
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
  if (psState == "Tennessee")return 39;
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