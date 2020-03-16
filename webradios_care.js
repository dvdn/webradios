//sections for the Dom
var genresSectionsList = {
    "rock":"Rock",
    "electronic":"Electronique",
    "8-bit":"Electro 8-bit",
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
    var domBegin = '<section><h3 class="list-heading">';
    var domBetween ='</h3><ul class="';
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
    var textTitle = document.createTextNode(radioItem.title);
    var textGenre = document.createTextNode(radioItem.genre);
    nodeBtn.appendChild(textTitle);
    nodeBtn.setAttribute("title", radioItem.genre);
    nodeLi.appendChild(nodeBtn);
    nodeLi.setAttribute("class", "webradio "+radioItem.genre);
    nodeBtn.onclick = function(){
        loadTrack(radioItem.title, radioItem.url);
        displayName(radioItem.title, radioItem.website)
        displayMetadata(getPathMetadata(radioItem));
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

function displayName(name, website){
    document.getElementById('webradio-name').innerHTML="<a href='"+website+"' target='_blank'>"+name+"</a>";
}
