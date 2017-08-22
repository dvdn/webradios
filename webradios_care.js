//json file management
var listGenres = ["rock", "electronic", "funk", "reggae", "african", "latino", "classical", "soundtracks", "talk"];

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

//read webradios data
readDataFile("webradios.json", function(text){
    var data = JSON.parse(text);
    //wait for all DOM elements
    window.onload=function(){
        data.webradios.forEach(itemManagement);
    };
});

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
    nodeBtn.onclick = function(){loadTrack(radioItem.title, radioItem.url);};

    for (var i = 0; i < listGenres.length; i++) {
        if (radioItem.genre.indexOf(listGenres[i]) !== -1) {
            document.getElementsByClassName(listGenres[i])[0].appendChild(nodeLi);
            //break if processed
            return;
        }
        //else default
        document.getElementsByClassName("other")[0].appendChild(nodeLi);
    }

}
