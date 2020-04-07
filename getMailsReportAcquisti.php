<?php

    include "connessione.php";

    set_time_limit(120);

    $orderBy=$_REQUEST["orderBy"];
    //$top=$_REQUEST["top"];
    $filter=$_REQUEST["filter"];

    $mails=[];

    $query2="SELECT TOP (223) ordine_fornitore,ordine_cliente,data_mail,mittente,nome_fornitore,nome_cliente,doc_date,data_spedizione,doc_due_date,doc_total,importo_ordine_cliente 
            FROM dbo.report_acquisti_view 
            WHERE ordine_fornitore LIKE '%$filter%' OR ordine_cliente LIKE '%$filter%' OR data_mail LIKE '%$filter%' OR mittente LIKE '%$filter%' OR nome_fornitore LIKE '%$filter%' OR nome_cliente LIKE '%$filter%' OR doc_date LIKE '%$filter%' OR data_spedizione LIKE '%$filter%' OR doc_due_date LIKE '%$filter%' OR doc_total LIKE '%$filter%' OR importo_ordine_cliente LIKE '%$filter%' 
            ORDER BY $orderBy";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $mail["ordine_fornitore"]=$row2['ordine_fornitore'];
            $mail["ordine_cliente"]=$row2['ordine_cliente'];
            $mail["data_mail"]=$row2['data_mail']->format('d/m/Y');
            //$oggetto=utf8_encode(str_replace("'","",$row2['oggetto']));
            //$mail["oggetto"]=str_replace('"','',$oggetto);
            $mittente=utf8_encode(str_replace("'","",$row2['mittente']));
            $mail["mittente"]=str_replace('"','',$mittente);
            $nome_fornitore=utf8_encode(str_replace("'","",$row2['nome_fornitore']));
            $mail["nome_fornitore"]=str_replace('"','',$nome_fornitore);
            $nome_cliente=utf8_encode(str_replace("'","",$row2['nome_cliente']));
            $mail["nome_cliente"]=str_replace('"','',$nome_cliente);
            $mail["doc_date"]=$row2['doc_date']->format('d/m/Y');
            $mail["data_spedizione"]=$row2['data_spedizione']->format('d/m/Y');
            $mail["doc_due_date"]=$row2['doc_due_date']->format('d/m/Y');
            $mail["doc_total"]=number_format($row2['doc_total'],2,",",".");
            $mail["importo_ordine_cliente"]=number_format($row2['importo_ordine_cliente'],2,",",".");

            array_push($mails,$mail);
        }
    }

    echo json_encode($mails);

?>