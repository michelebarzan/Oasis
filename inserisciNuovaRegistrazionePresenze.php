<?php

    include "connessione.php";

    $id_utente=$_REQUEST["id_utente"];
    $datetime=$_REQUEST["datetime"];

    $query2="INSERT INTO registrazioni_presenze (utente,dataInizio,chiusa) VALUES ($id_utente,'$datetime','false')";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==FALSE)
        die("error".$query2)

?>