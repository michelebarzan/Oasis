<?php

    include "connessione.php";

    $stazioni=[];

    $q="SELECT *
        FROM oasis_produzione.dbo.stazioni AS stazioni ORDER BY posizione";
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
            $stazione["posizione"]=$row["posizione"];
            $stazione["percorso_output_macchina"]=utf8_encode($row["percorso_output_macchina"]);
            $stazione["formato_output_macchina"]=utf8_encode($row["formato_output_macchina"]);
            $stazione["separatore_colonne_output_macchina"]=utf8_encode($row["separatore_colonne_output_macchina"]);
            $stazione["colonna_articolo_output_macchina"]=$row["colonna_articolo_output_macchina"];
            $stazione["colonna_data_output_macchina"]=$row["colonna_data_output_macchina"];
            $stazione["colonna_ora_output_macchina"]=$row["colonna_ora_output_macchina"];

            array_push($stazioni,$stazione);
        }
    }

    echo json_encode($stazioni);

?>