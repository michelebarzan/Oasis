<?php

    include "connessione.php";

    $articolo = $_REQUEST["articolo"];
    $stazione = $_REQUEST["stazione"];

    $q="DELETE FROM oasis_produzione.dbo.articoli_stazioni WHERE articolo = $articolo AND stazione = $stazione";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>