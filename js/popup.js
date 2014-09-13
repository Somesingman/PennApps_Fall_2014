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
    mode:0,
    // 0 = glasses
    // 1 = party
    // 2 = sleep
    // 3 = normal
    powerState:0,
    timeout:35,
  }

//=== Functions called upon startup===
var addKitten = function(){
  switch(kitten.mood){
    case 0:
      $("#kittyPic").attr("src", "images/placeholder.jpg");
      break;
    case 1:
      $("#kittyPic").attr("src", "images/power_green.png");  
      break;
    case 2:
      $("#kittyPic").attr("src", "images/power_red.png");
      break;
    case 3:
      $("#kittyPic").attr("src", "images/power_gray.jpg");
      break;
    case 4:
      $("#kittyPic").attr("src", "images/kitten-gray.jpg");
      break;
  }
};

var addPowerButton = function(){
  if (kitten.powerState==0){
    $("#powerPic").attr("src", "images/power_gray.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
  }
};

var addMode = function(){
  if (kitten.mode == 0){
    $("#modePic").attr("src", "images/hand.png");
  }
  else{
    $("#modePic").attr("src", "");
  }
};

//=== Functions that make buttons responsive ===
var hoverPower = function(){
  if (kitten.powerState==0){
    $("#powerPic").attr("src", "images/power_red.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_red.png");
  }
};

var hoverOutPower = function(){
  if (kitten.powerState==0){
    $("#powerPic").attr("src", "images/power_gray.png");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
  }
};

var hoverSetting = function(){
  $("#settingsPic").attr("src", "images/power_gray.png");
};
var hoverOutSetting = function(){
  $("#settingsPic").attr("src", "images/power_gray.png");
};

var sleepAndWake = function(){
  if (bg.isBlocking == true){
    $("#powerPic").attr("src", "images/power_gray.png");
    $('#kittyPic').attr("src", "");
  }
  else{
    $("#powerPic").attr("src", "images/power_green.png");
    $('#kittyPic').attr("src", "images/kitten-gray.jpg");
  }
  bg.switchBlockingOnOff();
};

var openSettings = function(){
	console.log('function is running');
	window.location.href= "task_list.html";
};

$(document).ready(function(){
  addKitten();
  addPowerButton();
  addMode();

  $(document).on('mouseover', "#powerPic", function(){
    hoverPower();
  })
  .on('mouseout', "#settingsPic", function(){
    hoverOutPower();
  })
  .on('click', "#powerPic", function(){
    sleepAndWake();
  })
  .on('mouseover', "#settingsPic", function(){
    hoverSetting();
  })
  .on('mouseout', "#settingsPic", function(){
    hoverOutSetting();
  })
  .on('click', "#settingsPic", function(){
    openSettings();
  });
});
