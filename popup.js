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
    powerState:0
  }

  var addKitten = function(){
    switch(kitten.mood){
      case 0:
      $("#kittyPic").attr("src", "placeholder.jpg");
      break;
      case 1:
      $("#kittyPic").attr("src", "power_green.png");  
      break;
      case 2:
      $("#kittyPic").attr("src", "power_red.png");
      break;
      case 3:
      $("#kittyPic").attr("src", "power_gray.jpg");
      break;
      case 4:
      $("#kittyPic").attr("src", "kitten-gray.jpg");
      break;
    }
  };

  var addPowerButton = function(){
    if (kitten.powerState){
      $("#powerPic").attr("src", "power_green.png");
    }
    else{
      $("#powerPic").attr("src", "power_gray.png");
    }
  };

  var addMode = function(){
    switch(kitten.mode){
      case 0:
      break;
      case 1:
      break;
    }
    $("#modePic").attr("src", "");
  };

  var hoverPower = function(){
    $("#powerPic").attr("src", "power_gray.png");
  };

  var sleepAndWake = function(){
    if (isBlocking == true){
      $("#powerPic").attr("src", "power_gray.png");
      $('#kittyPic').attr("src", "");
    }
    else{
      $("#powerPic").attr("src", "power_green.png");
      $('#kittyPic').attr("src", "kitten-gray.jpg");
    }
    switchBlockingOnOff();
  };

// MIGHT BE ANDY'S FUNCTION THAT DOES openSettings
var openSettings = function(){
};

var gear = function(){
	console.log('function is running');
	
	window.location.href= "task_list.html";
	

	/*
	Sample Code:
	if(domains.contains(request.url)){
    chrome.browserAction.setPopup({
        popup: "tracking.html"
    });

	var para = document.createElement("p");
	var node = document.createTextNode("This is new.");
	para.appendChild(node);
	var element = document.getElementById("main");
	element.appendChild(para);
	*/
	
};

$(document).ready(function(){
  addKitten();
  addPowerButton();
  addMode();

  $(document).on('hover', "#powerPic", function(){
    hoverPower();
  })
  .on('click', "#powerPic", function(){
    sleepAndWake();
  })
  .on('hover', "#settingsPic", function(){
    hoverSetting();
  })
  .on('click', "#settingsPic", function(){
    openSettings();
  });
});

/*
Progress Update:
1) Got gear button to work on click, "this is new appears"

Next Steps
1) either render a new html page to display new task list
2)
 
*/
