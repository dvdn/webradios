function getPathMetadata(streamUrl, streamType) {
    switch (streamType) {
        case 'icecast':
        var b = streamUrl.lastIndexOf('/');
        a= streamUrl.substring(0, b) + '/status.xsl';
        break;
        case 'shoutcast':
        a = streamUrl;
        var b = streamUrl.lastIndexOf('/');
        a= streamUrl.substring(0, b) + '/7.html';
        break;
        default:
        a = null;
    }
    return a;
}

function displayMetadata(url){
    str ="";
    if (url !== null) {
        str = "<a href='"+url+"' target=\"_blank\">Quel titre en ce moment ?</a>"
    }
    document.getElementById('webradio-metadata').innerHTML=str;
}
