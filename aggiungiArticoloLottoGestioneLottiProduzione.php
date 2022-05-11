<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $id_articolo=$_REQUEST["id_articolo"];

    $q="INSERT INTO oasis_produzione.dbo.articoli_lotti (lotto,articolo) VALUES ($id_lotto,$id_articolo)";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>