<?php

    include "connessione.php";

    $articolo = $_REQUEST["articolo"];
    $articoliIncolla = $_REQUEST["articoliIncolla"];

    $articoliIncollaIn = implode(",",$articoliIncolla);

    $q="DELETE FROM oasis_produzione.dbo.articoli_stazioni WHERE articolo IN ($articoliIncollaIn)";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

    foreach ($articoliIncolla as $articoloIncolla)
    {
        $q2="INSERT INTO oasis_produzione.dbo.articoli_stazioni (articolo,stazione) SELECT $articoloIncolla,stazione FROM oasis_produzione.dbo.articoli_stazioni WHERE articolo = $articolo";
        $r2=sqlsrv_query($conn,$q2);
        if($r2==FALSE)
        {
            die("error".$q2);
        }
    }

?>