//sections for the Dom
var genresSectionsList = {
    "rock":"Rock",
    "electronic":"Electronique",
    "funk":"Funk",
    "reggae":"Reggea, Ska",
    "african":"African",
    "latino":"Latino",
    "soundtracks":"Bandes originales",
    "classical":"Classique",
    "talk":"Conversations",
    "other":"Divers",
}

//return html genres sections
function returnSections() {
    var domBegin = '<section><h2 class="list-heading">';
    var domBetween ='</h2><ul class="';
    var domEnd = '"></ul></section>';
    var targetElement = 'webradios-lists';
    var innerHTMLstr = "";
    for (property in genresSectionsList) {
        innerHTMLstr += domBegin+genresSectionsList[property]+domBetween+property+domEnd;
    }
    document.getElementById(targetElement).innerHTML = innerHTMLstr;
}

function displayItems(text){
    var data = JSON.parse(text);
    //wait for all DOM elements
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded',afterDOMLoaded);
    } else {
        afterDOMLoaded();
    }

    function afterDOMLoaded(){
        data.webradios.forEach(itemManagement);
    }
}

//read json
function readDataFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//for each radio item, append 'li' element by 'ul' genre
function itemManagement(radioItem) {
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
    nodeBtn.onclick = function(){
        loadTrack(radioItem.title, radioItem.url);
        loadMetadata(radioItem.url, radioItem.broadcast);
    };

    for (property in genresSectionsList) {
        if (radioItem.genre.indexOf(property) !== -1) {
            document.getElementsByClassName(property)[0].appendChild(nodeLi);
            //break if processed
            return;
        }
        //else default
        document.getElementsByClassName("other")[0].appendChild(nodeLi);
    }

}
