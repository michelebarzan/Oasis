<?php

    include "connessione.php";

    $ordine_fornitore=$_REQUEST["ordine_fornitore"];

    $righeOrdine=[];

    $query2="SELECT ItemCode,descrizione,Price,Quantity,line_total FROM dbo.report_acquisti_view_dettagli WHERE ordine_fornitore='$ordine_fornitore'";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $rigaOrdine["ItemCode"]=$row2['ItemCode'];
            $rigaOrdine["descrizione"]=utf8_encode($row2['descrizione']);
            $rigaOrdine["Price"]=number_format($row2['Price'],2,",",".")."€";
            $rigaOrdine["Quantity"]=round($row2['Quantity'], 0);
            $rigaOrdine["line_total"]=number_format($row2['line_total'],2,",",".")."€";
            
            array_push($righeOrdine,$rigaOrdine);
        }
    }

    echo json_encode($righeOrdine);

?>