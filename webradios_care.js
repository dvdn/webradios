/* XML management */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadRadios(this);
    }
};
xhttp.open("GET", "webradios.xml", true);
xhttp.send();

var listGenres = ["rock", "electronic", "funk", "reggae", "african", "latino", "soundtracks", "talk"];

function loadRadios(xml) {
    var xmlDoc = xml.responseXML;
    var radioslist = xmlDoc.getElementsByTagName("radio");
    /* wait for all DOM elements */
    window.onload=function(){
        /* Array casting to use forEach */
        Array.from(radioslist).forEach(itemManagement);
    };
}
/* for each radio item, append 'li' element by 'ul' genre */
function itemManagement(item) {
    var radioItem = {
            title:item.getElementsByTagName("title")[0].childNodes[0].nodeValue,
            url:item.getElementsByTagName("url")[0].childNodes[0].nodeValue,
            genre:item.getElementsByTagName("genre")[0].childNodes[0].nodeValue,
            website:item.getElementsByTagName("website")[0].childNodes[0].nodeValue
            };
    var nodeLi = document.createElement("li");
    var nodeBtn = document.createElement("button");
    var nodeLinkWeb = document.createElement("a");
    nodeLinkWeb.setAttribute("href", radioItem.website);
    nodeLinkWeb.setAttribute("target", "__blank");
    nodeLinkWeb.setAttribute("class", "website-link");
    var textWebsite = document.createTextNode("website");
    var textTitle = document.createTextNode(radioItem.title);
    var textGenre = document.createTextNode(radioItem.genre);
    nodeBtn.appendChild(textTitle);
    nodeBtn.setAttribute("title", radioItem.genre);
    nodeLinkWeb.appendChild(textWebsite);
    nodeLi.appendChild(nodeBtn);
    nodeLi.appendChild(nodeLinkWeb);
    nodeLi.setAttribute("class", "webradio "+radioItem.genre);
    nodeBtn.onclick = function(){loadTrack(radioItem.title, radioItem.url);};

    for (var i = 0; i < listGenres.length; i++) {
        if (radioItem.genre.indexOf(listGenres[i]) !== -1) {
            document.getElementsByClassName(listGenres[i])[0].appendChild(nodeLi);
            /* break if processed */
            return;
        }
        /* else default */
        document.getElementsByClassName("other")[0].appendChild(nodeLi);
    }
}
