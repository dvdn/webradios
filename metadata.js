function getPathMetadata(radioItem) {
    streamUrl = radioItem.url;
    streamCast = radioItem.broadcast;
    console.log(streamCast);
    switch (streamCast) {
        case 'icecast':
        var b = streamUrl.lastIndexOf('/');
        a= streamUrl.substring(0, b) + '/status.xsl';
        break;
        case 'shoutcast':
        a = streamUrl;
        var b = streamUrl.lastIndexOf('/');
        a= streamUrl.substring(0, b) + '/7.html';
        break;
        case '':
        a = null;
        break;
        default:
        a = streamCast;
    }
    return a;
}

function displayMetadata(url){
    str ="";
    if (url !== null) {
        str = "<a href='"+url+"' target=\"_blank\">&nbsp;Quel titre en ce moment ?&nbsp;</a>"
    }
    document.getElementById('webradio-metadata').innerHTML=str;
}
