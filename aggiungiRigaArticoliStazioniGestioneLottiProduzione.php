<?php

    include "connessione.php";

    $articolo = $_REQUEST["articolo"];
    $stazione = $_REQUEST["stazione"];

    $q="INSERT INTO oasis_produzione.dbo.articoli_stazioni (articolo,stazione) VALUES ($articolo,$stazione)";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>