//Radio player management
//it depends on mrp.js and config.js
var playerConfig = {
    "codec": "mp3",
    "elementId": "player-wrapper",
    "volume": 100,
    "autoplay":  config.autoplay ? config.autoplay : "true",
    "jsevents": true,
    "buffering": 0,
    "wmode": "transparent",
    "skin": config.skin ? config.skin : "e76",
    "width": 200,
    "height": 120,
    "title": config.defaultwebradio.title ? config.defaultwebradio.title : "",
    "url": config.defaultwebradio.url ? config.defaultwebradio.url : ""
};

function returnPlayer() {
    MRP.insert(playerConfig);
}

function loadTrack(name, url) {
    MRP.setUrl(url);
    MRP.setTitle(name);
    MRP.play();
}
