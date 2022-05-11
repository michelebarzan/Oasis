<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $id_articolo=$_REQUEST["id_articolo"];

    $q="DELETE FROM oasis_produzione.dbo.articoli_lotti WHERE lotto = $id_lotto AND articolo = $id_articolo";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }

?>