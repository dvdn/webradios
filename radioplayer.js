/* Radio player management */
/* it depends on mrp.js */
var playerConfig = {
        "codec":"mp3",
        "elementId": "player-wrapper",
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

function returnPlayer(){
    MRP.insert(playerConfig);
}

function loadTrack(radio){
    MRP.setUrl(radio.url);
    MRP.setTitle(radio.title);
    MRP.setMetadataMode(radio.broadcast);
    MRP.play();
}



