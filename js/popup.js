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
chrome.storage.sync.get('mood', function(result){mood = result.mood; console.log(mood);});
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

//Add kitty based on the state at opening of extension
//Have to check if it's blocking, if so use nested switches
//If not blocking, add a sleeping cat
var addKitten = function(){
  switch(kitty_mode){
    case 0:
      switch(mood){
        case 0:
          $("#kittyPic").attr("src", "images/kitten_gray.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 2:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 3:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 4:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    case 1:
      switch(mood){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 2:
           $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 3:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 4:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    case 2:
      $("#kittyPic").attr("src", "images/placeholder.jpg");
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
}

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

//Show hover image of settings button
var hoverSetting = function(){
  $("#settingsPic").attr("src", "images/power_red.png");
};
//Revert back to original image of settings button
var hoverOutSetting = function(){
  $("#settingsPic").attr("src", "images/gear.png");
};

//===== Click and Other functions =====

var twentyfiveMin = 1000*10//60 * 1000 * 25;
var fiveMin = 1000*15//60 * 1000 * 5;
var studyTimer;
var partyTimer;

var switchToParty = function(){
  clearInterval(studyTimer);
  console.log("hi");
  timeout++;
  chrome.storage.sync.set({'timeout': timeout});
  bg.switchBlockingOnOff();
  partyTimer = setInterval(switchToStudy, fiveMin);
};

var switchToStudy = function(){
  if (switchToParty != null){
    clearInterval(partyTimer);
  }
  console.log("bye");
  chrome.storage.sync.get('timeout', function(result){timeout = result.timeout;});
  if (timeout < 3){
    bg.switchBlockingOnOff();
    studyTimer = setInterval(switchToParty, twentyfiveMin);
    console.log(timeout);
  }
  else{
    console.log("exit")
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
    $('#kittyPic').attr("src", "");
    powerState = 0;
	  chrome.storage.sync.set({'powerState': powerState});
    if (bg.isBlocking == true){
      bg.switchBlockingOnOff();
    }
  }
  // else if kitty is off, turn on
  else{
    $("#powerPic").attr("src", "images/power_green.png");
    $('#kittyPic').attr("src", "images/kitten-gray.jpg");
    powerState = 1;
	  chrome.storage.sync.set({'powerState': powerState});
    kittyUseBlock();
  }
};

var turnOff = function(){
    $("#powerPic").attr("src", "images/power_gray.png");
    $('#kittyPic').attr("src", "kitten-gray.jpg");
};

//go bak to the home page
var go_home = function(){
  window.location.href="popup.html";
};

//open up settings window
var openSettings = function(){
  turnOff();
	window.location.href= "settings.html";
};

//===== Adding listeners and running functions define above =====
$(document).ready(function(){
    addSettings();
    setTimeout(function(){
      addMode();
      addKitten();
      addPowerButton();
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
  

  /*****************
  Settings button : Productivity Modes functionality
  *******************/
 
  //Activate blocking mode
  $("#block_id").on('click', function(event){
    study_mode = 0;
    chrome.storage.sync.set({'study_mode': study_mode});
    console.log("block")
  });

  //Activate study mode
  $("#study_id").on('click',function(event){
    study_mode = 1;
    chrome.storage.sync.set({'study_mode': study_mode});
    console.log("study");
  });

  //Confirm final study mode by clicking submit
  $("#back_id").on('click',function(event){
    console.log("back");
    var event_id = event.currentTarget.id;
    if (event_id){
      go_home();
    }
  });
});




