/* Radio player management */
/* it depends on mrp.js */
var playerConfig = {
        'codec':'mp3',
        'elementId': 'player-wrapper',
        'volume':100,
        'autoplay':true,
        'jsevents':true,
        'buffering':0,
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
    playerConfig.title = (media == null) ? defaultRadio.title : media.title;
    playerConfig.url = (media == null) ? defaultRadio.url : media.url;
    return playerConfig;
}

function returnPlayer(title = null, url = null){
    media = (title == null) ? null : {title:title, url:url};
    MRP.stop();
    MRP.insert(returnPlayerConfig(media));
}
