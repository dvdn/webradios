function getPathMetadata(streamUrl, streamType) {
console.log(streamUrl);
console.log(streamType);
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
        str = "<a href='"+url+"' target=\"_blank\">What's playing ?</a>"
    }
    document.getElementsByClassName('webradio-metadata')[0].innerHTML=str;
}
/*
null != this.proxy && (a = this.proxy + '?url=' + w.replace(a, ':', '%3A'));

loadShoutcastEvent: function (a) {
    if (null != a && '' != a) {
        a = w.replace(a, '<html>', '');
        a = w.replace(a, '</html>', '');
        a = w.replace(a, '<body>', '');
        a = w.replace(a, '</body>', '');
        a = a.split(',');
        for (var b = a[6], c = 7, d = a.length; c < d; ) var e = c++,
            b = b + (',' + a[e]);
        null != b && '' != b && this.player.ui.setMetadataFromString(w.trim(b))
    }
},
loadIcecastEvent: function (a) {
    if (null != a && '' != a) {
        var b = g.parse(a).firstElement(),
        c = a = null;
        if (b.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + b.nodeType);
        if ('playlist' == b.nodeName.toLowerCase()) {
            for (b = b.elements(); b.hasNext(); ) {
                var d = b.next();
                if (d.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + d.nodeType);
                if ('tracklist' == d.nodeName.toLowerCase()) for (d = d.elements(); d.hasNext(); ) {
                    var e = d.next();
                    if (e.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' +
                        e.nodeType);
                        if ('track' == e.nodeName.toLowerCase()) for (e = e.elements(); e.hasNext(); ) {
                            var f = e.next();
                            if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                            if ('title' == f.nodeName.toLowerCase()) {
                                if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                a = f.children[0].get_nodeValue()
                            } else {
                                var l;
                                if (l = null == c) {
                                    if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                                    l = 'creator' == f.nodeName.toLowerCase()
                                }
                                if (l) {
                                    if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                    c = f.children[0].get_nodeValue()
                                } else {
                                    if (f.nodeType != g.Element) throw new m('Bad node type, expected Element but found ' + f.nodeType);
                                    if ('artist' == f.nodeName.toLowerCase()) {
                                        if (f.nodeType != g.Document && f.nodeType != g.Element) throw new m('Bad node type, expected Element or Document but found ' + f.nodeType);
                                        c = f.children[0].get_nodeValue()
                                    }
                                }
                            }
                        }
                    }
                }
                if (null !=
                    a || null != c) null == c ? this.player.ui.setMetadataFromString(a)  : (b = new ma, b.title = a, b.artist = c, this.player.ui.setMetadata(b))
            }
    }
}
*/
