var isBlocking = true;

// redirecting code
var host = "http://www.google.com";
chrome.webRequest.onBeforeRequest.addListener(
        function() {
		if(isBlocking){
         return {redirectUrl: host};
		 }
    },
    {
        urls: [
            "*://www.yahoo.com/*"
        ]
    },
    ["blocking"]
);
