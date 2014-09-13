
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
  //alert("hi");
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
});

// $('#sleep').click(sleep(););
// $('#wake').click(wake(););
// $('#settings').click(openSetting(););