//utils.js
//utility functions used by Field Framework
//copyright Brian MacMillan 2000-2014
//for use by the Rainforest Alliance
//
    var mbCancelEvent = false;

    var SEL_NAV="sel_person";  
    
    // Replaced by jQuery
    // var httpRequest;
    // if (window.XMLHttpRequest)
    // {
    //     httpRequest = new XMLHttpRequest();
    // } else
    // {
    //     httpRequest =  new ActiveXObject("Microsoft.XMLHTTP");
    // }

     showMessage = function(psMessage){
        $("#message").text(psMessage);
        console.log(psMessage);
     }
     showErrorMessage = function(psMessage){
        console.log(psMessage);
     }

    log = function(psMessage){console.log(psMessage);}




    HTMLEncode=function(str){
      var i = str.length,
          aRet = [];

      while (i--) {
        var iC = str[i].charCodeAt();
        if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
          aRet[i] = '&#'+iC+';';
        } else {
          aRet[i] = str[i];
        }
       }
      return aRet.join('');   
    }
    decodeHTML=function(str){
        // The issue is that special characters are encoded as html so they can go into custom attributes
        // but input controls display them as text. This is used to get data in and out of <select SEL_NAV>
        //return;
        document.getElementById("decodeHTML").innerHTML=str;
        return document.getElementById("decodeHTML").innerHTML;
    }
    isNumber = function (n) {
        //IsNumeric fails for number literals IsNumeric(1) and for "\t\t" for example
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    getCurrentDate = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'/'+mm+'/'+dd;
        return today;
    }
    verifyFile = function(e){

        var file = e.files[0];
        name = e.name;
        size = e.size;
        type = e.type;

        if(file.name.length < 1) {

        }
        else if(file.type != 'image/png' && file.type != 'image/jpg' && !file.type != 'image/gif' && file.type != 'image/jpeg' ) {
            alert("File doesnt match png, jpg or gif");
            //e.files[0]=null;
            e.value=null;
        }
        else if(file.size > FILE_UPLOAD_LIMIT) {
            alert("File is bigger than 400k limit");
            e.files[0]=null;
            e.value=null;
        }
   
    }
        selectEnable = function(e) {
            document.body.style.cursor = 'default';
            document.getElementById(e).style.cursor = 'default';
            $("#"+e).prop("disabled",false);
            $("#"+e).children("option").prop("disabled",false);
        }
        selectDisable = function(e) {
            $("#"+e).prop("disabled",true);
            $("#"+e).children("option").prop("disabled",true);
            }
    loadFile = function (psFileName, psFileType,psId){
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
    readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    eraseCookie = function(name) {
        createCookie(name,"",-1);
    }
    createCookie = function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    viewport = function(e){
        //if (window.console) {if ($.ar_main.debug){window.console.debug("vp 0")};}
        var e = window, a = 'inner';
        if ( !( 'innerWidth' in window ) )
        {
        a = 'client';
        e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
    }   
    getLocation = function() {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    showPosition=function(position){
      getLocation();
      var sReturn="unknown location";
      if (navigator.geolocation){
        sReturn ="Latitude: " + position.coords.latitude +" Longitude: " + position.coords.longitude;
        }
        return sReturn;
     }
    logEvent= function(piActionId){
        var sBrowser;
        //jQuery.each(jQuery.browser, function(i, val) {
        //    sBrowser+= val+" ";   
        //});
        if ($.browser.webkit) {sBrowser="webkit"};
        //if ($.browser.safari) {sBrowser="safari"};
        if ($.browser.opera) {sBrowser="opera"};
        if ($.browser.mozilla) {sBrowser="mozilla"};
        if ($.browser.ie) {sBrowser="ie"};   
        var sBrowserVersion=$.browser.version;
        //var vp = viewport(0);
        //var iWidth=vp.width;
        //var iHeight=vp.height;
        var iWidth=screen.width;
        var iHeight=screen.height;
        var request = $.ajax({
        url: "../kuncen/code/php/logs/log_event.php",
        type: "POST",
        data: {user_id : 1,browser: sBrowser,browser_version:sBrowserVersion,action_id: piActionId,width:iWidth,height:iHeight},
        dataType: "html"
        });
        request.done(function(msg) {
            document.getElementById("server_message").innerHTML=msg;
        });
    }

           
getHTMLVersion=function(){
        // to utils
      var CName  = navigator.appCodeName;
      var UAgent = navigator.userAgent;
      var HtmlVer= 0.0;
      // Remove start of string in UAgent upto CName or end of string if not found.
      UAgent = UAgent.substring((UAgent+CName).toLowerCase().indexOf(CName.toLowerCase()));
      // Remove CName from start of string. (Eg. '/5.0 (Windows; U...)
      UAgent = UAgent.substring(CName.length);
      // Remove any spaves or '/' from start of string.
      while(UAgent.substring(0,1)==" " || UAgent.substring(0,1)=="/"){
        UAgent = UAgent.substring(1);
      }
      // Remove the end of the string from first characrer that is not a number or point etc.
      var pointer = 0;
      while("0123456789.+-".indexOf((UAgent+"?").substring(pointer,pointer+1))>=0){
        pointer = pointer+1;
      }
      UAgent = UAgent.substring(0,pointer);
     
      if(!isNaN(UAgent)){
        if(UAgent>0){
        HtmlVer=UAgent;
        }
      }
      return HtmlVer;
    }