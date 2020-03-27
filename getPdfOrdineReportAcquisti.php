<?php

    include "connessione.php";

    $ordine_fornitore=$_REQUEST["ordine_fornitore"];

    $pdfOrdine=[];

    $query2="SELECT DISTINCT percorso FROM dbo.report_acquisti_view_dettagli WHERE ordine_fornitore='$ordine_fornitore'";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $percorso="http://remote.oasisgroup.it/OasisPdfReportAcquisti".substr($row2['percorso'],1);
            
            array_push($pdfOrdine,$percorso);
        }
    }
    else
        die("error");

    echo json_encode($pdfOrdine);

?>