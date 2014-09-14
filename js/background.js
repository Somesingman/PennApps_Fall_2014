// isBlocking = true when sites will be blocked
var isBlocking = false;

var firsttime;

var mood;
	  // 0 = happy
	  // 1 = neutral
	  // 2 = disappointed
	  // 3 = sads
	  // 4 = dedz
var health; 
var name;
var kitty_mode;
	  // 0 = glasses => will have a mood
	  // 1 = party => will have a mood
	  // 2 = sleep => when off
var powerState = 0; //always off when starting
	  // 0 = kitty off
	  // 1 = kitty on
chrome.storage.sync.set({'powerState': powerState});
var study_mode;
	  // 0 = default, all-blocking style
	  // 1 = Pomodoro, interval style
var timeout;
var total_time;

var reset = function(){
	mood = 0;
	  // 0 = happy
	  // 1 = neutral
	  // 2 = disappointed
	  // 3 = sads
	  // 4 = dedz
	health = 50; 
	name = "Sir Fluffykins";
	kitty_mode = 2;
	  // 0 = glasses => will have a mood
	  // 1 = party => will have a mood
	  // 2 = sleep => when off
	  // 0 = kitty off
	  // 1 = kitty on
	study_mode = 0;
	  // 0 = default, all-blocking style
	  // 1 = Pomodoro, interval style
	timeout = 35;
	total_time = 90;
	chrome.storage.sync.set({'mood': mood});
	chrome.storage.sync.set({'health': health});
	chrome.storage.sync.set({'name': name});
	chrome.storage.sync.set({'kitty_mode': kitty_mode});
	chrome.storage.sync.set({'study_mode': study_mode});
	chrome.storage.sync.set({'timeout': timeout});
	chrome.storage.sync.set({'total_time': total_time});
	chrome.storage.sync.set({'firsttime': 0}, function(){alert('firsttime set');});
};

chrome.storage.sync.get('firsttime', function(result){
		if (result.firsttime != 0){
			reset();
			alert('hi');
		}
	}
);

//dynamically changing icons
var switchBlockingOnOff = function (){
	
	if(isBlocking){
		//alert("was blocking");
		isBlocking = false;
		chrome.browserAction.setIcon({path: 'images/icon_off.png'});
		//alert("now not blocking");
	}
	else{
		//alert("was not blocking");
		isBlocking = true;
		chrome.browserAction.setIcon({path: 'images/icon_on.png'});
		//alert("now blocking");
	}
};

/* to get kitten
var getKitten = function(){
	chrome.storage.sync.get('kitten', function(result){return result;});
};
*/
/*
//store kitten
var storeKitten = function(newName, health, mood, mode, powerState){
	var newKitten;
	newKitten = 
}
*/

// redirecting code
var host = "http://www.seas.upenn.edu/~yangyun/block.html";

chrome.webRequest.onBeforeRequest.addListener(
        function() {
			if(isBlocking){
				return {redirectUrl: host};
			}
		},
    {
        urls: [
            "*://*.yahoo.com/*"
        ]
    },
    ["blocking"]
);





