/* Radio player management */
/* it depends on mrp.js */
var playerConfig = {
        //'url': null,
        'codec':'mp3',
        'elementId': 'player-wrapper',
        'volume':100,
        'autoplay':false,
        'jsevents':true,
        'buffering':0,
        //'title': null,
        'wmode':'transparent',
        'skin':'cassette',
        'width':200,
        'height':120
        },
    defaultRadio = {
        title:'PBB',
        url:'http://pbb.laurentgarnier.com:8000/pbb128'
        };

function returnPlayerConfig(media = null) {
    if (media == null){
        media = defaultRadio;
        media.autoplay = false
    };
    playerConfig.title = media.title;
    playerConfig.url = media.url;
    playerConfig.autoplay = true;
    return playerConfig;
}

function returnPlayer(title = null, url = null){
    media = (title == null) ? null : {title:title, url:url};
    MRP.stop();
    MRP.insert(returnPlayerConfig(media));
}
