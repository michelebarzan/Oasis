<?php

    include "Session.php";
    include "connessione.php";

    $utenti_coinvolti=$_REQUEST['utenti_coinvolti'];
    $utenti_coinvolti_in=implode("','",$utenti_coinvolti);

    $utenti_non_coinvolti=[];

    $query2="SELECT * FROM utenti  WHERE username NOT IN ('".$utenti_coinvolti_in."')";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $utente["id_utente"]=$row2['id_utente'];
            $utente["username"]=$row2['username'];

            array_push($utenti_non_coinvolti,$utente);
        }
    }
    else
        die("error");

    echo json_encode($utenti_non_coinvolti);
?>