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
      // 1 = Pomodoro, interval style
    timeout:35,
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
var total_time;
chrome.storage.sync.get('total_time', function(result){total_time = result.total_time;});


//===== Functions called upon startup=====

//Add kitty based on the state at opening of extension
//Have to check if it's blocking, if so use nested switches
//If not blocking, add a sleeping cat
var addKitten = function(){
  // will probably have to nest switch statements
  switch(mood){
    //happy
    case 0:
      switch(kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //neutral
    case 1:
      switch(kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //disappointed
    case 2:
      switch(kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //sadz
    case 3:
      switch(kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //dedz
    case 4:
      $("#kittyPic").attr("src", "images/placeholder.jpg");
  }
};

//Add state of power button at opening of extension
var addPowerButton = function(){
  if (powerState==0){
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
    $("#modePic").attr("src", "");
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

//Show hover image of settings button
var hoverSetting = function(){
  $("#settingsPic").attr("src", "images/power_red.png");
};
//Revert back to original image of settings button
var hoverOutSetting = function(){
  $("#settingsPic").attr("src", "images/gear.png");
};

//===== Click functions =====
//var counter = setInterval(timer,1000);

var timer = function(){
};

var pormodoro = function(){
  timeout = jQuery.now();
  chrome.storage.sync.set({'timeout': jQuery.now()});
  if (kitty_mode == 0){
    //start blocking
    bg.switchBlockingOnOff();
  }
  else{
    //turn off blocking
    //bg.switchBlockingOnOff();
  }
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

//open up settings window
var openSettings = function(){
	window.location.href= "task_list.html";
};

//===== Adding listeners and running functions define above =====
$(document).ready(function(){
  addKitten();
  addPowerButton();
  addMode();

  $(document).on('mouseover', "#powerPic", function(){
    hoverPower();
  });
  $(document).on('mouseleave', "#powerPic", function(){
    hoverOutPower();
  });
  $(document).on('click', "#powerPic", function(){
    sleepAndWake();
  });
  $(document).on('mouseover', "#settingsPic", function(){
    hoverSetting();
  });
  $(document).on('mouseleave', "#settingsPic", function(){
    hoverOutSetting();
  });
  $(document).on('click', "#settingsPic", function(){
    openSettings();
  });
});
