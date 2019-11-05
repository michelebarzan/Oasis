<?php

    include "Session.php";
    include "connessione.php";

    $utenti=[];

    $query2="SELECT * FROM utenti WHERE mail IS NOT NULL AND id_utente<>".$_SESSION['id_utente'];	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $utente["mail"]=$row2['mail'];
            $utente["username"]=$row2['username'];
            array_push($utenti,$utente);
        }
    }
    else
        die("error");

    echo json_encode($utenti);
?>