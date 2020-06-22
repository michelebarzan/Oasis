<?php

    include "connessione.php";

    $q="SELECT MAX(dataOra) AS dataOra FROM log_aggiorna_report_ordini_cliente_table";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            echo $row['dataOra']->format('d/m/Y H:i:s');
        }
    }

?>