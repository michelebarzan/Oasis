<?php

    include "connessione.php";

    set_time_limit(120);

    //$orderBy=$_REQUEST["orderBy"];
    $orderBy="ordine_cliente DESC";

    $ordini=[];

    $query2="SELECT TOP (160) * FROM report_ordini_clienti_view ORDER BY $orderBy OPTION ( QUERYTRACEON 9481 )";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $ordine["ordine_cliente"]=$row2['ordine_cliente'];
            //$ordine["codice_cliente"]=$row2['codice_cliente'];
            $nome_cliente=utf8_encode(str_replace("'","",$row2['nome_cliente']));
            $ordine["nome_cliente"]=str_replace('"','',$nome_cliente);
            $ordine["data_spedizione"]=$row2['data_spedizione']->format('d/m/Y');
            $ordine["Statistical_group_code"]=$row2['Statistical_group_code'];
            $ordine["Statistical_group_name"]=$row2['Statistical_group_name'];
            $ordine["linea_business"]=$row2['linea_business'];
            $ordine["tipo"]=$row2['tipo'];
            $ordine["tipo_pagamento"]=$row2['tipo_pagamento'];
            $ordine["importo_ordine_cliente"]=number_format($row2['importo_ordine_cliente'],2,",",".")."€";
            $ordine["importo_pagato_ordine_cliente"]=number_format($row2['importo_pagato_ordine_cliente'],2,",",".")."€";
            $ordine["importo_da_pagare_ordine_cliente"]=number_format($row2['importo_pagato_ordine_cliente'],2,",",".")."€";
            $ordine["Shipped_Amount"]=number_format($row2['Shipped_Amount'],2,",",".")."€";
            $ordine["To_Be_Shipped_Amount"]=number_format($row2['To_Be_Shipped_Amount'],2,",",".")."€";
            $note=utf8_encode(str_replace("'","",$row2['note']));
            $ordine["note"]=str_replace('"','',$note);

            $ordine["ordine_fornitore"]=$row2['ordine_fornitore'];
            //$ordine["codice_fornitore"]=$row2['codice_fornitore'];
            $nome_fornitore=utf8_encode(str_replace("'","",$row2['nome_fornitore']));
            $ordine["nome_fornitore"]=str_replace('"','',$nome_fornitore);
            $ordine["data_creazione_ordine"]=$row2['data_creazione_ordine']->format('d/m/Y');
            $ordine["importo_ordine_fornitore"]=number_format($row2['importo_ordine_fornitore'],2,",",".")."€";

            array_push($ordini,$ordine);
        }
    }
    else
        die("error");

    echo json_encode($ordini);

?>