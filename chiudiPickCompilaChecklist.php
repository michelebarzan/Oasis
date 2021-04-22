<?php

    include "Session.php";
    include "connessione.php";

    $n_pick=$_REQUEST["n_pick"];

    $qChiudi="UPDATE T_Picking_01 SET chiuso='V',dataChiusura='".date('m/d/Y h:i:s', time())."',utenteChiusura=".$_SESSION['id_utente']." WHERE n_Pick=$n_pick AND NOT(bancale IS NULL) AND NOT(gruppo IS NULL)";
    $rChiudi=sqlsrv_query($conn,$qChiudi);
    if($rChiudi==FALSE)
    {
        die("error");
    }
?>