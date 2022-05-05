<?php

    include "connessione.php";

    $stazioni=[];

    $q="SELECT *
        FROM oasis_produzione.dbo.stazioni AS stazioni ORDER BY nome";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $stazione["id_stazione"]=$row["id_stazione"];
            $stazione["nome"]=utf8_encode($row["nome"]);
            $stazione["descrizione"]=utf8_encode($row["descrizione"]);

            array_push($stazioni,$stazione);
        }
    }

    echo json_encode($stazioni);

?>