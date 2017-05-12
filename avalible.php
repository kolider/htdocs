<?php
/**
 * Created by PhpStorm.
 * User: kolider
 * Date: 12.05.2017
 * Time: 22:02
 */
if ((!empty($_GET)) and (isset($_GET["domain"]))){
    $domain = htmlspecialchars($_GET["domain"]);
    $ipaddress = $domain = $domain.".credolove.com";
    $ipaddress = gethostbyname($domain);
    if ($ipaddress == $domain) {
        echo "true";
        //$jsonData["access"] = true;
    }
    else {
        echo "false";
        //$jsonData["access"] = false;
    }
    //echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
}