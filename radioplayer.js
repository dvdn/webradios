/* Radio player management */
/* it depends on mrp.js */
var playerConfig = {
        "codec":"mp3",
        "elementId": "player",
        "volume":100,
        "autoplay":true,
        "jsevents":true,
        "buffering":0,
        "wmode":"transparent",
        "skin":"cassette",
        "width":200,
        "height":120,
        "title":"PBB",
        "url":"http://pbb.laurentgarnier.com:8000/pbb128",
        "metadataMode":"icecast",
        "metadataProxy":"proxy.php"
        };
var supportBrodcastList = ["icecast", "shoutcast"];

function musesCallback(event,value){
    if (event == "metadata"){
        MRP.setTitle(value);
        document.getElementById("player").setAttribute("title", value);
    }
}

function returnPlayer(){
    MRP.insert(playerConfig);
}

function loadTrack(radio){
    MRP.setUrl(radio.url);
    if(supportBrodcastList.indexOf(radio.broadcast)!=-1) {
        MRP.setMetadataMode(radio.broadcast);
    } else {
        MRP.setTitle(radio.title);
        MRP.showInfo("current song not supported");
    }
    MRP.play();
    fillDomId("metadata-display", radio.title);
}

function fillDomId(elementId, value){
   document.getElementById(elementId).innerHTML = value;
}



