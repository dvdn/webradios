//Radio player management
//it depends on mrp.js and config.js
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
        "title":webradioAtOpening.title,
        "url":webradioAtOpening.url
        };

function returnPlayer(){
    MRP.insert(playerConfig);
}

function loadTrack(name, url){
    MRP.setUrl(url);
    MRP.setTitle(name);
    MRP.play();
    document.getElementsByClassName('webradio-name')[0].innerHTML="<a href='"+url+"' target='_blank'>'"+name+"'</a>";
}

function loadMetadata(url, type) {
    displayMetadata(getPathMetadata(url, type));
}
