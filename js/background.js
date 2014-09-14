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
	health = 5; 
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
	timeout = 3;
	chrome.storage.sync.set({'mood': mood});
	chrome.storage.sync.set({'health': health});
	chrome.storage.sync.set({'name': name});
	chrome.storage.sync.set({'kitty_mode': kitty_mode});
	chrome.storage.sync.set({'study_mode': study_mode});
	chrome.storage.sync.set({'timeout': timeout});
	chrome.storage.sync.set({'firsttime': 0});
};

chrome.storage.sync.get('firsttime', function(result){
		if (result.firsttime != 0){
			reset();
		}
	}
);

//dynamically changing icons
var switchBlockingOnOff = function (){
	
	if(isBlocking){
		isBlocking = false;
		chrome.browserAction.setIcon({path: 'images/icon_off.png'});
	}
	else{
		isBlocking = true;
		chrome.browserAction.setIcon({path: 'images/icon_on.png'});	}
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
var url_array = ["*://*.yahoo.com/*", "*://*.reddit.com/*"];
var urls = {urls : url_array};

// redirecting code
var host = "http://www.seas.upenn.edu/~yangyun/block.html";

var callback = function() {
	if(isBlocking) {
		chrome.storage.sync.get('health', function(result){health = result.health;});
		health--;
		chrome.storage.sync.set({'health': health});
		return {redirectUrl: host};
	}
};

chrome.webRequest.onBeforeRequest.addListener(callback, urls, ["blocking"]);

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		chrome.webRequest.onBeforeRequest.removeListener(callback);
		chrome.webRequest.onBeforeRequest.addListener(callback, urls, ["blocking"]);
		sendResponse({farewell : "plz"});
	}
)





