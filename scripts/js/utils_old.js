Sandra Stretton
Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
 
 
More
 
1 of 14,199
 
Web Clip
Forbes.com: Most popular stories - Connected Cars By The Numbers [Infographic] - 4 hours ago
bm_utilities
Inbox
	x
Brian R Macmillan <brm262@nyu.edu>
	
2:20 PM (0 minutes ago)
		
to me
/********* UTILITY FUNCTIONS AND GLOBALS / CONSTANTS ****************/

var gbDebug=true;

/* browser detection. see bottom of file for notes and license */
var d, dom, ie, ie4, ie5x, moz, mac, win, lin, old, ie5mac, ie5xwin, op,saf;

d = document;
n = navigator;
na = n.appVersion;
nua = n.userAgent;
win = ( na.indexOf( 'Win' ) != -1 );
mac = ( na.indexOf( 'Mac' ) != -1 );
lin = ( nua.indexOf( 'Linux' ) != -1 );

if ( !d.layers ){
    dom = ( d.getElementById );
    op = ( nua.indexOf( 'Opera' ) != -1 );
    konq = ( nua.indexOf( 'Konqueror' ) != -1 );
    saf = ( nua.indexOf( 'Safari' ) != -1 );
    moz = ( nua.indexOf( 'Gecko' ) != -1 && !saf && !konq);
    ie = ( d.all && !op );
    ie4 = ( ie && !dom );

    /*
    ie5x tests only for functionality. ( dom||ie5x ) would be default settings.
    Opera will register true in this test if set to identify as IE 5
    */

    ie5x = ( d.all && dom );
    ie5mac = ( mac && ie5x );
    ie5xwin = ( win && ie5x );
}


/* end of browser detection. notes and license at bottom of this file */

var DEFAULT_SHOW_ERRORS = 1;
var gbIE = false;
if (window.getComputedStyle)
{
    gbIE = false;
} else
{
    gbIE = true;
}
       
//var KEY_RIGHT_ARROW = 39;

/* jQuery submit - learn from http://net.tutsplus.com/javascript-ajax/submit-a-form-without-page-refresh-using-jquery/ */
/* a jquery example
 $(function() { 
   $(".button").click(function() { 
   }); 
 });

$.ajax({ 
   type: "POST", 
   url: "index.php?rebirth", 
   data: dataString, 
   success: function() { 
     //display message back to user here 
   } 
 }); 
*/
 //return false;
/* ****** end of jQuery submit code ******** */

//returns the count of an occurrence of one character in a string
//from http://www.codecodex.com/wiki/Count_the_number_of_occurrences_of_a_specific_character_in_a_string
String.prototype.replaceAll=function(s1, s2) {
      return this.replace(new RegExp(s1,"g"), s2);
}


function stripPX(psString){
    return (psString.toString().indexOf("px")>0) ? psString.toString().substring(0,psString.toString().indexOf("px")) : psString;
}
function loaded(i,f)
{
    try
    {
        if (document.getElementById && document.getElementById(i) != null) f();
        else if (!$.bm_main.page_loaged) setTimeout('loaded(\''+i+'\','+f+')',100);
    } catch(err)
    {
        errorHandler("loaded "+i,err);
    }
}

function loaded_two(e,f,piIndex)
{
    try
    {
        if (document.getElementById && document.getElementById(e) != null)
        {
            f(piIndex);
        } else if (!$.bm_main.page_loaded) setTimeout('loaded_two(\''+e+'\','+f+','+piIndex+')',100);
    } catch(err)
    {
        errorHandler("loaded_two for element "+e,err);
    }
}
function loaded_three(e,f,piIndex,psType)
{
    try
    {
        if (document.getElementById && document.getElementById(e) != null)
        {
            f(psType,piIndex);
        } else if (!$.bm_main.page_loaded) setTimeout('loaded_three(\''+i+'\','+f+','+piIndex+','+psType+')',100);
    } catch(err)
    {
        errorHandler("loaded_three "+e,err);
    }
}
function errorHandler(psFunctionName,psErr)
{
    try{
        if (DEFAULT_SHOW_ERRORS == 1)
        {
            messageShow("Error in "+psFunctionName+" "+psErr.message,"#main-message",false);
        } else
        {
            //NB Brian to do - log errors
        }
    } catch(err)
    {
        alert("Error calling errorhandler "+psErr);
    }
}
function integerToBoolean(piValue)
{
    if (piValue == 1)
    {
        return true;
    } else
    {
        return false;
    }
}
function booleanToInteger(pbValue){
    if (pbValue)
    {
        return 1;
    } else
    {
        return 0;
    }
}
function getKeystroke(evt)
{
    var key;
    // determine which key was just pressed
    // IE and non-ie code.
    try
    {
        key = (evt.which) ? evt.which : evt.keyCode;
    } catch(err)
    {
        // ie7 and perhaps other versions
        key = document.event.keyCode;   
    }
    return key;
}
function getShiftPressed(evt)
{
    try
    {
        return (evt.shiftKey==1);
    } catch(err)
    {
        // ie7 and perhaps other versions
        return (document.event.shiftKey==1);   
    }
}
function getCtrlPressed(evt)
{
    try
    {
        return (evt.ctrlKey==1);
    } catch(err)
    {
        // ie7 and perhaps other versions
        errorHandler("getCtrlPressed",err);
        return (document.event.ctrlKey==1);   
    }
}
function getAltPressed(evt)
{
   
}



formatNumber = function(pNum,piDecimals)
{
    //for more info see http://www.cherny.com/webdev/60/javascript-function-arguments-default-values-passing-objects-and-overloading
    piDecimals = (typeof piDecimals == 'undefined') ? 0 : piDecimals;

    var sReturn=Number(pNum).toFixed(piDecimals);
    var sReturn = (sReturn=="NaN") ? "" : sReturn;
    return sReturn;
}
formatMeasurement = function(pdNum,psScale)
{
    //alert("in format measurement "+pdNum+" "+psScale);
    if (pdNum == 1 && psScale == "inches") return pdNum+" inch";
    if (pdNum == 1 && psScale == "pounds") return pdNum+" pound";
    if (pdNum == 1 && psScale == "ounces") return pdNum+" ounce";
    if (pdNum == 1 && psScale == "centimeters") return pdNum+" centimeter";
    if (pdNum == 1 && psScale == "meters") return pdNum+" meter";
    if (pdNum == 1 && psScale == "metres") return pdNum+" metre";
    return (pdNum+" "+psScale);
}
formatName = function(psHonorific,psFirst,psMiddle,psLast)
{
    var sReturn='';
    if (psHonorific>"") sReturn += psHonorific+" ";
    if (psFirst>"") sReturn += psFirst+" ";
    if (psMiddle>"") sReturn += psMiddle+" ";
    if (psLast>"") sReturn += psLast;
    return sReturn;
   
}
validateDate = function(pdDate)
{
    //NB Brian To do.
    //valid date: 0000-00-00 valid datetime:0000-00-00 00:00:00
    //Trim
    //strip year from first four characters
    return pdDate;
}
stringToBoolean=function(psString)
{
    var sReturn="";
    if (psString=="Y" || psString=="y")
    {
        sReturn="true";
    }
    if (psString=="N" || psString=="n")
    {
        sReturn="false";
    }
    return sReturn;   
}
stringToChecked=function(psString)
{
    var sReturn="";
    if (psString=="Y" || psString=="y")
    {
        sReturn="checked";
    }
    return sReturn;   
}
checkedToString=function(pbChecked)
{
    var sReturn="N";
    if (pbChecked)
    {
        sReturn="Y";
    }
    return sReturn;   
}
replaceBlankWithDelimiterAndNull = function(i,psList,psDelimiter)
{
    //Used for stored procedure arguments, which need to be populated
    for (j=i;j>1;j--)
    {
        if (psList>"")
        {psList+=psDelimiter+"null"} else{psList="null"}
        //alert("psList "+psList);
    }
    //alert("stuffNulls "+psList);
    return psList;
}
setBorder = function(e,psWidth,psStyle,psColor)
{
    e.style.borderStyle=psStyle;
    e.style.borderColor=psColor; // should be a preference
    e.style.borderWidth=psWidth;   
}
isNumber = function(psStringToTest)
{
      var sNumberList = "0123456789.";
    var bReturnValue = true;
    var sTemp;

    if (psStringToTest == "NaN")
    {
        return false;
    }
 
   for (i = 0; i < psStringToTest.length && bReturnValue == true; i++)
      {
      sTemp = psStringToTest.charAt(i);
      if (sNumberList.indexOf(sTemp) == -1)
         {
         bReturnValue = false;
         }
      }
   return bReturnValue;
  
}
notANumber = function()
{
    alert("utilities not a number ");
}
// msgWindow is debugging popup window
var msgWindow;
function stripCharacters(poThis,psValuesToStrip,pbAllowAsFirstChar) {
    //This function is specifically designed to remove +- symbols from
    //amount data fields. It is generically written so that it could, for example,
    //replace stripCommas, below.

    //The stripCharacters function was written as a work around for the fact that
    //we cannot currently determine the location of the insertion point during the
    //keydown event. see validateNumber for details.

    //winWrite('in strip characters');

    var sString=poThis.value;
    for (var i=0;i<psValuesToStrip.length;i++) {
        //get character to strip
        var sHoldValue=psValuesToStrip.substring(i,i+1);
        var bReplaceFirstChar=false;
        if (sString!=null) {
            if (pbAllowAsFirstChar) {
                //for example, +- only allowed only at beginning of string
                if (sString.indexOf(sHoldValue)==0) {
                    sString=sString.slice(1);
                    //alert(sString);
                    bReplaceFirstChar=true;
                }
            }
            var sExpression = 'sString.replace(/'+'\\'+sHoldValue+'/g,'+'\''+'\')';
            sString=eval(sExpression);
            if (bReplaceFirstChar) sString=sHoldValue+sString;
        }
    }
    if (poThis.value!=sString) poThis.value=sString;
}

function stripCommas(psValue) {
    if (psValue!=null) {
      psValue=psValue.replace(/,/g,'');
    }
    return psValue;
}
function winWrite(psLine){
    if (!gbDebug) return;

//    if (!(msgWindow && msgWindow.focus())) {
    if (!msgWindow || msgWindow.closed) {
      msgWindow=window.open("","displayWindow","menubar=yes,scrollbars=yes,status=yes,resizable=yes,width=500,height=300")
        msgWindow.document.write("<head><title>Debugging window<\/title><\/head>")
    }
    var dateNow=new Date();
    var hours=dateNow.getHours();
    var minutes=dateNow.getMinutes();
    var seconds=dateNow.getSeconds();
    var milliseconds=parseInt(dateNow.getMilliseconds());

    if (hours<10) hours='0'+hours;
    if (minutes<10) minutes='0'+minutes;
    if (seconds<10) seconds='0'+seconds;
    //if (milliseconds<10) window.status='Foud';
    if (milliseconds<100) milliseconds='0'+milliseconds;
    if (milliseconds<10) milliseconds='0'+milliseconds;

    var timeNow=hours+':'+minutes+':'+seconds+' '+milliseconds;
    msgWindow.document.write(timeNow+' '+psLine+'<br/>');
}

// debugging functions end   //

messageShow = function(psMessage,psMessageElementName,pbHide)
{
    $(psMessageElementName).text(psMessage);
    $(psMessageElementName).addClass("active").removeClass("error");
    //alert("in message show "+psMessage+" "+psMessageElementName);
    if (pbHide){alert("hide");setTimeout("messageHide('"+psMessageElementName+"')",3000);}
}
messageHide = function(psMessageElementName)
{
    $(psMessageElementName).removeClass("active");
}
errorShow = function(psMessage,psMessageElementName)
{
    $(psMessageElementName).addClass("active").addClass("error");
    $(psMessageElementName).text(psMessage);
}

/* Cookie stuff */

function saveLoginToCookie() {
    var sUsername = $("#username").val();
    var sEmail = $("#email").val();
    var sPassword = $("#password").val();
   // Save user information from the form!
   createCookie("username",sUsername,"1");
   createCookie("password",sPassword),"1";
   createCookie("email",sEmail,"10");
}
/*
function initCommentForm() {
   // Autofill user information if available
   $("input[@name='author']").val(readCookie(uname));
   $("input[@name='email']").val(readCookie(uemail));
   $("input[@name='url']").val(readCookie(usite));

   // Save comment information when form is submitted
   $("form[@name='comments_form']").submit(saveCommentInformation);
}
*/
//$(document).ready(initCommentForm);

/* end cookie stuff */
// from example http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/***********************************************
* Disable Text Selection script- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

function disableSelection(target){
if (typeof target.onselectstart!="undefined") //IE route
    target.onselectstart=function(){return false}
else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
    target.style.MozUserSelect="none"
else //All other route (ie: Opera)
    target.onmousedown=function(){return false}
target.style.cursor = "default"
}

//Sample usages
//disableSelection(document.body) //Disable text selection on entire body
//disableSelection(document.getElementById("mydiv")) //Disable text selection on element with id="mydiv"


getNodeCountVerbose = function(psElementId,psClassName)
{
    try
    {
        var iDebugAssist = 0;
        //alert("Node count test "+iReturn);
        var eStory = document.getElementById(psElementId);
        var sClassName;
        var iReturn = 0;
        iDebugAssist = 1;
        for (var i = 0; i<eStory.childNodes.length;i++)
            {
            sClassName = eStory.childNodes[i].className;
            if (sClassName==undefined)
            {} else
            {
                if (sClassName.indexOf(psClassName)>0 || sClassName == psClassName)
                {
                    iReturn++;
                }
            }
        }
    } catch(err)
    {
        alert("IE Error in getNodeCountVerbose: Your browser returned the following message for className "+psClassName+" "+err.message+". This appears to be a bug with internet explorer 7. "+iDebugAssist);
    }
    iReturn--;
    return iReturn;
}
getNodeCount = function(psElementId,psClassName)
{
    var iReturn=0;
    var sClassName;
    try
    {
        var iDebugAssist = 0;
        //-1 was added to the following expression result to make it zero-based
        iReturn = Number(document.getElementById(psElementId).getElementsByClassName(psClassName).length)-1;

        if (iReturn==0)
        {
            iDebugAssist = 1;
            iReturn = getNodeCountVerbose(psElementId,psClassName);
        }

        //alert("node count" + iReturn);
        return iReturn;
    } catch(err)
    {
        //This is a serious, unexplained error with firefox on vista and ie
        //The above statement throws an error
        if (!window.getComputedStyle)
        {
            //alert("IE Error: Your browser returned the following message for className "+psClassName+" "+err.message+". This appears to be a bug with FireFox running under the Vista operating system and with IE. "+iDebugAssist);
        }
        try
        {
            iDebugAssist = 2;
            iReturn = getNodeCountVerbose(psElementId,psClassName);
            return iReturn;
        } catch(err)
        {
            return 0;
        }
    }
}

/*
Script Name: Simple Javascript Browser/OS detection
Authors: Harald Hope, Tapio Markula, Websites: http://techpatterns.com/
http://www.nic.fi/~tapio1/Teaching/index1.php3
Script Source URI: http://techpatterns.com/downloads/javascript_browser_detection.php
Version 2.0.2
Copyright (C) 29 June 2007

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

Get the full text of the GPL here: http://www.gnu.org/licenses/gpl.txt

*/

/*************************************************************
Light version, use for basic browser detection only. Use our
http://techpatterns.com/downloads/javascript_browser_detection.txt script for more
complex javascript browser detection.

Remember, always use method or object testing as your first choice, for example, if ( dom ) { statement; };

Let me know if you find an error or a failure to properly detect, or if there
is a relevant browser that has special needs for detection at our tech forum:
http://techpatterns.com/forums/forum-11.html
The main script is separated from the initial netscape 4 detection due to certain bugs in
netscape 4 when it comes to unknown things like d.getElementById. The variable declarations
of course are made first to make sure that all the variables are global through the page,
otherwise a javascript error will occur because you are trying to use an undeclared variable.

We test for basic browser type (ie, op, or moz/netscape > 6)..

For more in depth discussion of css and browser issues go to:
http://www.nic.fi/~tapio1/Teaching/DynamicMenusb.php#detections
http://www.nic.fi/~tapio1/Teaching/FAQ.php3

***************************************************************/

/**************************************************************
Lite version, tests only for main types and browsers out there,
this will cover you in almost all normal situations out there.
***************************************************************/
/********************************************************
Browser detection
from http://techpatterns.com/downloads/javascript_browser_detection.php#full

start:
/*
Script Name: Simple Javascript Browser/OS detection
Authors: Harald Hope, Tapio Markula, Websites: http://techpatterns.com/
http://www.nic.fi/~tapio1/Teaching/index1.php3
Script Source URI: http://techpatterns.com/downloads/javascript_browser_detection.php
Version 2.0.2
Copyright (C) 29 June 2007

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

Get the full text of the GPL here: http://www.gnu.org/licenses/gpl.txt

*/

/*************************************************************
Light version, use for basic browser detection only. Use our
http://techpatterns.com/downloads/javascript_browser_detection.txt script for more
complex javascript browser detection.

Remember, always use method or object testing as your first choice, for example, if ( dom ) { statement; };

Let me know if you find an error or a failure to properly detect, or if there
is a relevant browser that has special needs for detection at our tech forum:
http://techpatterns.com/forums/forum-11.html
The main script is separated from the initial netscape 4 detection due to certain bugs in
netscape 4 when it comes to unknown things like d.getElementById. The variable declarations
of course are made first to make sure that all the variables are global through the page,
otherwise a javascript error will occur because you are trying to use an undeclared variable.

We test for basic browser type (ie, op, or moz/netscape > 6)..

For more in depth discussion of css and browser issues go to:
http://www.nic.fi/~tapio1/Teaching/DynamicMenusb.php#detections
http://www.nic.fi/~tapio1/Teaching/FAQ.php3

***************************************************************/

/**************************************************************
Lite version, tests only for main types and browsers out there,
this will cover you in almost all normal situations out there.
***************************************************************/

//code moved to top of this file
/*
here is a sample use of the browser detector, it would load a browser specific stylesheet
for certain unsupported or improperly supported mac ie 5 css styles. The depth variable
is used so that the javascript library file can be used from anywhere in the website, you simply
insert the depth of the file like this,
...
 <head>
 <title>Browser information Page</title>

 <meta http-equiv = "Content-Type" content = "text/html; charset = iso-8859-1" />
 <link rel = "stylesheet" type = "text/css" href = "/css/main.css" />
 <script type = "text/javascript" src = "/js/browser_detection.js"> </script>
 <script type = "text/javascript>browser_css( '/'); </script>
 </head>

in the head of the web page after the js file is loaded.
Or if you are always referring your site to the root, you wouldn't need that
 and could delete the depth variable and just use the absolute path to the root.

function browser_css( ) {
    d = document;// shorthand so we don't have to write out document each time..
    if ( ie5mac ) {
        d.write('<link rel = "stylesheet" type = "text\/css" href = "/css/ie5mac.css" />');
    }
    else if ( d.layers ){
        d.write('<link rel = "stylesheet" type = "text\/css" href = "/css/ns4x.css" />');
    }
    else if ( ie4 ){
        d.write('<link rel = "stylesheet" type = "text\/css" href = "/css/ie4.css" />');
    }
    else if ( moz ){
        d.write('<link rel = "stylesheet" type = "text\/css" href = "/css/moz.css" />');
    }
    else {
        d.write('< link rel = "stylesheet" type = "text\/css" href = "/css/moz5.css" />');
    }
}
********************************************************/
	