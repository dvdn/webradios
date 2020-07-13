//sections for the Dom
const genresSectionsList = {
    "funk":"Funk",
    "hiphop":"Hip Hop",
    "reggae":"Reggea, Ska",
    "african":"African",
    "latino":"Latino",
    "rock":"Rock",
    "electronic":"Electronique",
    "other":"Divers",
    "talk":"Conversations",
    "8-bit":"8-bit",
    "soundtracks":"Bandes originales",
    "classical":"Classique",
}

//all genres but 'other'
const keysGenresSectionsList = Object.keys(genresSectionsList);
const index = keysGenresSectionsList.indexOf("other");
if (index > -1) {
  keysGenresSectionsList.splice(index, 1);
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




    var itemGenres = radioItem.genre.split(' ');

    var array_intersection = itemGenres.filter(function(x) {
        // checking second array contains the element "x"
        if(keysGenresSectionsList.indexOf(x) != -1)
            return true;
        else
            return false;
        });

    //if genre is known else default section
    if (array_intersection[0]!== undefined) {
        document.getElementsByClassName(array_intersection[0])[0].appendChild(nodeLi);
    } else {
        document.getElementsByClassName("other")[0].appendChild(nodeLi);
    }

}

function displayName(name, website){
    document.getElementById('webradio-name').innerHTML="<a href='"+website+"' target='_blank'>"+name+"</a>";
}
