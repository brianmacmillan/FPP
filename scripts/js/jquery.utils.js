/*
 
	jquery.bm_utils
	javascript utilities for use by the apocalypse review
	copyright brian macmillan 2005-2012

*/

(function($){

$.fn.bm_utils = function() {};

$.extend({bm_utils : {
	EXPORT_URL : "scripts/php/export/exportToCsvOrSQL.php",
	load_attempts : 0,
	LOAD_LIMIT : 50,
	LOAD_RETRY : 400, // used in loaded
	LOG_ERROR : false,
	SHOW_ERROR_IN_CONSOLE : true,
	SHOW_ERROR_ALERT : false,
	HTTP_REQUEST : undefined,
	setRequestObject : function() {
		if ($.bm_ui.browser=="IE"){
			$.bm_utils.HTTP_REQUEST =  new ActiveXObject("Microsoft.XMLHTTP");
		} else {$.bm_utils.HTTP_REQUEST = new XMLHttpRequest()}
	},
    browserExceptions : function(piException) {
		// The idea is to  place all the browser exceptions in one function
		// I'm just going to implement it as a list for now
		if (piException==1){
			// Opera's failure to handle height:n% causes need to dynamically calculate height for stories.
			//reference: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
			var lfHeight = window.innerHeight * .8;
			//var lfHeight = document.body.clientHeight * .98;
			$("#content-text").css("height",lfHeight);
			$("#content-inner").css("height",lfHeight);
		}
	},


	checkboxContainerFocus : function(e){
		$(e).addClass("active");
	},
	checkboxContainerBlur : function(e){
		$(e).removeClass("active");
	},
	errorHandler : function(psFunctionName,psErr)	{
		try{
			if (this.SHOW_ERROR_IN_CONSOLE){
				if (window.console){window.console.error("Error in "+psFunctionName+" "+psErr.message); }
			}
			if (this.SHOW_ERROR_ALERT) {alert("Error in "+psFunctionName+" "+psErr.message);}
			if (this.LOG_ERROR) {$.bm_logs.logError(psFunctionName,psErr)}
		} catch(err)
		{
			//alert("Error calling $.bm_utils.errorHandler "+psErr);
		}
	},
	formatNumber : function(pNum,piDecimals)
	{
		//for more info see http://www.cherny.com/webdev/60/javascript-function-arguments-default-values-passing-objects-and-overloading
		piDecimals = (typeof piDecimals == 'undefined') ? 0 : piDecimals;

		var sReturn=Number(pNum).toFixed(piDecimals);
		var sReturn = (sReturn=="NaN") ? "" : sReturn;
		return sReturn;
	},
	formatMeasurement : function(pdNum,psScale)
	{
		//alert("in format measurement "+pdNum+" "+psScale);
		if (pdNum == 1 && psScale == "inches") return pdNum+" inch";
		if (pdNum == 1 && psScale == "pounds") return pdNum+" pound";
		if (pdNum == 1 && psScale == "ounces") return pdNum+" ounce";
		if (pdNum == 1 && psScale == "centimeters") return pdNum+" centimeter";
		if (pdNum == 1 && psScale == "meters") return pdNum+" meter";
		if (pdNum == 1 && psScale == "metres") return pdNum+" metre";
		return (pdNum+" "+psScale);
	},
	formatName : function(psHonorific,psFirst,psMiddle,psLast)
	{
		var sReturn='';
		if (psHonorific>"") sReturn += psHonorific+" ";
		if (psFirst>"") sReturn += psFirst+" ";
		if (psMiddle>"") sReturn += psMiddle+" ";
		if (psLast>"") sReturn += psLast;
		return sReturn;
	},
			validateDate : function(pdDate)
			{
				//NB Brian To do.
				//valid date: 0000-00-00 valid datetime:0000-00-00 00:00:00
				//Trim
				//strip year from first four characters
				return pdDate;
			},  
	getBaseURL : function() {
		var url = location.href;  // entire url including querystring - also: window.location.href;
		var baseURL = url.substring(0, url.indexOf('/',14));
		if (baseURL.indexOf('localhost') != -1) {
			// Base Url for localhost
			var url = location.href;  // window.location.href;
			var pathname = location.pathname;  // window.location.pathname;
			var index1 = url.indexOf(pathname);
			var index2 = url.indexOf("/", index1 + 1);
			var baseLocalUrl = url.substr(0, index2);

			return baseLocalUrl + "/";
		}
		else {
			// Root Url for domain name
			return baseURL + "/";
		}
	},
	getKeystroke : function (evt){
		var key;
		// determine which key was just pressed
		// IE and non-ie code.
		try
		{
			key = (evt.which) ? evt.which : evt.keyCode;
		} catch(err)
		{
			// ie7 and perhaps other versions
			key = evt.keyCode;	
		}
		return key;
	},
	getShiftPressed : function (evt){
		try
		{
			return (evt.shiftKey==1);
		} catch(err)
		{
			// ie7 and perhaps other versions
			return (document.event.shiftKey==1);	
		}
	},
	getCtrlPressed : function (evt){
		try
		{
			return (evt.ctrlKey==1);
		} catch(err)
		{
			// ie7 and perhaps other versions
			$.bm_utils.errorHandler("getCtrlPressed",err);
			return (document.event.ctrlKey==1);	
		}
	},
	getAltPressed : function (evt){
		
	},
	getClientHeightAndWidth : function(){
		 var iWidth;
		 var iHeight;
		  
		 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		  
		 if (typeof window.innerWidth != 'undefined')
		 {
			  iWidth = window.innerWidth,
			  iHeight = window.innerHeight
		 }
		  
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		 
		 else if (typeof document.documentElement != 'undefined'
			 && typeof document.documentElement.clientWidth !=
			 'undefined' && document.documentElement.clientWidth != 0)
		 {
			   iWidth = document.documentElement.clientWidth,
			   iHeight = document.documentElement.clientHeight
		 }
		  
		 // older versions of IE
		  
		 else
		 {
			   iWidth = document.getElementsByTagName('body')[0].clientWidth,
			   iHeight = document.getElementsByTagName('body')[0].clientHeight
		 }
		return [iHeight,iWidth]
	},
	// end history
	gotoFirstInputControl : function(){
		$("input:text:visible:first").focus();
	},
	load : function(psElement,psFilename){	
		//attach filename to element
		$(psElement).load(psFilename,
			function (responseText, textStatus, XMLHttpRequest) {
				if (textStatus=="success") {
				} else {
					$.bm_utils.$.bm_utils.errorHandler("Error in utils loadFile: failed to load "+psFilename+" status: "+textStatus,0);
					return;
				}
			}
		);
	},
	loadAndResize : function(psElement,psFilename){	
		//resizes the body height to be the same as the grand parent of psElement - e.g. #news-container. 
		//Very specific fix for AR, not to be reused, unless generified.
		
		//Attach filename to element
		$(psElement).load(psFilename,
			function (responseText, textStatus, XMLHttpRequest) {
				if (textStatus=="success") {
					var eToAdjustTo = $(psElement).parent().parent().attr("id");
					// Make body the size of psElement's grandparent, eg #news-container
					$("body").height($("#"+eToAdjustTo).height()+parseInt($("#"+eToAdjustTo).css("margin-top")));
										
				} else {
					$.bm_utils.$.bm_utils.errorHandler("Error in utils loadFile: failed to load "+psFilename+" status: "+textStatus,0);
					return;
				}
			}
		);
	},
	loaded : function(e,f) {
		try{
			//execute function f when element e is loaded
			//syntax: element name and function name *not* in quotes and without brackets.
			if (document.getElementById && document.getElementById(e) != null) {    
				// NB External reference.
				if (window.console) {if ($.bm_main.debug){window.console.debug(e+" loaded after "+(Number(this.load_attempts)*Number(this.LOAD_RETRY))+" milliseconds")};}
				this.load_attempts=0;
				f();
			}
			else {
				// NB This function can cause issues should e fail to load.
				// The load_attempts flag sets an upward limit on attempts
				if (this.load_attempts>= this.LOAD_LIMIT) {
					this.load_attempts=0;
					if (window.console) {if ($.bm_main.debug){window.console.debug("load failed for element #"+e+"")};}
				};
				setTimeout('$.bm_utils.loaded(\''+e+'\','+f+')',100)
				this.load_attempts++;
				//if (window.console) {if ($.bm_main.debug){window.console.debug("waiting for #"+e+" to load")};}
			}
		} catch(err)
		{
			$.bm_utils.$.bm_utils.errorHandler("loaded "+e,err);
		}
	},
		loadedJQuery : function(e,f) {
			
			try{
				//execute function f when element e is loaded
				//syntax: element as Jquery object and function name *not* in quotes and without brackets - eg myFunction not myFunction()
				//if (window.console) {if ($.bm_main.debug){window.console.debug("loading")};}
				if ($("#"+e).length>0) {
					if (window.console) {if ($.bm_main.debug){window.console.debug($("#"+e).parent().attr("id")+" loaded after "+($.bm_utils.load_attempts*$.bm_utils.LOAD_RETRY)+" milliseconds - loadedJQuery")};}
					$.bm_utils.load_attempts=0;
					f();
				}
				else {
					// NB This function can cause issues should e fail to load.
					// The load_attempts flag sets an upward limit on attempts
					if ($.bm_utils.load_attempts>= this.LOAD_LIMIT) {
						$.bm_utils.load_attempts=0;
						if (window.console) {if ($.bm_main.debug){window.console.debug("load failed for element #"+$("#"+e).parent().attr("id"))};}
						return;
					};
					setTimeout('$.bm_utils.loadedJQuery(\''+e+'\','+f+')',100)
					$.bm_utils.load_attempts++;
					if (window.console) {if ($.bm_main.debug){window.console.debug("waiting for #"+e+" to load")};}
				}
			} catch(err)
			{
				$.bm_utils.$.bm_utils.errorHandler("loadedJQuery "+e,err);
			}
		},
		loadedTwo : function(e,f,psParam) {
			try
			{
				if (document.getElementById && document.getElementById(e) != null) 
				{
					f(psParam);
				} else {setTimeout('$.bm_utils.loadedTwo(\''+e+'\','+f+',"'+psParam+'")',100)};
			} catch(err)
			{
				$.bm_utils.errorHandler("loadedTwo for element "+e,err);
			}
		},
		loadedThree : function(e,f,piIndex,psType) 
		{
			try
			{
				if (document.getElementById && document.getElementById(e) != null) 
				{
					f(psType,piIndex);
				} else if (!$.main.pageLoaded) setTimeout('loaded_three(\''+i+'\','+f+','+piIndex+','+psType+')',100);
			} catch(err)
			{
				$.bm_utils.errorHandler("loaded_three "+e,err);
			}
		},
	loadFile : function (psFileName, psFileType,psId){
		var fileref;
		if (psFileType=="js"){ //if filename is a external JavaScript file
			fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", psFileName);
			if (psId != "undefined"){fileref.setAttribute("id", psId);fileref.setAttribute("title", psId);}
		}
		else if (psFileType=="css"){ //if filename is an external CSS file
			fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", psFileName);
			if (psId != "undefined"){
				fileref.setAttribute("id", psId);
				fileref.setAttribute("title", psId);
			}
		}
		if (typeof fileref!="undefined") {

			document.getElementsByTagName("head")[0].appendChild(fileref);
			//$("head").load(fileref);
			}
	},
    readCookie : function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	eraseCookie : function(name) {
		//createCookie(name,"",-1);
	},
	showSocialLinks : function(oContainers){
		// courtesy of http://www.hardcode.nl/archives_139/article_420-social-media-icon-script.htm
    	var l,i,socialList = [], socialHtm='';
    	var t = $("#content .article-container.active header").text(); //my title" //$('h1').eq(0).text();   /*  adjust this to select the title of your article */
    	var u = window.location.href;  /*  this selects the link to your article */
		var iconDirectory = 'code/interface/social_media/'; /* this is the directory containing your icons */
		//alert("SSL");
		var socialMedia = [
			{linkText: 'Facebook', icon:'facebook.jpg',href:'http://www.facebook.com/share.php?u='+u},
			{linkText: 'Twitter', icon:'twitter.jpg',href:'http://twitter.com/home?status='+u},
			{linkText: 'Google', icon:'google.jpg',href:'http://www.google.com/bookmarks/mark?op=edit&bkmk='+u}
			/*
			{linkText: 'Del-icio-us', icon:'delicious.png',href:'http://del.icio.us/post?url='+u+'&title='+t},
			{linkText: 'Stumbleupon', icon:'stumbleupon.png',href:'http://www.stumbleupon.com/submit?url='+u},
			{linkText: 'Digg', icon:'digg.png',href:'http://digg.com/submit?phase=2&url='+u+'&title='+t},
			*/
		];
 
		l = socialMedia.length;
		for (i=0; i<l;i++){
			socialList.push('<li><a href="'+socialMedia[i].href+'" title="'+socialMedia[i].linkText+'"><img src ="'+iconDirectory+socialMedia[i].icon+'" alt="'+socialMedia[i].linkText+'" /></a></li>');
		}
/*
		for (i=0; i<l;i++){
			socialList.push('<li><a href="'+socialMedia[i].href+'" title="'+socialMedia[i].linkText+'"><img src ="'+this.webRoot+iconDirectory+socialMedia[i].icon+'" alt="'+socialMedia[i].linkText+'" /></a></li>');
		}
*/
		socialHtm = '<ul>'+socialList.join("\n")+'</ul>';
		oContainers.append('<div class="socialMediaContainer">'+socialHtm+'</div>'); 
    },
	//drawSocialLinks($('#whatEverElementId'));
	

	setFocus : function(psElementName){
		if ($.bm_ui.browser="IE") {
			setTimeout(function() {document.getElementById(psElementName).focus();}, 10);
		} else{
			$("#"+psElementName).focus();
		}
	},

	stripChar : function(psString,psStringToStrip){
		// returns substring to the right of psStringToStrip within a string, or the string itself if psStringToStrip is not found
		return (psString.toString().indexOf(psStringToStrip)>-1) ? psString.toString().substring(Number(psString.toString().indexOf(psStringToStrip))+1) : psString;
	},
	stripSuffix : function(psString,psStringToStrip){
		// returns substring to the left of psStringToStrip within a string, or the string itself if psStringToStrip is not found
		return (psString.toString().indexOf(psStringToStrip)>-1) ? psString.toString().substring(0,Number(psString.toString().indexOf(psStringToStrip))) : psString;
	},

	turnOffElementSelection : function(psElementType,psParentElementId)
	{
		//eg turnOffElementSelection("p","ct-display");
		//http://aleembawany.com/2009/01/20/disable-selction-on-menu-items-with-this-jquery-extension/
		if (!gbIE) {parent = document.getElementById(psParentElementId)};
	},

	vAlignElementTwoContainers : function(e1,e2,e3){
		
		var iContainerHeight = document.getElementById(e1).clientHeight;
		var iContainerHeaderHeight = document.getElementById(e2).clientHeight;
		var iElementHeight = document.getElementById(e3).clientHeight;
		var iTop=(iContainerHeight-iContainerHeaderHeight-iElementHeight)/2;
		//alert("utils valign container height header height element height "+iContainerHeight+"-"+iContainerHeaderHeight+"-"+iElementHeight+"="+iTop);
		$("#"+e2).css({top:iTop});
	},
	vAlignElement_old : function(e,psClass){
		var iContentHeight = Number($(e).attr("height"));
		var iPageHeight = Number($("body").attr("height"));
		iTop=(iPageHeight-iContentHeight);
		iTop=iTop/2;
		$(psClass).css({top:iTop});
	},
	viewport : function(e){

		//if (window.console) {if ($.ar_main.debug){window.console.debug("vp 0")};}
		var e = window
		, a = 'inner';
		if ( !( 'innerWidth' in window ) )
		{
		a = 'client';
		e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	},
	/* *** Canvas stuff */

	drawButton : function(ctx,x,y,width,height,radius,fill,stroke,piStrokeWidth,psText,piTextX,piTextY,psFontSize){

		 /*  Arguments:  ctx - the context to be used to draw with.
	       x,y - the top left corner
	       width - how wide the rectangle
	       height - how high the rectangle
	       radius - the radius of the corner
	       fill   - true if the rectangle should be filled
	       stroke - true if the rectangle should be stroked 		
		   strokewidth - integer, size of pen */
		ctx.save();	// save the context so we don't mess up others
		ctx.beginPath();
		ctx.lineWidth = piStrokeWidth;
		// draw top and top right corner
		ctx.moveTo(x+radius,y);
		ctx.arcTo(x+width,y,x+width,y+radius,radius);

		// draw right side and bottom right corner
		ctx.arcTo(x+width,y+height,x+width-radius,y+height,radius); 

		// draw bottom and bottom left corner
		ctx.arcTo(x,y+height,x,y+height-radius,radius);

		// draw left and top left corner
		ctx.arcTo(x,y,x+radius,y,radius);
		
		ctx.font = "bold "+psFontSize+ " sans-serif";
		// center
		var metrics=ctx.measureText(psText);
		piTextX = parseInt((300-metrics.width)/2);
		piTextY = 95;
		ctx.fillText(psText, piTextX, piTextY);

		if(fill){
		ctx.fill();
		}
		if(stroke){
		ctx.stroke();
		}
		ctx.restore();	// restore context to what it was on entry
	}
}
})

})(jQuery);