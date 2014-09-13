var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
};

var addKitten = function(){
};

var updateKitten = function(){
  $("#kittyPic").attr("src", "kitten.jpg");
};

var sleepAndWake = function(){
  if (isBlocking == true){
    $("#powerPic").attr("src", "power_red.png");
    $('#kittyPic').attr("src", "face_emoji.jpg");
  }
  else{
    $("#powerPic").attr("src", "power_green.png");
    $('#kittyPic').attr("src", "kitten.jpg");
  }
  switchBlockingOnOff();
};

var wake = function(){
  $('#kittyPic').attr("src", "kitten.jpg");
};

var openSettings = function(){
};

$(document).ready(function(){
  $(document).on('click', "#kittyPic", function(){
    updateKitten();
  });
  $(document).on('click', "#powerPic", function(){
    sleepAndWake();
  });
});
