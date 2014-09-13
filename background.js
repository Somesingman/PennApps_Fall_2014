var isBlocking = true;
var isClicked = true;

// redirecting code
var host = "http://www.google.com";
var test_url = "http://www.ebay.com";

chrome.webRequest.onBeforeRequest.addListener(
        function() {
         if(isBlocking){
            return {redirectUrl: test_url};
         }
    },
    {
        urls: [
            "*://www.yahoo.com/*"
        ]
    },
    ["blocking"]
);
