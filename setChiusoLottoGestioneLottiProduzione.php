<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $chiuso=$_REQUEST["chiuso"];

    $q="UPDATE oasis_produzione.dbo.lotti SET chiuso = '$chiuso'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
        die("error".$q);

?>