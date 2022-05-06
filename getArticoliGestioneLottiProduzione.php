<?php

    include "connessione.php";

    $articoli=[];

    $q="SELECT *
        FROM oasis_produzione.dbo.articoli AS articoli
        WHERE eliminato = 'false'";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $articolo["id_articolo"]=$row["id_articolo"];
            $articolo["codice_articolo"]=utf8_encode($row["codice_articolo"]);
            $articolo["descrizione"]=utf8_encode($row["descrizione"]);

            array_push($articoli,$articolo);
        }
    }

    echo json_encode($articoli);

?>