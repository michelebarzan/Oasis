<?php

    include "Session.php";
    include "connessione.php";

    $dataInizio=DateTime::createFromFormat('Y-m-d', $_REQUEST["dataInizio"])->format('Y-m-d')." 0:0:0.000";
    $dataFine=DateTime::createFromFormat('Y-m-d', $_REQUEST["dataFine"])->format('Y-m-d')." 23:59:59.999";

    $registrazioni=[];

    $query1="SELECT TOP (100) PERCENT dbo.registrazioni_presenze.id_registrazione, dbo.registrazioni_presenze.dataInizio, dbo.registrazioni_presenze.dataFine, dbo.utenti.username, dbo.registrazioni_presenze.descrizione, 
                dbo.registrazioni_presenze.note, dbo.registrazioni_presenze.smartWorking, dbo.registrazioni_presenze.chiusa, CASE WHEN dataFine IS NULL THEN NULL ELSE dataFine - dataInizio END AS durata
            FROM dbo.registrazioni_presenze INNER JOIN
                dbo.utenti ON dbo.registrazioni_presenze.utente = dbo.utenti.id_utente
            WHERE dataInizio BETWEEN '$dataInizio' AND '$dataFine'
            ORDER BY dbo.registrazioni_presenze.dataInizio DESC";	
    $result1=sqlsrv_query($conn,$query1);
    if($result1==FALSE)
    {
        die("error1");
    }
    else
    {
        while($row=sqlsrv_fetch_array($result1))
        {
            $registrazione["id_registrazione"]=$row["id_registrazione"];
            $registrazione["dataInizio"]=$row["dataInizio"];
            $registrazione["dataInizioString"]=$row["dataInizio"]->format('d/m/Y H:i:s');
            $registrazione["dataFine"]=$row["dataFine"];
            if($row["dataFine"]==NULL)
                $registrazione["dataFineString"]=NULL;
            else
                $registrazione["dataFineString"]=$row["dataFine"]->format('d/m/Y H:i:s');
            if($row["durata"]==NULL)
                $registrazione["durata"]=NULL;
            else
                $registrazione["durata"]=$row["durata"]->format('H:i');
            $registrazione["username"]=$row["username"];
            $registrazione["descrizione"]=$row["descrizione"];
            $registrazione["note"]=$row["note"];
            $registrazione["smartWorking"]=$row["smartWorking"];
            $registrazione["chiusa"]=$row["chiusa"] === 'true'? true: false;

            array_push($registrazioni,$registrazione);
        }
    }

    echo json_encode($registrazioni);

?>