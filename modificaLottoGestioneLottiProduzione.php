<?php

    include "connessione.php";

    $lotto = str_replace("'", "", $_REQUEST["lotto"]);
    $note = str_replace("'", "", $_REQUEST["note"]);
    $id_lotto = $_REQUEST["id_lotto"];

    $q2="UPDATE oasis_produzione.dbo.lotti SET lotto = '$lotto', note = '$note' WHERE id_lotto = $id_lotto";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }

?>