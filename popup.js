
var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
};

addKitten = function(){
};

updateKitten = function(){
  $("#kitten").attr("src", "");
  alert("hi");
};

sleep = function(){
  $("#kitten").attr("src", "");
  if (isBlocking){
    isBlocking = false;
  }
  else{
    isBlocking = true;
  }
};

wake = function(){
  $('#kitten').attr("src", "")
};

openSettings = function(){

};

$('#kitten').load(function(){updateKitten();});
$('#sleep').click()
$('#wake').click()
$('#settings').click()