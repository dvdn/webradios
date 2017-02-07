/* XML management */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadRadios(this);
    }
};
xhttp.open("GET", "webradios.xml", true);
xhttp.send();

var listGenres = ['rock', 'electronic', 'reggae', 'soundtracks', 'other'];

function loadRadios(xml) {
    var xmlDoc = xml.responseXML,
    radioslist = xmlDoc.getElementsByTagName("radio");
    /* wait for all DOM elements */
    window.onload=function(){
        /* Array casting to use forEach */
        Array.from(radioslist).forEach(itemManagement);
    }
}
/* for each radio item, append 'li' element by 'ul' genre */
function itemManagement(item) {
    var radioItem = {
            title:item.getElementsByTagName("title")[0].childNodes[0].nodeValue,
            url:item.getElementsByTagName("url")[0].childNodes[0].nodeValue,
            genre:item.getElementsByTagName("genre")[0].childNodes[0].nodeValue,
            },
        nodeLi = document.createElement("li"),
        nodeBtn = document.createElement("button"),
        text = document.createTextNode(radioItem.title)
    nodeBtn.appendChild(text);
    nodeLi.appendChild(nodeBtn);
    nodeLi.setAttribute('class', 'webradio '+radioItem.genre);
    nodeBtn.onclick = function(){returnPlayer(radioItem.title, radioItem.url)};

    for (var i = 0; i < listGenres.length; i++) {
        if (radioItem.genre.indexOf(listGenres[i]) !== -1) {
            document.getElementById(listGenres[i]).appendChild(nodeLi);
            /* break if processed */
            return;
        }
        /* else default */
        document.getElementById("other").appendChild(nodeLi);
    }

}
