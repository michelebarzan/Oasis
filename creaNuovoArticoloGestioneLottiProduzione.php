<?php

    include "connessione.php";

    $codice_articolo = str_replace("'", "", $_REQUEST["codice_articolo"]);
    $descrizione = str_replace("'", "", $_REQUEST["descrizione"]);

    $q2="INSERT INTO oasis_produzione.dbo.articoli (codice_articolo,descrizione,eliminato) VALUES ('$codice_articolo','$descrizione','false')";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        $q3="SELECT MAX(id_articolo) AS id_articolo FROM oasis_produzione.dbo.articoli WHERE codice_articolo = '$codice_articolo'";
        $r3=sqlsrv_query($conn,$q3);
        if($r3==FALSE)
        {
            die("error".$q3);
        }
        else
        {
            while($row3=sqlsrv_fetch_array($r3))
            {
                echo $row3["id_articolo"];
            }
        }
    }

?>