/**
*
* webradioData Prototype and utilities methods
*
**/

function webradioData() {
}

webradioData.prototype.getCurrentSong = function() {
    console.log ("url :" + this.url);
    console.log ("Song name :" + this.currentSong);
}

webradioData.prototype.show = function(elementId) {
    manageBroadcaster();
    /*show response in DOM element*/
    document.getElementById(elementId).innerHTML = "current stream : "+this.url;
}

function getMetadata(broadcaster = null) {

}

function manageBroadcaster(){
    var proxyPath = "metadata-decoder/proxy.php?url=";
    var proxyActionHeaders = "&action=headers";

    var pos = instanceMetadata.url.indexOf('/', 9);
    var rootUrl = instanceMetadata.url.substr(0, pos);

    console.log(rootUrl);

    var url = proxyPath + rootUrl + proxyActionHeaders;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            getBroadcaster(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}

function getBroadcaster(xhrResponse) {
    try {
        var headers = JSON.parse(xhrResponse);
            if ((typeof headers.Server !== 'undefined') && (headers.Server.indexOf("cecast"))==1) {
                console.log('icecast');
            } else {
                console.log('shoutcast or other');
            }
    }
    catch(err) {
        console.log('customBroadcast');
    }
}
