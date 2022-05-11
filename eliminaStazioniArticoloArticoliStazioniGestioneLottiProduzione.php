<?php

    include "connessione.php";

    $articolo = $_REQUEST["articolo"];

    $q="DELETE FROM oasis_produzione.dbo.articoli_stazioni WHERE articolo = $articolo";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>