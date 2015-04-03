var xmlHttp = new XMLHttpRequest();

setEventHandlers= function (){
  //document.getElementById("update-game-defaults-btn").onclick=function(){
   // gameDefaultsSave("POST","scripts/php/game/gameSave.php");
  //}  
  //document.getElementById("create-game-btn").onclick=function(){
  //  gameCreate("POST","scripts/php/game/gameCreate.php");
  //}  

  /*
  document.getElementById("get-preferences").onclick=function(){
    window.console.log("in get click")
    $(".container").removeClass("active");
    $("#preferences.container").addClass("active");
    // getPreferences();
  }
  document.getElementById("view-users").onclick=function(){
    $(".container").removeClass("active");
    $("#users.container").addClass("active");
  } 

  document.getElementById("save-users").onclick=function(){
    SaveUsers("POST", "scripts/php/usersSave.php")
  }
  document.getElementById("view-bids").onclick=function(){
    $(".container").removeClass("active");
    $("#bidding.container").addClass("active");
  } 

  document.getElementById("save-bids").onclick=function(){
    SaveBids("POST", "scripts/php/biddingSave.php")
  }
  */
}

gameDefaultsGet = function(){
    return;
    URL="./scripts/php/game/gameDefaultsGet.php";
    sType="POST";
    sDataType="xml";

    var request = $.ajax({
    url: URL,
    type: sType
    });
    request.done(function(xmlResponse) {
       //get default game info
       xmlRoot = xmlResponse.documentElement;  
       gameDescriptionArray = xmlRoot.getElementsByTagName("game_description"); 
       numPlayersArray = xmlRoot.getElementsByTagName("num_players"); 
       numRoundsArray = xmlRoot.getElementsByTagName("num_rounds"); 
       endowmentArray = xmlRoot.getElementsByTagName("endowment"); 
       multiplierArray = xmlRoot.getElementsByTagName("multiplier"); 
       lowestDonationArray = xmlRoot.getElementsByTagName("lowest_donation"); 
       highestDonationArray = xmlRoot.getElementsByTagName("highest_donation"); 
       donationIncrementArray = xmlRoot.getElementsByTagName("donation_increment"); 
       donationIncrementArray = xmlRoot.getElementsByTagName("donation_increment"); 
       outcomesViewArray = xmlRoot.getElementsByTagName("outcome_view"); 
       punitiveBidArray = xmlRoot.getElementsByTagName("punitive_bid"); 

       document.getElementById("game-description").value = gameDescriptionArray.item(0).firstChild.data;
       document.getElementById("num-players").value = numPlayersArray.item(0).firstChild.data;
       document.getElementById("num-rounds").value = numRoundsArray.item(0).firstChild.data;
       document.getElementById("endowment").value = endowmentArray.item(0).firstChild.data;
       document.getElementById("multiplier").value = multiplierArray.item(0).firstChild.data;
       document.getElementById("lowest-donation").value = lowestDonationArray.item(0).firstChild.data;
       document.getElementById("highest-donation").value = highestDonationArray.item(0).firstChild.data;
       document.getElementById("donation-increment").value = donationIncrementArray.item(0).firstChild.data;
       document.getElementById("outcomes-view").value = outcomesViewArray.item(0).firstChild.data;
       document.getElementById("punitive-bid").value = punitiveBidArray.item(0).firstChild.data;
        
      gameUpdateOptionAttributes();
      return;
    });
    request.fail(function(jqXHR, sResult) {
      //document.getElementById("message").value=textStatus;
      showErrorMessage("getDefaults fail\n"+sResult);
      return false;
    });

}

gameCreateAndUpdate = function(psTarget) {
  var sType="POST";

  sGameDescription = $("#game-description").val();
  iNumPlayers = $("#num-players").spinner("value");
  iNumRounds = $("#num-rounds").spinner("value");
  fEndowment = $("#endowment").spinner("value");
  fMultiplier = $("#multiplier").spinner("value");
  fHighestDonation = $("#highest-donation").spinner("value");
  fLowestDonation = $("#lowest-donation").spinner("value");
  fDonationIncrement = $("#donation-increment").spinner("value");
  iOutcomeView = $("#outcomes-view").val();
  iPunitiveBid = $("#punitive-bid").val();
  iGameID = $.main.gameID;
  iGameDefaultID = $.main.gameDefaultID;

  //Correct bad data to defaults
  if (!Number.isInteger(iNumPlayers))iNumPlayers=10;
  if (!Number.isInteger(iNumRounds))iNumRounds=10;


    var request = $.ajax({
    url: "./scripts/php/game/gameCreateAndUpdate.php",
    dataType: "xml",
    data: { game_default_id : iGameDefaultID,
            game_id : iGameID,
            game_description : sGameDescription,
            num_players : iNumPlayers,
            num_rounds : iNumRounds,
            endowment : fEndowment,
            multiplier : fMultiplier,
            lowest_donation : fLowestDonation,
            highest_donation : fHighestDonation,
            donation_increment : fDonationIncrement,
            outcome_view : iOutcomeView,
            punitive_bid : iPunitiveBid,
            target : psTarget},
    type: sType
    });
     request.done(function(xmlResponse) {
         
      if (psTarget=="create-game"){
          $.bm_ui.messageShow("game created");
          
          xmlRoot = xmlResponse.documentElement;  
          userIdArray = xmlRoot.getElementsByTagName("game-id"); 
          $.main.gameID= userIdArray.item(0).firstChild.data;
          //console.log($.main.gameID);
          // add option with attributes
          //$("#select-game option:selected").text($("#game-description").value());
      }
      if (psTarget=="update-game"){
        console.log("update game");
        //$.bm_ui.messageShow("game updated");
        $("#select-game option:selected").text($("#game-description").val());
        var iIndex=$("#select-game option").index($("#select-game option:selected"));
        $("#select-game-menu li").eq(iIndex).text($("#game-description").val()); 
      }
      if (psTarget=="update-default-game"){$.bm_ui.messageShow("default updated");}

/*       xmlRoot = xmlResponse.documentElement;  
         gameDescriptionArray = xmlRoot.getElementsByTagName("game_description"); 
         numPlayersArray = xmlRoot.getElementsByTagName("num_players"); 
         numRoundsArray = xmlRoot.getElementsByTagName("num_rounds"); 
         endowmentArray = xmlRoot.getElementsByTagName("endowment"); 
         multiplierArray = xmlRoot.getElementsByTagName("multiplier"); 
         lowestDonationArray = xmlRoot.getElementsByTagName("lowest_donation"); 
         highestDonationArray = xmlRoot.getElementsByTagName("highest_donation"); 
         donationIncrementArray = xmlRoot.getElementsByTagName("donation_increment"); 
         outcomesViewArray = xmlRoot.getElementsByTagName("outcome_view"); 
         punitiveBidArray = xmlRoot.getElementsByTagName("punitive_bid"); 

         document.getElementById("game-description").value = gameDescriptionArray.item(0).firstChild.data;
         document.getElementById("num-rounds").value = numRoundsArray.item(0).firstChild.data;
         document.getElementById("endowment").value = endowmentArray.item(0).firstChild.data;
         document.getElementById("multiplier").value = multiplierArray.item(0).firstChild.data;
         document.getElementById("lowest-donation").value = lowestDonationArray.item(0).firstChild.data;
         document.getElementById("highest-donation").value = highestDonationArray.item(0).firstChild.data;
         document.getElementById("donation-increment").value = donationIncrementArray.item(0).firstChild.data;
         document.getElementById("outcomes-view").value = outcomesViewArray.item(0).firstChild.data;
         document.getElementById("punitive-bid").value = punitiveBidArray.item(0).firstChild.data;
*/      
         return;
        });
        request.fail(function(jqXHR, sResult) {
          //document.getElementById("message").value=textStatus;
          showErrorMessage("login fail\n"+sResult);
          return false;
        });
      }

gamePopulateControls = function(pOption){
  //pOption is the button clicked. Not used here.
  //Called by the change event of select-game
  sGameDescription=$("#select-game option:selected").text();
  iNumPlayers=$("#select-game option:selected").attr("num-players");
  iNumRounds=$("#select-game option:selected").attr("num-rounds");
  fEndowment=$("#select-game option:selected").attr("endowment");
  fMultiplier=$("#select-game option:selected").attr("multiplier");
  fLowestDonation=$("#select-game option:selected").attr("lowest-donation");
  fHighestDonation=$("#select-game option:selected").attr("highest-donation");
  fDonationIncrement=$("#select-game option:selected").attr("donation-increment");
  iOutcomeView=$("#select-game option:selected").attr("outcome-view");
  iPunitiveBid=$("#select-game option:selected").attr("punitive-bid");

  $.main.gameID=$("#select-game option:selected").val();
  $("#game-id").val($.main.gameID);
  //console.log("in gamePopulateControls game id is "+$.main.gameID);

  $("#game-description").val(sGameDescription);
  $("#num-players").spinner("value",iNumPlayers);
  $("#num-rounds").spinner("value",iNumRounds);
  $("#endowment").spinner("value",fEndowment);
  $("#multiplier").spinner("value",fMultiplier);
  $("#highest-donation").spinner("value",fHighestDonation);
  $("#lowest-donation").spinner("value",fLowestDonation);
  $("#donation-increment").spinner("value",fDonationIncrement);
  $("#outcomes-view").val(iOutcomeView);
  $("#punitive-bid").val(iPunitiveBid);

}
gameUpdateOptionAttributes = function(){
  // Populate option attributes of game selection SELECT with game met data. 
  // Call after update game as well as on game default load
  $("#select-game option").eq(0).text($("#game-description").val());
  $("#select-game option").eq(0).attr("num-players",$("#num-players").val());
  $("#select-game option").eq(0).attr("num-rounds",$("#num-rounds").val());
  $("#select-game option").eq(0).attr("endowment",$("#endowment").val());
  $("#select-game option").eq(0).attr("multiplier",$("#multiplier").val());
  $("#select-game option").eq(0).attr("lowest-donation",$("#lowest-donation").val());
  $("#select-game option").eq(0).attr("highest-donation",$("#highest-donation").val())
  $("#select-game option").eq(0).attr("donation-increment",$("#donation-increment").val());
  $("#select-game option").eq(0).attr("outcome-view",$("#outcome-view").val());
  $("#select-game option").eq(0).attr("punitive-bid",$("#punitive-bid").val());
  return;
}



function playerSave(psMethod, psURL) {

    var iUserID = document.getElementById("user-id").value;
    var sFirstName = document.getElementById("first-name").value;
    var sMiddleName = document.getElementById("middle-name").value;
    var sLastName = document.getElementById("last-name").value;
    var dDateOfBirth = document.getElementById("date-of-birth").value;
    var sEthnicity = document.getElementById("ethnicity").value;
    var sFirstLanguage = document.getElementById("first-language").value;
    var sSecondLanguage = document.getElementById("second-language").value;
    var sAlias = document.getElementById("alias").value;

    window.console.log("save users - start");

    sType = psMethod;
    sDataType = "html";
    var request = $.ajax({
      url:psURL,
      type:sType,
      data:{userID:iUserID, firstName:sFirstName, middleName:sMiddleName, lastName:sLastName, dateOfBirth:dDateOfBirth, ethnicity:sEthnicity, firstLanguage:sFirstLanguage, secondLanguage:sSecondLanguage},
      dataType:sDataType
    });

    request.done(function(msg) {
      if (msg.substring(0, 4 == "Error")){
        window.console.log("Error! ");
      } else {
          window.console.log("SUCCESS! ");
      }
    });

    request.fail(function(jqXHR, textStatus) {
    });

    window.console.log("getData-end");
}

function bidSubmit() {
    //var iBiddingID = document.getElementById("bid-id").value;
    var iGameID = document.getElementById("game-id").value;
    var iUserID = document.getElementById("user-id").value;
    var iRoundID = document.getElementById("round").value;
    var iBidDirection = $("#bid-direction").val();;

    var sURL = "scripts/php/game/bidSave.php";
    //var fOverallBids = document.getElementById("overall-bids").value;
    var fBid = document.getElementById("bid").value;
    //var fCurrentAmount = document.getElementById("current-amount").value;

    sType = "POST";
    sDataType = "xml";
    var request = $.ajax({
      url:sURL,
      type:sType,
      data:{game_id:iGameID, user_id:iUserID, round_id:iRoundID, bid:fBid,bid_direction:iBidDirection},
      dataType:sDataType
    });
    request.done(function(xmlResponse) {
        xmlRoot = xmlResponse.documentElement; 
       if (xmlRoot){  
         errorCodeArray = xmlRoot.getElementsByTagName("error_code"); 
         iErrorCode= errorCodeArray.item(0).firstChild.data;
         errorMessageArray = xmlRoot.getElementsByTagName("error_message"); 
         sErrorMessage= errorCodeArray.item(0).firstChild.data;
         bidIdArray = xmlRoot.getElementsByTagName("bid_id"); 
         iBidId = bidIdArray.item(0).firstChild.data;
         if (iErrorCode==0){
            $("#bid-id").val(iBidId);
          }
        } else{
          console.log("bidsave request done invalid return xml message "+xmlRoot);
        }
    });

    request.fail(function(jqXHR, textStatus) {
    });

}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  
  // brianmacmillan.com
  //var url = "/php/citibike_proxy.php";
  //localhost
  var url = "php/citibike_proxy.php";
  
}