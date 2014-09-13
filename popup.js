
var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
  isAsleep: false;
};

addKitten = function(){
};

var updateKitten = function(){
  $("#kitten").attr("src", "kitten.jpg");
};

var sleep = function(){
  $("#sleep").attr("src", "kitten.jpg");
  if (isBlocking){
    isBlocking = false;
  }
  else{
    isBlocking = true;
  }
};
var wake = function(){
  //$('#sleep')
};

var openSettings = function(){
  //$('#settings')
};

$(document).ready(function(){
  $(document).on('click', "#kitten", function(){
    updateKitten();
  });
  $(document).on('click', "#sleep", function(){
    sleep();
  });
  $(document).on('click', "#sleep", function(){
    openSettings();
  });
});