// isBlocking = true when sites will be blocked
var isBlocking = false;
/*
var kitten = {
    name:"Sir Fluffykins",
	health:50, 
	mood:0,
    // 0 = happy
    // 1 = neutral
    // 2 = disappointed
    // 3 = sads
    // 4 = dedz
    mode:0,
    // 0 = glasses
    // 1 = party
    // 2 = sleep
    powerState:0
}
  
chrome.storage.sync.set({'kitten': kitten});
*/
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
}

/* to get kitten
var getKitten = function(){
	chrome.storage.sync.get('kitten', function(result){return result};
}
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





