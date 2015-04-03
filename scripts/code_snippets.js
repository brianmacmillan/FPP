
// video popup
<div data-demo-html="true" data-demo-css="true" data-demo-js="#video-script">
<a href="#popupVideo" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Launch video player</a>

<div data-role="popup" id="popupVideo" data-overlay-theme="b" data-theme="a" data-tolerance="15,15" class="ui-content">
  <iframe src="http://player.vimeo.com/video/41135183?portrait=0" width="497" height="298" seamless=""></iframe>
</div>
</div>

// map popup note
<p>Setting the size of the iframe is done exactly the same as for the video example, with one exception. You should also set the width and height of the div that contains the map to prevent the page to break on platforms like Android 2.3. In this example the ID of this div is <code>#map_canvas</code>.</p>
// map popup
<a href="#popupMap" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Open Map</a>
<div data-role="popup" id="popupMap" data-overlay-theme="a" data-theme="a" data-corners="false" data-tolerance="15,15">
    <a href="#" data-rel="back" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
    <iframe nuan_newframe="true" src="map.html" seamless="" height="320" width="480"></iframe>
</div>
// popup examples
$( document ).on( "pagecreate", function() {
    // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
    function scale( width, height, padding, border ) {
        var scrWidth = $( window ).width() - 30,
            scrHeight = $( window ).height() - 30,
            ifrPadding = 2 * padding,
            ifrBorder = 2 * border,
            ifrWidth = width + ifrPadding + ifrBorder,
            ifrHeight = height + ifrPadding + ifrBorder,
            h, w;
        if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
            w = ifrWidth;
            h = ifrHeight;
        } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
            w = scrWidth;
            h = ( scrWidth / ifrWidth ) * ifrHeight;
        } else {
            h = scrHeight;
            w = ( scrHeight / ifrHeight ) * ifrWidth;
        }
        return {
            'width': w - ( ifrPadding + ifrBorder ),
            'height': h - ( ifrPadding + ifrBorder )
        };
    };
    $( ".ui-popup iframe" )
        .attr( "width", 0 )
        .attr( "height", "auto" );
    $( "#popupMap iframe" ).contents().find( "#map_canvas" )
        .css( { "width" : 0, "height" : 0 } );
    $( "#popupMap" ).on({
        popupbeforeposition: function() {
            var size = scale( 480, 320, 0, 1 ),
                w = size.width,
                h = size.height;
            $( "#popupMap iframe" )
                .attr( "width", w )
                .attr( "height", h );
            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": w, "height" : h } );
        },
        popupafterclose: function() {
            $( "#popupMap iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );
            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": 0, "height" : 0 } );
        }
    });
});
// popup css
iframe {
    border: none;
}
// end popup

// collapsible set
<div data-role="collapsibleset" data-theme="a" data-content-theme="a">
    <div data-role="collapsible">
        <h3>Section 1</h3>
    <p>I'm the collapsible content for section 1</p>
    </div>
    <div data-role="collapsible">
        <h3>Section 2</h3>
    <p>I'm the collapsible content for section 2</p>
    </div>
    <div data-role="collapsible">
        <h3>Section 3</h3>
    <p>Im the collapsible content for section 3</p>
    </div>
</div>

// dynamic collapsible
<button type="button" data-icon="gear" data-iconpos="right" data-mini="true" data-inline="true" id="add">Add</button>
<button type="button" data-icon="plus" data-iconpos="right" data-mini="true" data-inline="true" id="expand">Expand last</button>
<button type="button" data-icon="minus" data-iconpos="right" data-mini="true" data-inline="true" id="collapse">Collapse last</button>
<div data-role="collapsibleset" data-content-theme="a" data-iconpos="right" id="set">
    <div data-role="collapsible" id="set1" data-collapsed="true">
        <h3>Section 1</h3>
        <p>Im the collapsible content.</p>
    </div>
</div>

// better icon
<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
    <h4>Heading</h4>
    <ul data-role="listview" data-inset="false">
        <li>Read-only list item 1</li>
        <li>Read-only list item 2</li>
        <li>Read-only list item 3</li>
    </ul>
</div>
// collapsible content
<div data-role="collapsible" data-collapsed="false">
    <h4>Heading</h4>
    <ul data-role="listview">
        <li><a href="#">List item 1</a></li>
        <li><a href="#">List item 2</a></li>
        <li><a href="#">List item 3</a></li>
    </ul>
</div>
//dialog - use for game
<a href="dialog.html" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" data-transition="pop">Open dialog</a> 

//Multipage
<body>

<!-- Start of first page -->
<div data-role="page" id="foo">

  <div data-role="header">
    <h1>Foo</h1>
  </div><!-- /header -->

  <div role="main" class="ui-content">
    <p>I'm first in the source order so I'm shown as the page.</p>
    <p>View internal page called <a href="#bar">bar</a></p>
  </div><!-- /content -->

  <div data-role="footer">
    <h4>Page Footer</h4>
  </div><!-- /footer -->
</div><!-- /page -->

<!-- Start of second page -->
<div data-role="page" id="bar">

  <div data-role="header">
    <h1>Bar</h1>
  </div><!-- /header -->

  <div role="main" class="ui-content">
    <p>Im the second in the source order so Im hidden when the page loads. Im just shown if a link that references my id is beeing clicked.</p>
    <p><a href="#foo">Back to foo</a></p>
  </div><!-- /content -->

  <div data-role="footer">
    <h4>Page Footer</h4>
  </div><!-- /footer -->
</div><!-- /page -->
</body>

//listview
<ul data-role="listview">
    <li>Acura</li>
    <li>Audi</li>
    <li>BMW</li>
    <li>Cadillac</li>
    <li>Ferrari</li>
</ul>
//flip switch
<form>
    <label for="flip-checkbox-1">Flip toggle switch checkbox:</label>
    <input data-role="flipswitch" name="flip-checkbox-1" id="flip-checkbox-1" type="checkbox">
</form>

//Popup login
<a href="#popupLogin" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-check ui-btn-icon-left ui-btn-a" data-transition="pop">Sign in</a>
<div data-role="popup" id="popupLogin" data-theme="a" class="ui-corner-all">
    <form>
        <div style="padding:10px 20px;">
            <h3>Please sign in</h3>
            <label for="un" class="ui-hidden-accessible">Username:</label>
            <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a">
            <label for="pw" class="ui-hidden-accessible">Password:</label>
            <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="a">
            <button type="submit" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-check">Sign in</button>
        </div>
    </form>
</div>



  // ui-bg_highlight-soft_100_000000_1x100.png Failed to load resource: the server 
 
 sampleXMLLoop=function(){
        var sDefaultData = "";
        for( var i=0; i<titleArray.length; i++)
         {
           sDefaultData += idArray.item(i).firstChild.data + ", " + titleArray.item(i).firstChild.data +  ", " + authorArray.item(i).firstChild.data + "<br/>";
         }
         showMessage(sDefaultData);
      });
  }

  getUsingHttpObject = function(){
   if(xmlHttp)
   {
     try
     {
       xmlHttp.open("Get","./scripts/php/game/test.php", true);
       xmlHttp.onreadystatechange = requestStateChange;
       xmlHttp.send(null);
     }
     catch(e)
     {
       showErrorMessage("Error in getDefaults:\n" + e.toString());
     }
   }
   return;
  } 
getPreferences = function(){
    URL="scripts/php/getPreferences.php";
    sType="POST";
    sDataType="html";
    var request = $.ajax({
    url: URL,
    type: sType,
    data: {location:sLocation,lng : sLong,lat:sLat,decimals:iDecimals,username:sUserName,range:iRange},
    dataType: sDataType
    });
    request.done(function(msg) {
      document.getElementById("get-nearby-data-container").style.cursor = 'default';
      document.getElementById("get-nearby-data").style.cursor = 'default';
      $("#get-nearby-data-container").removeClass("selected");
      $("#get-nearby-data").removeClass("selected");
      if (msg.substring(0,4=="Error")){
        document.getElementById("message").value=msg; 
        log("Get Nearby Data - End w Error "+msg);        
      }else{
        log("Get Nearby Data - End");       
        $("#nearby-data-results table").remove();
        $("#nearby-data-results div").remove(); 
        
        $("#nearby-data-results").append(msg);
        $("#gndata-inputs").addClass("invisible");
        $("#gndata-outputs").removeClass("invisible");
        $("#gndata-back").removeClass("invisible");
        $("#view-nearby-data").removeClass("invisible");
        document.getElementById("message").value="getNearbyData - done "; 
      }
    });
    request.fail(function(jqXHR, textStatus) {
      document.getElementById("get-nearby-data-container").style.cursor = 'default';
      document.getElementById("get-nearby-data").style.cursor = 'default';
      $("#get-nearby-data-container").removeClass("selected");
      $("#get-nearby-data").removeClass("selected");
      document.getElementById("message").value=textStatus;      
      return false;
    });

}

function SavePreferences(psMethod, psURL) {
    var iRound = document.getElementById("round").value;
    var fEndowment = document.getElementById("endowment").value;
    var fMultiplierFactor = document.getElementById("multiplier-factor").value;
    var fLowestDonation= document.getElementById("lowest-donation").value;
    var fHighestDonation = document.getElementById("highest-donation").value;
    var iGameID = document.getElementById("game-id").value;
    var iPreferenceID = document.getElementById("preference-id").value;
     window.console.log("save preferences - start");

     sType=psMethod;
     sDataType="html";
     var request = $.ajax({
     url: psURL,
     type: sType,
     data: {gameID: iGameID,preferenceID:iPreferenceID,round:iRound, endowment:fEndowment, multiplierFactor:fMultiplierFactor, lowestDonation:fLowestDonation, highestDonation:fHighestDonation},
     dataType: sDataType
     });
     request.done(function(msg) {
      if (msg.substring(0,4=="Error")){
        window.console.log("ERROR! ");

      }else{
          window.console.log("SUCCESS! ");
      }
    });
    request.fail(function(jqXHR, textStatus) {
    });

    window.console.log("getData-end");
}
/*

CREATE TABLE IF NOT EXISTS alias (
  `alias_id` int(9) NOT NULL AUTO_INCREMENT,
  `alias` varchar(100) NOT NULL COMMENT '',
  description varchar(100) NULL,
  category varchar(100),
  `creationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`alias_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
INSERT INTO alias (alias,category,description) VALUES ("Calliope","muses","The muse of epic poetry");
INSERT INTO alias (alias,category,description) VALUES ("Erato","muses","The muse of love poetry");
INSERT INTO alias (alias,category,description) VALUES ("Euterpe","muses","The muse of music");
INSERT INTO alias (alias,category,description) VALUES ("Melpomene","muses","The muse of tragedy");
INSERT INTO alias (alias,category,description) VALUES ("Polyhymnia","muses","The muse of sacred poetry");
INSERT INTO alias (alias,category,description) VALUES ("Terpsichore","muses","The muse of dance");
INSERT INTO alias (alias,category,description) VALUES ("Thalia","muses","The muse of comedy");
INSERT INTO alias (alias,category,description) VALUES ("Urania","muses","The muse of astronomy");
INSERT INTO alias (alias,category,description) VALUES ("Tenth Muse","muses","There are no muses for sculpture and painting");

INSERT INTO alias (alias,category,description) VALUES ("Dorothea","Middlemarch","");
INSERT INTO alias (alias,category,description) VALUES ("Celia","Middlemarch","");
INSERT INTO alias (alias,category,description) VALUES ("Casaubon","Middlemarch","");
INSERT INTO alias (alias,category,description) VALUES ("Sir James","Middlemarch","");
INSERT INTO alias (alias,category,description) VALUES ("","Middlemarch","");



CREATE TABLE IF NOT EXISTS `player` (
  `player_id` int(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(9) NOT NULL COMMENT 'Foreign key relating to user',
  `game_id` int(9) NOT NULL COMMENT 'Foreign key relating to game',
  `alias_id` int(9) NOT NULL COMMENT 'Foreign key relating to alias',
  `creationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO player (user_id,game_id,alias_id) VALUES (1,1,1);
INSERT INTO player (user_id,game_id,alias_id) VALUES (2,1,2);

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(9) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) NOT NULL DEFAULT '1',
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `ethnicity` varchar(100) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address_line_one` varchar(255) DEFAULT NULL,
  `address_line_two` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 player 2 experimenter 3 sysadmin',
  `creation_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `log` (
  `system_id` int(11) DEFAULT '1',
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `action_id` int(11) DEFAULT NULL,
  `action_description` varchar(100) DEFAULT NULL,
  `screenwidth` int(11) NOT NULL,
  `screenheight` int(11) NOT NULL,
  `http_user_agent` varchar(128) NOT NULL,
  `remote_addr` varchar(24) DEFAULT NULL,
  `http_host` varchar(24) DEFAULT NULL,
  `http_x_forwarded` varchar(255) DEFAULT NULL,
  `http_x_coming_from` varchar(255) DEFAULT NULL,
  `http_via` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `browser_version` varchar(20) NOT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `game_default` (
  `game_default_id` int(4) NOT NULL AUTO_INCREMENT,
  `num_players` int(4) DEFAULT NULL,
  `num_rounds` int(4) DEFAULT NULL,
  `endowment` float NOT NULL,
  `multiplier` float NOT NULL,
  `lowest_donation` float NOT NULL,
  `highest_donation` float NOT NULL,
  `donation_increment` float NOT NULL,
  `outcome_view` int(11) NOT NULL COMMENT '1 most generous, 2 least generous,3 least and most, 4 all and 5 none',
  `creation_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_default_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int(4) NOT NULL AUTO_INCREMENT,
  `system_id` int(4) NOT NULL DEFAULT '1',
  `game_description` varchar(255) DEFAULT NULL,
  `num_players` int(4) DEFAULT NULL,
  `num_rounds` int(4) DEFAULT NULL,
  `endowment` float NOT NULL,
  `multiplier` float NOT NULL,
  `lowest_donation` float NOT NULL,
  `highest_donation` float NOT NULL,
  `donation_increment` float NOT NULL,
  `outcome_view` int(11) NOT NULL COMMENT '1 most generous, 2 least generous,3 least and most, 4 all and 5 none',
  `punitive_bid` int(11) DEFAULT '1',
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `user_preferences` (
  `user_preferences_id` int(9) NOT NULL AUTO_INCREMENT,
  `system_id` int(9) NOT NULL DEFAULT '1',
  `user_name` varchar(50) NOT NULL,
  `user_id` int(9) NOT NULL COMMENT 'Foreign key pointing to user table',
  `last_game_id` int(11) NOT NULL,
  `creation_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_preferences_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `bid` (
  `bid_id` int(9) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL COMMENT 'Foreign key referring to game table',
  `user_id` int(9) NOT NULL,
  `round_id` int(9) NOT NULL,
  `overall_bids` int(9) NOT NULL,
  `bid` float NOT NULL,
  `bid_direction` int(4) DEFAULT NULL COMMENT '1 to Commons 2 again player 3 split',
  `current_amount` int(9) NOT NULL,
  `creation_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

duplciate with drop table statements
drop table alias;
CREATE TABLE IF NOT EXISTS alias (
  `alias_id` int(9) NOT NULL AUTO_INCREMENT,
  `alias` varchar(100) NOT NULL COMMENT '',
  description varchar(100) NULL,
  category varchar(100),
  `creationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`alias_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
  INSERT INTO alias (alias,category,description) VALUES ("Calliope","muses","The muse of epic poetry");
  INSERT INTO alias (alias,category,description) VALUES ("Erato","muses","The muse of love poetry");
  INSERT INTO alias (alias,category,description) VALUES ("Euterpe","muses","The muse of music");
  INSERT INTO alias (alias,category,description) VALUES ("Melpomene","muses","The muse of tragedy");
  INSERT INTO alias (alias,category,description) VALUES ("Polyhymnia","muses","The muse of sacred poetry");
  INSERT INTO alias (alias,category,description) VALUES ("Terpsichore","muses","The muse of dance");
  INSERT INTO alias (alias,category,description) VALUES ("Thalia","muses","The muse of comedy");
  INSERT INTO alias (alias,category,description) VALUES ("Urania","muses","The muse of astronomy");
  INSERT INTO alias (alias,category,description) VALUES ("Tenth Muse","muses","There are no muses for sculpture and painting");

  INSERT INTO alias (alias,category,description) VALUES ("Dorothea","Middlemarch","");
  INSERT INTO alias (alias,category,description) VALUES ("Celia","Middlemarch","");
  INSERT INTO alias (alias,category,description) VALUES ("Casaubon","Middlemarch","");
  INSERT INTO alias (alias,category,description) VALUES ("Sir James","Middlemarch","");
  INSERT INTO alias (alias,category,description) VALUES ("","Middlemarch","");



CREATE TABLE IF NOT EXISTS `player` (
  `player_id` int(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(9) NOT NULL COMMENT 'Foreign key relating to user',
  `game_id` int(9) NOT NULL COMMENT 'Foreign key relating to game',
  `alias_id` int(9) NOT NULL COMMENT 'Foreign key relating to alias',
  `creationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO player (user_id,game_id,alias_id) VALUES (1,1,1);
INSERT INTO player (user_id,game_id,alias_id) VALUES (2,1,2);

drop table user;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(9) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) NOT NULL DEFAULT '1',
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `ethnicity` varchar(100) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address_line_one` varchar(255) DEFAULT NULL,
  `address_line_two` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 player 2 experimenter 3 sysadmin',
  `creation_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

drop table user_log;
CREATE TABLE IF NOT EXISTS `log` (
  `system_id` int(11) DEFAULT '1',
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `action_id` int(11) DEFAULT NULL,
  `action_description` varchar(100) DEFAULT NULL,
  `screenwidth` int(11) NOT NULL,
  `screenheight` int(11) NOT NULL,
  `http_user_agent` varchar(128) NOT NULL,
  `remote_addr` varchar(24) DEFAULT NULL,
  `http_host` varchar(24) DEFAULT NULL,
  `http_x_forwarded` varchar(255) DEFAULT NULL,
  `http_x_coming_from` varchar(255) DEFAULT NULL,
  `http_via` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `browser_version` varchar(20) NOT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `creation_time` timestamp NOT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

drop table game;
CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int(4) NOT NULL AUTO_INCREMENT,
  `system_id` int(4) NOT NULL DEFAULT 1,
  `game_description` varchar(255) DEFAULT NULL,
  `num_players` int(4) DEFAULT NULL,
  `num_rounds` int(4) DEFAULT NULL,
  `endowment` float NOT NULL,
  `multiplier` float NOT NULL,
  `lowest_donation` float NOT NULL,
  `highest_donation` float NOT NULL,
  `donation_increment` float NOT NULL,
  punitive_bid float NOT NULL DEFAULT 1,
  `outcome_view` int(11) NOT NULL COMMENT '1 most generous, 2 least generous,3 least and most, 4 all and 5 none',
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
drop table user_preferences;

INSERT INTO game (system_id,game_description,num_players,num_rounds,endowment,multiplier,lowest_donation,highest_donation) VALUES (1,"Game One",1,1,1,1,1,1) ;

CREATE TABLE IF NOT EXISTS `user_preferences` (
  `user_preferences_id` int(9) NOT NULL AUTO_INCREMENT,
  `system_id` int(9) NOT NULL DEFAULT '1',
  `user_name` varchar(50) NOT NULL,
  `user_id` int(9) NOT NULL COMMENT 'Foreign key pointing to user table',
  `last_game_id` int(11) NOT NULL,
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ,
  `update_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_preferences_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

drop table bid;
CREATE TABLE IF NOT EXISTS `bid` (
  `bid_id` int(9) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL COMMENT 'Foreign key referring to game table',
  `user_id` int(9) NOT NULL,
  `round_id` int(9) NOT NULL,
  `overall_bids` int(9) NOT NULL,
  `bid` float NOT NULL,
  `bid_direction` int(4) DEFAULT NULL COMMENT '1 to Commons 2 again player 3 split',
  `current_amount` int(9) NOT NULL,
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL  ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

drop table game_default;
CREATE TABLE IF NOT EXISTS `game_default` (
  `game_default_id` int(4) NOT NULL AUTO_INCREMENT,
  `num_players` int(4) DEFAULT NULL,
  `num_rounds` int(4) DEFAULT NULL,
  `endowment` float NOT NULL,
  `multiplier` float NOT NULL,
  `lowest_donation` float NOT NULL,
  `highest_donation` float NOT NULL,
  `donation_increment` float NOT NULL,
  `outcome_view` int(11) NOT NULL COMMENT '1 most generous, 2 least generous,3 least and most, 4 all and 5 none',
  `creation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_default_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

*/