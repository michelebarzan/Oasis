<?php

    include "connessione.php";

    $articoli_stazioni=[];

    $q="SELECT *
        FROM oasis_produzione.dbo.articoli_stazioni AS articoli_stazioni";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $articolo_stazione["id_articolo_stazione"]=$row["id_articolo_stazione"];
            $articolo_stazione["stazione"]=$row["stazione"];
            $articolo_stazione["articolo"]=$row["articolo"];

            array_push($articoli_stazioni,$articolo_stazione);
        }
    }

    echo json_encode($articoli_stazioni);

?>