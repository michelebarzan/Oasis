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

?>