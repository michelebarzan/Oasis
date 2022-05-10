<?php

    include "connessione.php";

    $articoli_lotti_stazioni=[];

    $q="SELECT *
        FROM oasis_produzione.dbo.articoli_lotti_stazioni AS articoli_lotti_stazioni";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $articolo_lotto_stazione["articolo"]=$row["articolo"];
            $articolo_lotto_stazione["lotto"]=$row["lotto"];
            $articolo_lotto_stazione["stazione"]=$row["stazione"];
            $articolo_lotto_stazione["dataOra"]=$row["dataOra"];
            $articolo_lotto_stazione["dataOraString"]=$row["dataOra"] -> format ('d/m/Y H:i:s');

            array_push($articoli_lotti_stazioni,$articolo_lotto_stazione);
        }
    }

    echo json_encode($articoli_lotti_stazioni);

?>