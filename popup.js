
var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins"
};

updateKitten = function(){
  $('[name="kitten"]').attr("src", "icon.png");
}

sleep = function(){
  //$('[name="kitten"]'.attr("));
}

wake = function(){

}

document.getElementById("kitten").addEventListener("onMouseOver", addKitten);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("wake").addEventListener("click", wake);

