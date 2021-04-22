<?php

    include "connessione.php";

    $ordine=$_REQUEST["ordine"];

    $info_ordine["trovato"]=false;

    /*$query2="SELECT derivedtbl_2.docnum, derivedtbl_2.dataConsegna, derivedtbl_2.collezione, MAX(derivedtbl_2.mq) AS mq, MAX(derivedtbl_2.basi_portalavabo) AS basi_portalavabo, MAX(derivedtbl_2.basi_accostabili) AS basi_accostabili, 
                MAX(derivedtbl_2.pensili) AS pensili, MAX(derivedtbl_2.colonne) AS colonne, MAX(derivedtbl_2.Altro) AS Altro, MAX(derivedtbl_2.totale_pezzi) AS totale_pezzi, dbo.report_ordini_clienti_view.nome_cliente, 
                dbo.report_ordini_clienti_view.Statistical_group_code, dbo.report_ordini_clienti_view.Statistical_group_name, dbo.report_ordini_clienti_view.linea_business, dbo.report_ordini_clienti_view.tipo, 
                dbo.report_ordini_clienti_view.tipo_pagamento, dbo.report_ordini_clienti_view.note, ISNULL(dbo.report_ordini_clienti_view.importo_totale,0) AS importo_totale
            FROM (SELECT DISTINCT 
                derivedtbl_1.docnum, CONVERT(decimal(4, 2), derivedtbl_1.mq) AS mq, derivedtbl_1.basi_portalavabo, derivedtbl_1.basi_accostabili, derivedtbl_1.pensili, derivedtbl_1.colonne, derivedtbl_1.Altro, 
                derivedtbl_1.dataConsegna, derivedtbl_1.totale_pezzi, derivedtbl_1.stazione, derivedtbl_1.settimana, derivedtbl_1.stato, dbo.collezione.collezione, '' AS PDF
                FROM (SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
                FROM dbo.sommario_produzione_montaggio
                UNION ALL
                SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
                FROM dbo.sommario_produzione_verniciatura
                UNION ALL
                SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
                FROM dbo.sommario_produzione_punto_punto) AS derivedtbl_1 LEFT OUTER JOIN
                dbo.collezione ON derivedtbl_1.docnum = dbo.collezione.DocNum
                WHERE (derivedtbl_1.docnum = '$ordine')) AS derivedtbl_2 INNER JOIN
                dbo.report_ordini_clienti_view ON derivedtbl_2.docnum = dbo.report_ordini_clienti_view.ordine_cliente
            GROUP BY derivedtbl_2.docnum, derivedtbl_2.dataConsegna, derivedtbl_2.collezione, dbo.report_ordini_clienti_view.nome_cliente, dbo.report_ordini_clienti_view.Statistical_group_code, 
                dbo.report_ordini_clienti_view.Statistical_group_name, dbo.report_ordini_clienti_view.linea_business, dbo.report_ordini_clienti_view.tipo, dbo.report_ordini_clienti_view.tipo_pagamento, dbo.report_ordini_clienti_view.note, 
                dbo.report_ordini_clienti_view.importo_totale";	*/
	$query2="SELECT * FROM anagrafica_ordini WHERE ordine='$ordine'";			
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $info_ordine["trovato"]=true;
            //$info_ordine["ordine"]=$row2['docnum'];
			$info_ordine["ordine"]=$row2['ordine'];
            $info_ordine["dataConsegna"]=$row2['dataConsegna'];
            if($row2['dataConsegna']==null)
                $info_ordine['dataConsegna']=null;
            else
                $info_ordine["dataConsegnaString"]=$row2['dataConsegna']->format("d/m/Y");
            $info_ordine["collezione"]=utf8_encode($row2['collezione']);
            //$info_ordine["mq"]=$row2['mq'];
            $info_ordine["basi_portalavabo"]=$row2['basi_portalavabo'];
            $info_ordine["basi_accostabili"]=$row2['basi_accostabili'];
            $info_ordine["pensili"]=$row2['pensili'];
            $info_ordine["colonne"]=$row2['colonne'];
            $info_ordine["Altro"]=$row2['Altro'];
            $info_ordine["totale_pezzi"]=$row2['totale_pezzi'];
            $info_ordine["nome_cliente"]=utf8_encode($row2['nome_cliente']);
            $info_ordine["Statistical_group_name"]=utf8_encode($row2['Statistical_group_name']);
            $info_ordine["linea_business"]=utf8_encode($row2['linea_business']);
            $info_ordine["tipo"]=utf8_encode($row2['tipo']);
            $info_ordine["tipo_pagamento"]=utf8_encode($row2['tipo_pagamento']);
            $info_ordine["note"]=utf8_encode($row2['note']);
            $info_ordine["importo_totale"]=$row2['importo_totale'];
        }
        echo json_encode($info_ordine);
    }
    else
        die("error0".$query2);

?>