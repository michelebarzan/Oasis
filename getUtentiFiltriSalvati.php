<?php

    include "connessione.php";
    include "Session.php";

    $id_utente=$_REQUEST["id_utente"];

    $utenti=[];

    $query2="SELECT DISTINCT dbo.utenti.username, dbo.utenti.id_utente
            FROM dbo.salvataggi_filtro_report_ordini_cliente INNER JOIN dbo.utenti ON dbo.salvataggi_filtro_report_ordini_cliente.utente = dbo.utenti.id_utente
            WHERE (dbo.utenti.id_utente <> $id_utente)";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $utente["id_utente"]=$row2['id_utente'];
            $utente["username"]=$row2['username'];
            
            array_push($utenti,$utente);
        }
    }
    else
        die("error".$query2);

    echo json_encode($utenti);

?>