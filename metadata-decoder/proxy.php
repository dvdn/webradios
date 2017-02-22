<?php
////////////////////////////////////////////////////////////////////////////////
//
// forked from https://github.com/fbricker/muses/blob/master/proxy.php
//
////////////////////////////////////////////////////////////////////////////////
ini_set("user_agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)");
$f=fopen($_GET['url'],'r');
if(!$f) exit;

if (isset($_GET['action']) && $_GET['action']==="headers") {
    $headersList = get_headers($_GET['url'], 1);
    echo json_encode($headersList);
} else {
    while(!feof($f)){
        echo fread($f, 512);
        flush();
    }
    fclose($f);
}
