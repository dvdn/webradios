function returnBrokenUrls(text){
    var data = JSON.parse(text);
    //wait for all DOM elements
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded',afterDOMLoaded);
    } else {
        afterDOMLoaded();
    }
    function afterDOMLoaded(){
        data.webradios.forEach(itemCheck);
    }
}

//put each radio item in table
function itemCheck(radioItem) {
    var nodeTable = document.getElementsByTagName("table")[0];
    var nodeTr = document.createElement("tr");
    var nodeTdName = document.createElement("td");
    var nodeTdStream = document.createElement("td");
    var nodeTdValidity = document.createElement("td");
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
    nodeTdValidity.setAttribute("title", radioItem.url);
    nodeTdValidity.setAttribute("class", "stream-valid");
    nodeTdValidity.innerHTML = ".";;

    nodeTr.appendChild(nodeTdName);
    nodeTr.appendChild(nodeTdStream);
    nodeTr.appendChild(nodeTdValidity);

    nodeTable.appendChild(nodeTr);
    urlCheck(radioItem.url);
}

function urlCheck(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    setTimeout(function(){
        var doubt =  (xhr.readyState<3 & xhr.status!=200) ? true : false;
        displayResult(url, doubt);
        xhr.abort();
    }, 1500);
}

function displayResult(url, value){
    var nodeTargetTdValidity = document.querySelectorAll('.stream-valid[title="' + url + '"]')[0];
    var valid = value ? "-> please check" : "seems OK";
    nodeTargetTdValidity.innerHTML = valid;
    console.log(nodeTargetTdValidity);
}
