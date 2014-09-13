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

};
var hoverOutSetting = function(){
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

//renders settings popup page 
var openSettings = function(){
	window.location.href= "settings.html";
};

/*******************************
Hack Functions
*******************************/

/*
function get_submit_button() {
    var submit = document.getElementbyId('submit_id');
    for(var i=0; i < inputs.length; i++) {
        var inp = inputs[i];
        if(inp.type != 'submit') continue;
        if(inp.value == 'Invoeren' && inp.name == 'submit') {
            return inp;
            break; // exits the loop
        }
    }
    return false;
}
*/


/*****************************
Functions for activating study modes
******************************/



$(document).ready(function(){
  addKitten();
  addPowerButton();
  addMode();

  $("#powerPic").on('mouseover', function(){
    hoverPower();
  });
 
  //Activate blocking mode
  $("#block_id").on('click', function(event){
    var event_id = event.currentTarget.id;
    console.log("block_id clicked");

  });

  //Activate study mode
  $("#study_id").on('click',function(event){
    var event_id = event.currentTarget.id;
    console.log('study_id clicked');
  });

  //Confirm final study mode by clicking submit
  $("#submit_id").on('click',function(event){
    var event_id = event.currentTarget.id;
    console.log('submit_id clicked');
  });
 
  $("#powerPic").on('click', function(){
    sleepAndWake();
  });
 
  $("#settingsPic").on('mouseover', function(){
    hoverSetting();
  });
 
  $("#settingsPic").on('mouseout', function(){
    hoverOutSetting();
  });

  $('#settingsPic').on('click', function(){
    openSettings();
  });
});
