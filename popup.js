
var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
};

addKitten = function(){
};

var updateKitten = function(){
  $("#kitten").attr("src", "kitten.jpg");
  //alert("hi");
};

sleep = function(){
  $("#kitten").attr("src", "kitten.jpg");
  if (isBlocking){
    isBlocking = false;
  }
  else{
    isBlocking = true;
  }
};

wake = function(){
  $('#kitten').attr("src", "kitten.jpg");
};

openSettings = function(){
};

$(document).ready(function(){
  $(document).on('click', "#kitten", function(){
    updateKitten();
  });
});

// $('#sleep').click(sleep(););
// $('#wake').click(wake(););
// $('#settings').click(openSetting(););