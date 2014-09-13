var bg = chrome.extension.getBackgroundPage();

var kitten = {
  mood:"Happy", 
  health:50, 
  name:"Sir Fluffykins",
  state:1
};

var addKitten = function(){
};

var updateKitten = function(){
  $("#kittyPic").attr("src", "kitten-gray.jpg");
};

var sleepAndWake = function(){
  if (bg.isBlocking == true){
    $("#powerPic").attr("src", "power_red.png");
    $('#kittyPic').attr("src", "");
  }
  else{
    $("#powerPic").attr("src", "power_green.png");
    $('#kittyPic').attr("src", "kitten-gray.jpg");
  }
  bg.switchBlockingOnOff();
  console.log(bg.isBlocking);
};

var openSettings = function(){
};

$(document).ready(function(){
  $(document).on('click', "#kittyPic", function(){
    updateKitten();
  })
  .on('click', "#powerPic", function(){
    sleepAndWake();
  });
});
