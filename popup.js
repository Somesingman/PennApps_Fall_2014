
var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
};

var addKitten = function(){
};

var updateKitten = function(){
  $("#kitten").attr("src", "kitten.jpg");
};

var sleep = function(){
  $("#kitten").attr("src", "kitten.jpg");
  if (isBlocking){
    isBlocking = false;
  }
  else{
    isBlocking = true;
  }
};

var wake = function(){
  $('#kitten').attr("src", "kitten.jpg");
};

var openSettings = function(){
};

$(document).ready(function(){
  $(document).on('click', "#kitten", function(){
    updateKitten();
  });
  $(document).on('click', "#sleep", function(){
    sleep();
  });
  $(document).on('click', "#wake", function(){
    wake();
  });
  $(document).on('click', "#sleep", function(){
    openSettings();
  });
});