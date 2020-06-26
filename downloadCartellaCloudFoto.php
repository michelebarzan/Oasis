<?php

    $src=$_GET["src"];
    $nome=$_GET["nome"];
    $protocol=$_GET["protocol"];
    $server=$_GET["server"];
    $path=$_GET["path"];

    $output = exec('C:\\xampp\\htdocs\\Oasis\\files\\rar a "C:\\xampp\\htdocs\\Oasis\\files\\cloudFoto\\'.$nome.'" "C:\\xampp\\htdocs\\'.$path.'" 2>&1');

    echo $output;

    /*$file_url = $protocol."//".$server."//Oasis//files//cloudFoto//$nome.rar";
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
    readfile($file_url); */

?>