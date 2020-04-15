<?php

    include "connessione.php";

    $id_utente=$_REQUEST["utente"];

    $filtri=[];

    if($id_utente=="*")
        $query2="SELECT salvataggi_filtro_report_ordini_cliente.*,utenti.username FROM salvataggi_filtro_report_ordini_cliente,utenti WHERE salvataggi_filtro_report_ordini_cliente.utente=utenti.id_utente";
    else
        $query2="SELECT salvataggi_filtro_report_ordini_cliente.*,utenti.username FROM salvataggi_filtro_report_ordini_cliente,utenti WHERE salvataggi_filtro_report_ordini_cliente.utente=utenti.id_utente AND salvataggi_filtro_report_ordini_cliente.utente=$id_utente";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $filtro["id_salvataggio"]=$row2['id_salvataggio'];
            $filtro["nome"]=$row2['nome'];
            $filtro["descrizione"]=$row2['descrizione'];
            $filtro["filterConditions"]=str_replace("|","'",$row2['filterConditions']);
            $filtro["orderBy"]=$row2['orderBy'];
            $filtro["utente"]=$row2['username'];
            $filtro["id_utente"]=$row2['utente'];
            $filtro["data"]=$row2['data']->format('d/m/Y H:i:s');

            array_push($filtri,$filtro);
        }
    }
    else
        die("error".$query2);

    echo json_encode($filtri);

?>