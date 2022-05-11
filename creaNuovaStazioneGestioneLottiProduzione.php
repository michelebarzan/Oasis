<?php

    include "connessione.php";

    $nome = str_replace("'", "", $_REQUEST["nome"]);
    $descrizione = str_replace("'", "", $_REQUEST["descrizione"]);

    $q2="INSERT INTO oasis_produzione.dbo.stazioni (nome,descrizione) VALUES ('$nome','$descrizione')";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }

?>