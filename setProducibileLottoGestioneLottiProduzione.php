<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $producibile=$_REQUEST["producibile"];

    $q="UPDATE oasis_produzione.dbo.lotti SET producibile = '$producibile'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
        die("error".$q);

?>