var bg = chrome.extension.getBackgroundPage();

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

//===== Functions called upon startup=====

//Add kitty based on the state at opening of extension
//Have to check if it's blocking, if so use nested switches
//If not blocking, add a sleeping cat
var addKitten = function(){
  // will probably have to nest switch statements
  switch(kitten.mood){
    //happy
    case 0:
      switch(kitten.kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //neutral
    case 1:
      switch(kitten.kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //disappointed
    case 2:
      switch(kitten.kitty_mode){
        case 0:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
        case 1:
          $("#kittyPic").attr("src", "images/placeholder.jpg");
          break;
      }
    //sadz
    case 3:
      switch(kitten.kitty_mode){
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
  if (kitten.powerState==0){
    $("#powerPic").attr("src", "images/power_gray.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
  }
};

//Add state of mode image at oepning of extension
var addMode = function(){
  if (kitten.mode == 0){
    $("#modePic").attr("src", "images/hand.png");
  }
  else{
    $("#modePic").attr("src", "");
  }
};

//===== Functions that make buttons responsive =====

//Show hover image of power button
var hoverPower = function(){
  if (kitten.powerState==0){
    $("#powerPic").attr("src", "images/power_red.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_red.png");
  }
};

//Revert back to original image of power button
var hoverOutPower = function(){
  if (kitten.powerState==0){
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

var counter = setInterval(timer,1000);

var timer = function(){
  count = count - 1;
  if (count <= 0)
  {
    clearInterval(counter);
  }
};

var pormodoro = function(){
  kitten.timeout = jQuery.now();
  if (kitten.kitty_mode == 0){
    //start blocking
    bg.switchBlockingOnOff();
  }
  else{
    //turn off blocking
    bg.switchBlockingOnOff();
  }
};

var allBlock = function(){
  bg.switchBlockingOnOff();
};

var kittyUseBlock = function(){
  if(kitten.powerState == 1){
    if(kitten.study_mode == 0){
      allBlock();
    }
    else(){
      pormodoro();
    }
  }
};

// toggle kitty on/off
var sleepAndWake = function(){
  // if kitty is on, turn off
  if (kitten.powerState == 1){
    $("#powerPic").attr("src", "images/power_gray.png");
    $('#kittyPic').attr("src", "");
    kitten.powerState = 0;
    if (bg.isBlocking == true){
      bg.switchBlockingOnOff();
    }
  }
  // else if kitty is off, turn on
  else{
    $("#powerPic").attr("src", "images/power_green.png");
    $('#kittyPic').attr("src", "images/kitten-gray.jpg");
    kitten.powerState = 1;
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
