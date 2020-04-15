<?php

    include "connessione.php";

    set_time_limit(120);

    $filterConditions=json_decode($_REQUEST["JSONfilterConditions"]);
    
    if(isset($_REQUEST["orderBy"]))
    {
        $orderByObj=$_REQUEST["orderBy"];
        $orderBy="ORDER BY ".$orderByObj["colonna"]." ".$orderByObj["tipo"];
    }
    else
        $orderBy="";

    $filterConditionsString="";

    $headers=[];

    $header["value"]="ordine_cliente";
    $header["label"]="Ordine Cliente";
    $header["data_type"]="string";
    $header["width"]="4.5";
    array_push($headers,$header);

    $header["value"]="nome_cliente";
    $header["label"]="Nome Cliente";
    $header["data_type"]="string";
    $header["width"]="8.5";
    array_push($headers,$header);

    $header["value"]="data_spedizione";
    $header["label"]="Data Spedizione";
    $header["data_type"]="date";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="Statistical_group_code";
    $header["label"]="Statistical Group Code";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="Statistical_group_name";
    $header["label"]="Statistical Group Name";
    $header["data_type"]="string";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="linea_business";
    $header["label"]="Linea Business";
    $header["data_type"]="string";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="tipo";
    $header["label"]="Tipo";
    $header["data_type"]="string";
    $header["width"]="9";
    array_push($headers,$header);

    $header["value"]="tipo_pagamento";
    $header["label"]="Tipo Pagamento";
    $header["data_type"]="string";
    $header["width"]="9";
    array_push($headers,$header);

    $header["value"]="importo_totale";
    $header["label"]="Importo Totale";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="importo_incassato";
    $header["label"]="Importo Incassato";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="importo_da_pagare";
    $header["label"]="Importo Da Pagare";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="fatturato_spedito";
    $header["label"]="Fatturato Spedito";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="fatturato_da_spedire";
    $header["label"]="Fatturato Da Spedire";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="note";
    $header["label"]="Note";
    $header["data_type"]="string";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="ordine_fornitore";
    $header["label"]="Ordine Fornitore";
    $header["data_type"]="string";
    $header["width"]="4.5";
    array_push($headers,$header);

    $header["value"]="nome_fornitore";
    $header["label"]="Nome Fornitore";
    $header["data_type"]="string";
    $header["width"]="8.5";
    array_push($headers,$header);

    $header["value"]="data_creazione_ordine";
    $header["label"]="Data Creazione Ordine";
    $header["data_type"]="date";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="data_arrivo_merce";
    $header["label"]="Data Arrivo Merce";
    $header["data_type"]="date";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="stato";
    $header["label"]="Stato";
    $header["data_type"]="string";
    $header["width"]="4";
    array_push($headers,$header);

    $header["value"]="importo_ordine_fornitore";
    $header["label"]="Importo Ordine Fornitore";
    $header["data_type"]="number";
    $header["width"]="4";
    array_push($headers,$header);

    $ordini=[];

    if(sizeof($filterConditions)==0)
        $query2="SELECT * FROM report_ordini_clienti_view $orderBy OPTION ( QUERYTRACEON 9481 )";
    else
    {
        foreach ($filterConditions as $JSONfilterConditions) 
        {
            $filterConditions = json_decode(json_encode($JSONfilterConditions, true),true);
            $filterConditionsString.="[".$filterConditions['colonna']."] ".$filterConditions['operatore']." ".$filterConditions['valore']." AND";
        }
        
        $filterConditionsString=substr($filterConditionsString, 0, -3);
        $query2="SELECT * FROM report_ordini_clienti_view WHERE $filterConditionsString $orderBy OPTION ( QUERYTRACEON 9481 )";	
    }
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $ordine["ordine_cliente"]=$row2['ordine_cliente'];
            //$ordine["codice_cliente"]=$row2['codice_cliente'];
            $nome_cliente=utf8_encode(str_replace("'","",$row2['nome_cliente']));
            $ordine["nome_cliente"]=str_replace('"','',$nome_cliente);
            if(!isset($row2['data_spedizione']))
                $ordine["data_spedizione"]="";
            else
                $ordine["data_spedizione"]=$row2['data_spedizione']->format('d/m/Y');
            $ordine["Statistical_group_code"]=$row2['Statistical_group_code'];
            $ordine["Statistical_group_name"]=$row2['Statistical_group_name'];
            $ordine["linea_business"]=$row2['linea_business'];
            $ordine["tipo"]=$row2['tipo'];
            $ordine["tipo_pagamento"]=$row2['tipo_pagamento'];
            $ordine["importo_totale"]=number_format($row2['importo_totale'],2,",",".")."€";
            $ordine["importo_incassato"]=number_format($row2['importo_incassato'],2,",",".")."€";
            $ordine["importo_da_pagare"]=number_format($row2['importo_da_pagare'],2,",",".")."€";
            $ordine["fatturato_spedito"]=number_format($row2['fatturato_spedito'],2,",",".")."€";
            $ordine["fatturato_da_spedire"]=number_format($row2['fatturato_da_spedire'],2,",",".")."€";
            $note=utf8_encode(str_replace("'","",$row2['note']));
            $ordine["note"]=str_replace('"','',$note);
            //stato solo aperto o chiuso (no parziale) e colorare 

            $ordine["ordine_fornitore"]=$row2['ordine_fornitore'];
            //$ordine["codice_fornitore"]=$row2['codice_fornitore'];
            $nome_fornitore=utf8_encode(str_replace("'","",$row2['nome_fornitore']));
            $ordine["nome_fornitore"]=str_replace('"','',$nome_fornitore);
            if(!isset($row2['data_creazione_ordine']))
                $ordine["data_creazione_ordine"]="";
            else
                $ordine["data_creazione_ordine"]=$row2['data_creazione_ordine']->format('d/m/Y');
            if(!isset($row2['data_arrivo_merce']))
                $ordine["data_arrivo_merce"]="";
            else
                $ordine["data_arrivo_merce"]=$row2['data_arrivo_merce']->format('d/m/Y');
            $ordine["stato"]=$row2['stato'];
            if(!isset($row2['ordine_fornitore']))
                $ordine["importo_ordine_fornitore"]="";
            else
                $ordine["importo_ordine_fornitore"]=number_format($row2['importo_ordine_fornitore'],2,",",".")."€";

            array_push($ordini,$ordine);
        }
    }
    else
        die("error".$query2);

    $objOrdini["headers"]=$headers;
    $objOrdini["ordini"]=$ordini;

    echo json_encode($objOrdini);

?>