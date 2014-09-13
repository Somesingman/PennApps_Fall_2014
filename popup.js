var kitten = {
  mood:"Happy", 
  health:50,
  name:"Sir Fluffykins",
  state:1
};


var addKitten = function(){
};

var updateKitten = function(){
  $("#kittypic").attr("src", "kitten-gray.jpg");
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
  $(document).on('click', "#kittypic", function(){
    updateKitten();
  })
  .on('click', "#gear", function(){
	    console.log('clicking gear is being registered');
	    gear();
  });
});

/*
Progress Update:
1) Got gear button to work on click, "this is new appears"

Next Steps
1) either render a new html page to display new task list
2)
 
*/