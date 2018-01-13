function returnBrokenUrls(text){
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

//for each radio item, append 'li' element by 'ul' genre
function itemManagement(radioItem) {
    var nodeTable = document.getElementsByTagName("table")[0];
    var nodeTr = document.createElement("tr");
    var nodeTdName = document.createElement("td");
    var nodeTdStream = document.createElement("td");
    var nodeLinkWeb = document.createElement("a");
    nodeLinkWeb.setAttribute("href", radioItem.website);
    nodeLinkWeb.setAttribute("target", "__blank");
    var nodeLinkStream = document.createElement("a");
    nodeLinkStream.setAttribute("href", radioItem.url);
    nodeLinkStream.setAttribute("target", "__blank");

    var textTitle = document.createTextNode(radioItem.title);
    var textUrl = document.createTextNode(radioItem.url);

    nodeLinkWeb.appendChild(textTitle);
    nodeLinkStream.appendChild(textUrl);

    nodeTdName.appendChild(nodeLinkWeb);
    nodeTdStream.appendChild(nodeLinkStream);

    nodeTr.appendChild(nodeTdName);
    nodeTr.appendChild(nodeTdStream);

    nodeTable.appendChild(nodeTr);
}
