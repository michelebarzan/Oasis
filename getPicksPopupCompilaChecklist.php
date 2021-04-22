<?php

    include "Session.php";
    include "connessione.php";

    $picks=[];

    $q="SELECT DISTINCT TOP (100) PERCENT N_Pick, DescrPick, DataPick FROM dbo.Q_Picking_04 ORDER BY N_Pick DESC";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $pick["n_pick"]=$row["N_Pick"];
            $pick["descrizione_pick"]=$row["DescrPick"];
            $pick["data_pick"]=$row["DataPick"];

            array_push($picks,$pick);
        }
    }

    echo json_encode($picks);

?>