var bg = chrome.extension.getBackgroundPage();

/*
var kitten = {
  mood:0,
      // 0 = happy
      // 1 = neutral
      // 2 = disappointed
      // 3 = sads
      // 4 = dedz
    health:50, 
    name:"Sir Fluffykins",
	kitty_mode:2,
      // 0 = glasses => will have a mood
      // 1 = party => will have a mood
      // 2 = sleep => when off
    powerState:0,
      // 0 = kitty off
      // 1 = kitty on
    study_mode:0,
      // 0 = default, all-blocking style
      // 1 = Pormodoro, interval style
    timeout:25,
  }
*/

var mood;
chrome.storage.sync.get('mood', function(result){mood = result.mood;});
var health;
chrome.storage.sync.get('health', function(result){health = result.health;});
var name;
chrome.storage.sync.get('name', function(result){name = result.name;});
var kitty_mode;
chrome.storage.sync.get('kitty_mode', function(result){kitty_mode = result.kitty_mode;});
var powerState;
chrome.storage.sync.get('powerState', function(result){powerState = result.powerState;});
var study_mode;
chrome.storage.sync.get('study_mode', function(result){study_mode = result.study_mode;});
var timeout;
chrome.storage.sync.get('timeout', function(result){timeout = result.timeout;});


//===== Functions called upon startup=====

var updateKittyMood = function(){
  chrome.storage.sync.get('health', function(result){health = result.health;});

  switch(health){
    case 0:
      mood = 4;
      chrome.storage.sync.set({'mood': mood});
      break;
    case 1:
      mood = 3;
      chrome.storage.sync.set({'mood': mood});
      break;
    case 2:
      mood = 2;
      chrome.storage.sync.set({'mood': mood});
      break;
    case 3:
      mood = 1;
      chrome.storage.sync.set({'mood': mood});
      break;
    case 4:
      mood = 0;
      chrome.storage.sync.set({'mood': mood});
      break;
  }
};

//Add kitty based on the state at opening of extension
//Have to check if it's blocking, if so use nested switches
//If not blocking, add a sleeping cat
var addKitten = function(){
  chrome.storage.sync.get('kitty_mode', function(result){kitty_mode = result.kitty_mode;});
  chrome.storage.sync.get('mood', function(result){mood = result.mood;});

  updateKittyMood();
  console.log(mood);
  chrome.storage.sync.get('mood', function(result){mood = result.mood;});


  switch(kitty_mode){
    //study
    case 0:
      switch(mood){
        //happy
        case 0:
          $("#kittyPic").attr("src", "images/study_happy.gif");
          break;
        //meh
        case 1:
          $("#kittyPic").attr("src", "images/study_meh.gif");
          break;
        //sad
        case 2:
          $("#kittyPic").attr("src", "images/study_sad.gif");
          break;
        //dying
        case 3:
          $("#kittyPic").attr("src", "images/study_crazy.gif");
          break;
        //dead
        case 4:
          $("#kittyPic").attr("src", "images/dead.gif");
          break;
      }
      break;
    //party
    case 1:
      switch(mood){
        //happy
        case 0:
          $("#kittyPic").attr("src", "images/party_happy.gif");
          break;
        //meh
        case 1:
          $("#kittyPic").attr("src", "images/party_meh.gif");
          break;
        //sad
        case 2:
           $("#kittyPic").attr("src", "images/party_sad.gif");
          break;
        //dying
        case 3:
          $("#kittyPic").attr("src", "images/party_crazy.gif");
          break;
        //dead
        case 4:
          $("#kittyPic").attr("src", "images/dead.gif");
          break;
      }
      break;
    //sleep
    case 2:
      if(mood < 4){
        $("#kittyPic").attr("src", "images/sleeping.gif");
      }
      else{
        $("#kittyPic").attr("src", "images/dead.gif");
      }
      break;  
  }
};

//Add state of power button at opening of extension
var addPowerButton = function(){
  if (powerState == 0){
    $("#powerPic").attr("src", "images/power_gray.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
  }
};

//Add state of mode image at oepning of extension
var addMode = function(){
  if (study_mode == 0){
    $("#modePic").attr("src", "images/hand.png");
  }
  else{
    $("#modePic").attr("src", "images/clock.png");
  }
};

var addSettings = function(){
  $("#settingsPic").attr("src", "images/gear.png");
};

var addHand = function(){
  if(study_mode == 0){
    $("#block_id").attr("src", "images/hand.png");
  }
  else{
    $("#block_id").attr("src", "images/hand_light.png");
  }
};

var addClock = function(){
  if(study_mode == 1){
    $("#study_id").attr("src", "images/clock.png");
  }
  else{
    $("#study_id").attr("src", "images/clock_light.png");
  }
};

//===== Functions that make buttons responsive =====

//Show hover image of power button
var hoverPower = function(){
  if (powerState==0){
    $("#powerPic").attr("src", "images/power_red.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_red.png");
  }
};

//Revert back to original image of power button
var hoverOutPower = function(){
  if (powerState==0){
    $("#powerPic").attr("src", "images/power_gray.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
  }
};

/*************
Hover functions
*************/

//Show hover image of settings button
var hoverSetting = function(){
  $("#settingsPic").attr("src", "images/gear.png");
};

//Revert back to original image of settings button
var hoverOutSetting = function(){
  $("#settingsPic").attr("src", "images/gear_dark.png");
};

var hoverBlock_id = function(){
  if(study_mode != 0){
    $("#block_id").attr("src", "images/hand.png");
  }
};

var hoverOutBlock_id = function(){
  if(study_mode != 0){
    $("#block_id").attr("src", "images/hand_light.png");
  }
};

var hoverClickBlock_id = function(){
  if(study_mode != 0){
    $("#block_id").attr("src", "images/hand_light.png");
  }
};

var hoverStudy_id = function(){
  if(study_mode != 1){
    $("#study_id").attr("src", "images/clock.png");
  }
};

var hoverOutStudy_id = function(){
  if(study_mode != 1){
    $("#study_id").attr("src", "images/clock_light.png");
  }
};

var hoverBack_id = function(){
  $("#back_id").attr("src", "images/arrow.png");
};

var hoverOutBack_id = function(){
  $("#back_id").attr("src", "images/arrow_light.png");
};


//===== Click and Other functions =====

var twentyfiveMin = 1000*10//60 * 1000 * 25;
var fiveMin = 1000*15//60 * 1000 * 5;
var studyTimer;
var partyTimer;

var switchToParty = function(){
  clearInterval(studyTimer);
  timeout++;
  chrome.storage.sync.set({'timeout': timeout});
  bg.switchBlockingOnOff();
  partyTimer = setInterval(switchToStudy, fiveMin);
};

var switchToStudy = function(){
  if (switchToParty != null){
    clearInterval(partyTimer);
  }
  chrome.storage.sync.get('timeout', function(result){timeout = result.timeout;});
  if (timeout < 3){
    chrome.storage.sync.get('health', function(result){health = result.health;});
    health++;
    chrome.storage.sync.set({'health': health});

    bg.switchBlockingOnOff();
    studyTimer = setInterval(switchToParty, twentyfiveMin);
  }
};

var pormodoro = function(){
  bg.switchBlockingOnOff();
  timeout = 0;
  chrome.storage.sync.set({'timeout': timeout});
  studyTimer = setInterval(switchToParty, twentyfiveMin);
};

var allBlock = function(){
  bg.switchBlockingOnOff();
};

var kittyUseBlock = function(){
  if(powerState == 1){
    if(study_mode == 0){
      allBlock();
    }
    else{
      kitty_mode = 0;
      pormodoro();
    }
  }
};

// toggle kitty on/off
var sleepAndWake = function(){
  // if kitty is on, turn off
  if (powerState == 1){
    $("#powerPic").attr("src", "images/power_gray.png");
    kitty_mode = 2;
    chrome.storage.sync.set({'kitty_mode': kitty_mode});
    addKitten();
    powerState = 0;
	  chrome.storage.sync.set({'powerState': powerState});
    if (bg.isBlocking == true){
      bg.switchBlockingOnOff();
    }
  }
  // else if kitty is off, turn on
  else{
    $("#powerPic").attr("src", "images/power_green.png");
    kitty_mode = 0;
    chrome.storage.sync.set({'kitty_mode': kitty_mode});
    addKitten();
    powerState = 1;
	  chrome.storage.sync.set({'powerState': powerState});
    kittyUseBlock();
  }
};

//go bak to the home page
var go_home = function(){
  window.location.href="popup.html";
};

//open up settings window
var openSettings = function(){
	window.location.href= "settings.html";
};


var addSite = function() {
	var website_element = $("textarea");
	var site = String($.trim(website_element.val()));
	if (site != ""){
		var regexp = /(\*|http|https|file|ftp)\:\/\/(\*|(\*\.)[^\*\/]+)\/(.)*/;
		if(regexp.test(site)){
			bg.url_array.push(site);
			website_element.val('');
			chrome.runtime.sendMessage({greeting: "Updated URL"}, function(response) {
			alert(response.farewell);});
		}
		else{
			alert("invalid url");
			}
		/*chrome.permissions.request({
			origins: [site]
		}, function(granted){
			bg.url_array.push(site);
			website_element.val('');
			alert($.inArray(site, bg.url_array));
		});*/
	}
}

//===== Adding listeners and running functions define above =====
$(document).ready(function(){
    addSettings();
    setTimeout(function(){
      if (powerState == 0){
        kitty_mode = 2;
        chrome.storage.sync.set({'kitty_mode': kitty_mode});
      }
      addMode();
      addKitten();
      addPowerButton();
      addClock();
      addHand();
    }, 200);



   /*******************
  powerPic functionality
  *******************/
  $("#powerPic").on('mouseover', function(){
    hoverPower();
  });

  $("#powerPic").on('mouseleave', function(){
    hoverOutPower();
  });

  $("#powerPic").on('click', function(){
    sleepAndWake();
  });

  /*******************
  settingsPic functionality
  *******************/


  $("#settingsPic").on('mouseover', function(){
    hoverSetting();
  });
 
  $("#settingsPic").on('mouseleave', function(){
    hoverOutSetting();
  });

  $('#settingsPic').on('click', function(){
    openSettings();
  });


  /*******************
  settings.html buttons functionality
  *******************/
  
  // 1) block_id  - Works! (all 3 functions)
  $("#block_id").on('mouseover', function(){
    hoverBlock_id();
  });
 
  $("#block_id").on('mouseleave', function(){
    hoverOutBlock_id();
  });

   $("#block_id").on('click', function(event){
    // add image to indicate button has been clicked
    study_mode = 0;
    chrome.storage.sync.set({'study_mode': study_mode});
    $("#study_id").attr("src", "images/clock_light.png");
  });

  // 2) study_id  Works! (all 3 functions)
  $("#study_id").on('mouseover', function(){
    hoverStudy_id();
  });
 
  $("#study_id").on('mouseleave', function(){
    hoverOutStudy_id();
  });

  $("#study_id").on('click',function(event){
    // add image to indicate button has been clciked 
    study_mode = 1;
    chrome.storage.sync.set({'study_mode': study_mode});
    $("#block_id").attr("src", "images/hand_light.png");
  });

  // 3) back_id (Works! - all 3 functions)
  $("#back_id").on('mouseover', function(){
    hoverBack_id();
  });
 
  $("#back_id").on('mouseleave', function(){
    hoverOutBack_id();
  });

  $("#back_id").on('click',function(event){
    var event_id = event.currentTarget.id;
    if (event_id){
      go_home();
    }
  });
  $(document).on('click', "#add_id", function(){
	addSite();
  });
});




