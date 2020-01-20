<?php

    include "Session.php";
    include "connessione.php";

    $utenti_aggiungi_categoria=[];

    $query2="SELECT * FROM permessi_aggiungi_categoria_richieste";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            array_push($utenti_aggiungi_categoria,$row2['utente']);
        }        
    }
    else
        die("error");
    
    echo json_encode($utenti_aggiungi_categoria);
?>