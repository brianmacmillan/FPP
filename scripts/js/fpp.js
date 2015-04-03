initEventHandlers = function(){


}
pageCreate = function(){
	
	$( "body > [data-role='panel']" ).panel();
	$( "body > [data-role='panel'] [data-role='listview']" ).listview();

	var objActivePage = $( ":mobile-pagecontainer").pagecontainer( "getActivePage" );
	var sPageId = $(objActivePage).attr("id");
	if (sPageId=="f"){
		//$.fn.uislider = $.fn.slider;
		$("#marriage-equality svg").attr("id","map-container");
	}
}
pageShow = function(){
  $( "body > [data-role='header']" ).toolbar();
      $( "body > [data-role='header'] [data-role='navbar']" ).navbar();
      var objActivePage = $( ":mobile-pagecontainer").pagecontainer( "getActivePage" );
      var sPageId = $(objActivePage).attr("id");
      if (sPageId=="a"){
        console.log("current page is "+sPageId);
        $("body > div > h1").text("Impact Investors Ten Reform Issues");
        if ($("#chord-svg-issues").length==0){
          populateInvestorChord("./data/impact_investors/impact_investors_ten_issues.json","chord-svg-issues");
        }
      }
      if (sPageId=="b"){
        console.log("current page is "+sPageId);
        $("body > div > h1").text("Impact Investors by Style");
        populateInvestorChord('./data/impact_investors/impact_investors_styles_all.json',"chord-svg-styles","chord-styles");
      }
      if (sPageId=="c"){
        console.log("current page is "+sPageId);
        $("body > div > h1").text("Impact Investors by Amount");
        populateInvestorAmounts('./data/impact_investors/impact_investors_amounts.json',"chord-svg-amounts","#chord-amounts");
      }
      if (sPageId=="d"){
        console.log("current page is "+sPageId);
        populateInvestorChord('./data/impact_investors/impact_investors_all_issues.json',"chord-svg-issues-all","#chord-issues-all");
        $("body > div > h1").text("Impact Investors All Issues");
      }
      if (sPageId=="f"){
        console.log("current page is "+sPageId);
        populateInvestorChord('./data/impact_investors/impact_investors_all_issues.json',"chord-svg-issues-all","#chord-issues-all");
        $("body > div > h1").text("Marriage Equality");
      }
      if (sPageId=="g"){
        console.log("current page is "+sPageId);
        populateInvestorChord('./data/impact_investors/impact_investors_all_issues.json',"chord-svg-issues-all","#chord-issues-all");
        $("body > div > h1").text("Common Core");
      }
}