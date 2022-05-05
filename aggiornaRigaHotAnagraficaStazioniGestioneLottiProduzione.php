<?php

    include "connessione.php";

    $id=$_REQUEST["id"];
    $colonna=$_REQUEST["colonna"];
    $valore = str_replace("'", "", $_REQUEST["valore"]);

    $q="UPDATE oasis_produzione.dbo.stazioni SET [$colonna] = '$valore' WHERE id_stazione = $id";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>