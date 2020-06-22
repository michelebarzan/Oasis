<?php

    include "connessione.php";
    include "Session.php";

    set_time_limit(120);

    $filterConditions=json_decode($_REQUEST["JSONfilterConditions"]);
    
    if(isset($_REQUEST["orderBy"]))
    {
        $orderByObj=$_REQUEST["orderBy"];
        $orderBy="ORDER BY ".$orderByObj["colonna"]." ".$orderByObj["tipo"];
    }
    else
        $orderBy="";

    if($_REQUEST["filtroAnni"]!="")
    {
        $filtroAnni1=' WHERE (filtro_data IN ('.$_REQUEST["filtroAnni"].'))';
        $filtroAnni2=' AND (DATEPART(yy, Oasis_Live.dbo.OPOR.DocDueDate) IN ('.$_REQUEST["filtroAnni"].'))';
    }
    else
    {
        $filtroAnni1="";
        $filtroAnni2="";
    }

    $filterConditionsString="";

    $headers=[];

    $stmt = sqlsrv_query( $conn, "SELECT * FROM permessi_colonne_report_ordini_cliente WHERE utente=".$_SESSION['id_utente']);

    if ($stmt) 
    {
        $rows = sqlsrv_has_rows( $stmt );
        if ($rows === true)
        {
            $header["value"]="ordine_cliente";
            $header["label"]="Ordine Cliente";
            $header["data_type"]="string";
            $header["width"]=4.5;
            array_push($headers,$header);

            $header["value"]="nome_cliente";
            $header["label"]="Nome Cliente";
            $header["data_type"]="string";
            $header["width"]=8.5;
            array_push($headers,$header);

            $header["value"]="data_spedizione";
            $header["label"]="Data Spedizione";
            $header["data_type"]="date";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="Statistical_group_code";
            $header["label"]="Statistical Group Code";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="Statistical_group_name";
            $header["label"]="Statistical Group Name";
            $header["data_type"]="string";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="linea_business";
            $header["label"]="Linea Business";
            $header["data_type"]="string";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="tipo";
            $header["label"]="Tipo";
            $header["data_type"]="string";
            $header["width"]=9;
            array_push($headers,$header);

            $header["value"]="tipo_pagamento";
            $header["label"]="Tipo Pagamento";
            $header["data_type"]="string";
            $header["width"]=9;
            array_push($headers,$header);

            $header["value"]="importo_totale";
            $header["label"]="Importo Totale";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="importo_incassato";
            $header["label"]="Importo Incassato";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="importo_da_pagare";
            $header["label"]="Importo Da Pagare";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="fatturato_spedito";
            $header["label"]="Fatturato Spedito";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="fatturato_da_spedire";
            $header["label"]="Fatturato Da Spedire";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="note";
            $header["label"]="Note";
            $header["data_type"]="string";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="ordine_fornitore";
            $header["label"]="Ordine Fornitore";
            $header["data_type"]="string";
            $header["width"]=4.5;
            array_push($headers,$header);

            $header["value"]="nome_fornitore";
            $header["label"]="Nome Fornitore";
            $header["data_type"]="string";
            $header["width"]=8.5;
            array_push($headers,$header);

            $header["value"]="data_creazione_ordine";
            $header["label"]="Data Creazione Ordine";
            $header["data_type"]="date";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="data_arrivo_merce";
            $header["label"]="Data Arrivo Merce";
            $header["data_type"]="date";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="stato";
            $header["label"]="Stato";
            $header["data_type"]="string";
            $header["width"]=4;
            array_push($headers,$header);

            $header["value"]="importo_ordine_fornitore";
            $header["label"]="Importo Ordine Fornitore";
            $header["data_type"]="number";
            $header["width"]=4;
            array_push($headers,$header);
        }
        else 
        {
            $header["value"]="ordine_cliente";
            $header["label"]="Ordine Cliente";
            $header["data_type"]="string";
            $header["width"]=7;
            array_push($headers,$header);

            $header["value"]="nome_cliente";
            $header["label"]="Nome Cliente";
            $header["data_type"]="string";
            $header["width"]=13;
            array_push($headers,$header);

            $header["value"]="data_spedizione";
            $header["label"]="Data Spedizione";
            $header["data_type"]="date";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="Statistical_group_code";
            $header["label"]="Statistical Group Code";
            $header["data_type"]="number";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="Statistical_group_name";
            $header["label"]="Statistical Group Name";
            $header["data_type"]="string";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="linea_business";
            $header["label"]="Linea Business";
            $header["data_type"]="string";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="tipo";
            $header["label"]="Tipo";
            $header["data_type"]="string";
            $header["width"]=12;
            array_push($headers,$header);

            $header["value"]="note";
            $header["label"]="Note";
            $header["data_type"]="string";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="ordine_fornitore";
            $header["label"]="Ordine Fornitore";
            $header["data_type"]="string";
            $header["width"]=7;
            array_push($headers,$header);

            $header["value"]="nome_fornitore";
            $header["label"]="Nome Fornitore";
            $header["data_type"]="string";
            $header["width"]=13;
            array_push($headers,$header);

            $header["value"]="data_creazione_ordine";
            $header["label"]="Data Creazione Ordine";
            $header["data_type"]="date";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="data_arrivo_merce";
            $header["label"]="Data Arrivo Merce";
            $header["data_type"]="date";
            $header["width"]=6;
            array_push($headers,$header);

            $header["value"]="stato";
            $header["label"]="Stato";
            $header["data_type"]="string";
            $header["width"]=6;
            array_push($headers,$header);
        }
    }
    else
        die("error");

    $ordini=[];

    /*if(sizeof($filterConditions)==0)
        $query2="SELECT TOP (100) * FROM (SELECT DISTINCT 
        ordine_cliente, codice_cliente, nome_cliente, data_spedizione, Statistical_group_code, Statistical_group_name, linea_business, tipo, tipo_pagamento, Shipped_Amount AS fatturato_spedito, 
        To_Be_Shipped_Amount AS fatturato_da_spedire, Note AS note, ordine_fornitore, codice_fornitore, nome_fornitore, data_creazione_ordine, importo_ordine_fornitore, data_arrivo_merce, importo_totale, importo_incassato, 
        importo_da_pagare, CASE WHEN DocStatus = 'C' THEN 'Chiuso' ELSE 'Aperto' END AS stato
FROM            (SELECT        ordine_cliente, codice_cliente, nome_cliente, data_spedizione, Statistical_group_code, Statistical_group_name, Business_Line AS linea_business, Type AS tipo, Terms_of_Payment AS tipo_pagamento, 
                                   Total_Amount AS importo_totale, Already_Paid AS importo_incassato, To_Be_Paid AS importo_da_pagare, Shipped_Amount, To_Be_Shipped_Amount, Note, ordine_fornitore, codice_fornitore, nome_fornitore, 
                                   doc_due_date AS data_arrivo_merce, doc_total AS importo_ordine_fornitore, doc_date AS data_creazione_ordine, DocStatus
         FROM            (SELECT DISTINCT 
                                                             report_ordini_clienti_view_2.Statistical_group_code, report_ordini_clienti_view_2.Statistical_group_name, report_ordini_clienti_view_2.Customer_code AS codice_cliente, 
                                                             report_ordini_clienti_view_2.Customer_name AS nome_cliente, report_ordini_clienti_view_2.Business_Line, report_ordini_clienti_view_2.Type, 
                                                             report_ordini_clienti_view_2.Loading_date AS data_spedizione, report_ordini_clienti_view_2.Terms_of_Payment, report_ordini_clienti_view_2.Total_Amount, report_ordini_clienti_view_2.Already_Paid, 
                                                             report_ordini_clienti_view_2.To_Be_Paid, report_ordini_clienti_view_2.Shipped_Amount, report_ordini_clienti_view_2.To_Be_Shipped_Amount, report_ordini_clienti_view_2.Note, 
                                                             report_ordini_clienti_view_4.ordine_fornitore, report_ordini_clienti_view_4.ItemCode, report_ordini_clienti_view_4.descrizione, report_ordini_clienti_view_4.codice_fornitore, 
                                                             report_ordini_clienti_view_4.nome_fornitore, report_ordini_clienti_view_4.doc_date, report_ordini_clienti_view_4.doc_total, report_ordini_clienti_view_4.paid_to_date, 
                                                             report_ordini_clienti_view_4.doc_total_sy, report_ordini_clienti_view_4.paid_sys, report_ordini_clienti_view_4.Price, report_ordini_clienti_view_4.line_total, report_ordini_clienti_view_4.Quantity, 
                                                             report_ordini_clienti_view_4.open_sum, report_ordini_clienti_view_4.importo_ordine_cliente_1, report_ordini_clienti_view_4.importo_ordine_cliente, 
                                                             report_ordini_clienti_view_4.DocDueDate AS doc_due_date, report_ordini_clienti_view_4.DocStatus, CASE WHEN order_num IS NULL THEN ordine_cliente ELSE order_num END AS ordine_cliente
                                   FROM            (SELECT        Statistical_group_code, Statistical_group_name, Customer_code, Customer_name, Order_num, Business_Line, Type, Loading_date, Terms_of_Payment, Total_Amount, Already_Paid, 
                                                                                       To_Be_Paid, Shipped_Amount, To_Be_Shipped_Amount, Note
                                                             FROM            (SELECT        Code AS Statistical_group_code, Statistical_group_name, Customer_code, Customer_name, CONVERT(varchar(MAX), Order_num) AS Order_num, Business_Line, Type, 
                                                                                                                 Loading_date, Terms_of_Payment, SUM(TotalAmountRow) AS Total_Amount, SUM(AlreadyPaidRow) AS Already_Paid, SUM(ToBePaidRow) AS To_Be_Paid, 
                                                                                                                 SUM(ShippedAmountRow) AS Shipped_Amount, SUM(ToBeShippedAmountRow) AS To_Be_Shipped_Amount, Note, DATEPART(yy, Loading_date) AS filtro_data
                                                                                       FROM            (SELECT        T5.Code, T5.Name AS Statistical_group_name, T0.CardCode AS Customer_code, T0.CardName AS Customer_name, T0.DocNum AS Order_num, 
                                                                                                                                           CL.LOBName AS Business_Line, CL.Causale AS Type, T0.DocDueDate AS Loading_date, T1.Price * T1.Quantity AS TotalAmountRow, 
                                                                                                                                           T1.Price * (T1.Quantity - T1.OpenQty) AS ShippedAmountRow, T1.Price * T1.OpenQty AS ToBeShippedAmountRow,
                                                                                                                                               (SELECT        COALESCE (SUM(DP.DpmPrcnt), 0) * (T1.LineTotal + T1.VatSum) / 100 AS Expr1
                                                                                                                                                 FROM            Oasis_Live.dbo.DPI1 AS D1 INNER JOIN
                                                                                                                                                                           Oasis_Live.dbo.ODPI AS DP ON D1.DocEntry = DP.DocEntry LEFT OUTER JOIN
                                                                                                                                                                           Oasis_Live.dbo.RIN1 AS RI ON RI.BaseType = 203 AND RI.BaseEntry = DP.DocEntry AND RI.LineNum = D1.LineNum
                                                                                                                                                 WHERE        (D1.BaseType = 17) AND (D1.BaseEntry = T1.DocEntry) AND (D1.U_SIGEA_K1BaseLine = T1.U_SIGEA_K1BaseLine) AND (RI.DocEntry IS NULL)) 
                                                                                                                                           AS AlreadyPaidRow, CASE WHEN CT.GroupNum IN (58, 59) THEN 0 ELSE
                                                                                                                                               (SELECT        T1.LineTotal + t1.VatSum - COALESCE (SUM(DP.DpmPrcnt), 0) * (T1.LineTotal + t1.VatSum) / 100
                                                                                                                                                 FROM            oasis_live.dbo.DPI1 D1 JOIN
                                                                                                                                                                           oasis_live.dbo.ODPI DP ON D1.Docentry = DP.DocEntry LEFT JOIN
                                                                                                                                                                           oasis_live.dbo.RIN1 RI ON RI.basetype = 203 AND RI.baseentry = DP.DocEntry AND RI.LineNum = D1.LineNum
                                                                                                                                                 WHERE        D1.BaseType = 17 AND D1.BaseEntry = T1.DocEntry AND D1.U_SIGEA_K1BaseLine = T1.U_SIGEA_K1BaseLine AND RI.docentry IS NULL) 
                                                                                                                                           END AS ToBePaidRow, AM.AreaManager, SL.SlpName AS Agent, CT.PymntGroup AS Terms_of_Payment, PY.Descript AS Payment_Mode, 
                                                                                                                                           REPLACE(REPLACE(CAST(T0.U_AS_NoteInterne AS VARCHAR(MAX)), CHAR(13), ' '), CHAR(10), '') AS Note
                                                                                                                 FROM            Oasis_Live.dbo.ORDR AS T0 INNER JOIN
                                                                                                                                           Oasis_Live.dbo.OCRD AS T4 ON T0.CardCode = T4.CardCode INNER JOIN
                                                                                                                                           Oasis_Live.dbo.AS_CLS_ORD AS CL ON CL.DocNum = T0.DocNum LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.[@AS_RAGGRSTAT] AS T5 ON T4.U_AS_RAGGRSTAT = T5.Code LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.RDR1 AS T1 ON T0.DocEntry = T1.DocEntry LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OSLP AS SL ON T0.SlpCode = SL.SlpCode LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.AS_AREAMANAGER AS AM ON COALESCE (T4.DfTcnician, 0) = AM.IdAreaManager LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OCTG AS CT ON CT.GroupNum = T0.GroupNum LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OPYM AS PY ON PY.PayMethCod = T0.PeyMethod
                                                                                                                 WHERE        (T0.DocDueDate BETWEEN '2015-01-01 00:00:00.000' AND '2020-12-31 00:00:00.000') AND (T0.CANCELED = 'N') AND (T0.Confirmed = 'Y')) AS T
                                                                                       GROUP BY Code, Statistical_group_name, Customer_code, Customer_name, CONVERT(varchar(MAX), Order_num), Business_Line, Type, Loading_date, Terms_of_Payment, Note, 
                                                                                                                 DATEPART(yy, Loading_date)) AS derivedtbl_1
                                                             $filtroAnni1) AS report_ordini_clienti_view_2 FULL OUTER JOIN
                                                                 (SELECT        TOP (100) PERCENT REPLACE(REPLACE(DocNum, ':', ''), 'i', '') AS ordine_fornitore, REPLACE(REPLACE(NumAtCard, ':', ''), 'i', '') AS ordine_cliente, ItemCode, Dscription AS descrizione, 
                                                                                             CardCode AS codice_fornitore, CardName AS nome_fornitore, DocDate AS doc_date, DocDueDate, DocTotal AS doc_total, PaidToDate AS paid_to_date, DocTotalSy AS doc_total_sy, 
                                                                                             PaidSys AS paid_sys, Price, LineTotal AS line_total, Quantity, OpenSum AS open_sum, CardCode1 AS codice_cliente, CardName1 AS nome_cliente, PaidSys1 AS importo_ordine_cliente_1, 
                                                                                             DocTotalSt1 AS importo_ordine_cliente, data_spedizione, DocStatus
                                                                   FROM            (SELECT        TOP (100) PERCENT report_ordini_clienti_view_1.DocNum, report_ordini_clienti_view_1.NumAtCard, report_ordini_clienti_view_1.ItemCode, 
                                                                                                                       report_ordini_clienti_view_1.Dscription, report_ordini_clienti_view_1.CardCode, report_ordini_clienti_view_1.CardName, report_ordini_clienti_view_1.DocDate, 
                                                                                                                       report_ordini_clienti_view_1.DocDueDate, report_ordini_clienti_view_1.Expr1 AS OrdineCliente, report_ordini_clienti_view_1.DocTotal, 
                                                                                                                       report_ordini_clienti_view_1.PaidToDate, report_ordini_clienti_view_1.DocTotalSy, report_ordini_clienti_view_1.PaidSys, report_ordini_clienti_view_1.Price, 
                                                                                                                       report_ordini_clienti_view_1.LineTotal, report_ordini_clienti_view_1.Quantity, report_ordini_clienti_view_1.OpenSum, Oasis_Live.dbo.ORDR.CardName AS CardName1, 
                                                                                                                       Oasis_Live.dbo.ORDR.CardCode AS CardCode1, Oasis_Live.dbo.ORDR.PaidSys AS PaidSys1, Oasis_Live.dbo.ORDR.DocTotalSy AS DocTotalSt1, Oasis_Live.dbo.ORDR.Ref1, 
                                                                                                                       Oasis_Live.dbo.ORDR.Ref2, Oasis_Live.dbo.ORDR.DocDueDate AS data_spedizione, report_ordini_clienti_view_1.DocStatus
                                                                                             FROM            (SELECT        Oasis_Live.dbo.OPOR.DocNum, Oasis_Live.dbo.OPOR.NumAtCard, Oasis_Live.dbo.POR1.ItemCode, Oasis_Live.dbo.POR1.Dscription, 
                                                                                                                                                 Oasis_Live.dbo.OPOR.CardCode, Oasis_Live.dbo.OPOR.CardName, Oasis_Live.dbo.OPOR.DocDate, Oasis_Live.dbo.OPOR.DocDueDate, 
                                                                                                                                                 CASE WHEN isnumeric(Oasis_Live.dbo.OPOR.NumAtCard) = 1 THEN numatcard ELSE NULL END AS Expr1, Oasis_Live.dbo.OPOR.DocTotal, 
                                                                                                                                                 Oasis_Live.dbo.OPOR.PaidToDate, Oasis_Live.dbo.OPOR.DocTotalSy, Oasis_Live.dbo.OPOR.PaidSys, Oasis_Live.dbo.POR1.Price, 
                                                                                                                                                 Oasis_Live.dbo.POR1.LineTotal, Oasis_Live.dbo.POR1.Quantity, Oasis_Live.dbo.POR1.OpenSum, Oasis_Live.dbo.OPOR.DocStatus
                                                                                                                       FROM            Oasis_Live.dbo.OPOR LEFT OUTER JOIN
                                                                                                                                                 Oasis_Live.dbo.POR1 LEFT OUTER JOIN
                                                                                                                                                 Oasis_Live.dbo.OITM ON Oasis_Live.dbo.POR1.ItemCode = Oasis_Live.dbo.OITM.ItemCode ON 
                                                                                                                                                 Oasis_Live.dbo.OPOR.DocEntry = Oasis_Live.dbo.POR1.DocEntry
                                                                                                                       WHERE        (isnumeric(Oasis_Live.dbo.OPOR.DocNum) = 1) AND (Oasis_Live.dbo.OPOR.CANCELED <> 'Y') $filtroAnni2) AS report_ordini_clienti_view_1 LEFT OUTER JOIN
                                                                                                                       Oasis_Live.dbo.ORDR ON report_ordini_clienti_view_1.Expr1 = Oasis_Live.dbo.ORDR.DocNum
                                                                                             WHERE        (isnumeric(report_ordini_clienti_view_1.DocNum) = 1)) AS report_ordini_clienti_view_3
                                                                   WHERE        (isnumeric(DocNum) = 1)) AS report_ordini_clienti_view_4 ON report_ordini_clienti_view_2.Order_num = report_ordini_clienti_view_4.ordine_cliente) AS report_ordini_clienti_view_5) 
        AS report_ordini_clienti_view_6) AS report_ordini_clienti_view $orderBy OPTION ( QUERYTRACEON 9481 )";
    else
    {
        foreach ($filterConditions as $JSONfilterConditions) 
        {
            $filterConditions = json_decode(json_encode($JSONfilterConditions, true),true);
            $filterConditionsString.="[".$filterConditions['colonna']."] ".$filterConditions['operatore']." ".$filterConditions['valore']." AND";
        }
        
        $filterConditionsString=substr($filterConditionsString, 0, -3);
        $query2="SELECT TOP (100) * FROM (SELECT DISTINCT 
        ordine_cliente, codice_cliente, nome_cliente, data_spedizione, Statistical_group_code, Statistical_group_name, linea_business, tipo, tipo_pagamento, Shipped_Amount AS fatturato_spedito, 
        To_Be_Shipped_Amount AS fatturato_da_spedire, Note AS note, ordine_fornitore, codice_fornitore, nome_fornitore, data_creazione_ordine, importo_ordine_fornitore, data_arrivo_merce, importo_totale, importo_incassato, 
        importo_da_pagare, CASE WHEN DocStatus = 'C' THEN 'Chiuso' ELSE 'Aperto' END AS stato
FROM            (SELECT        ordine_cliente, codice_cliente, nome_cliente, data_spedizione, Statistical_group_code, Statistical_group_name, Business_Line AS linea_business, Type AS tipo, Terms_of_Payment AS tipo_pagamento, 
                                   Total_Amount AS importo_totale, Already_Paid AS importo_incassato, To_Be_Paid AS importo_da_pagare, Shipped_Amount, To_Be_Shipped_Amount, Note, ordine_fornitore, codice_fornitore, nome_fornitore, 
                                   doc_due_date AS data_arrivo_merce, doc_total AS importo_ordine_fornitore, doc_date AS data_creazione_ordine, DocStatus
         FROM            (SELECT DISTINCT 
                                                             report_ordini_clienti_view_2.Statistical_group_code, report_ordini_clienti_view_2.Statistical_group_name, report_ordini_clienti_view_2.Customer_code AS codice_cliente, 
                                                             report_ordini_clienti_view_2.Customer_name AS nome_cliente, report_ordini_clienti_view_2.Business_Line, report_ordini_clienti_view_2.Type, 
                                                             report_ordini_clienti_view_2.Loading_date AS data_spedizione, report_ordini_clienti_view_2.Terms_of_Payment, report_ordini_clienti_view_2.Total_Amount, report_ordini_clienti_view_2.Already_Paid, 
                                                             report_ordini_clienti_view_2.To_Be_Paid, report_ordini_clienti_view_2.Shipped_Amount, report_ordini_clienti_view_2.To_Be_Shipped_Amount, report_ordini_clienti_view_2.Note, 
                                                             report_ordini_clienti_view_4.ordine_fornitore, report_ordini_clienti_view_4.ItemCode, report_ordini_clienti_view_4.descrizione, report_ordini_clienti_view_4.codice_fornitore, 
                                                             report_ordini_clienti_view_4.nome_fornitore, report_ordini_clienti_view_4.doc_date, report_ordini_clienti_view_4.doc_total, report_ordini_clienti_view_4.paid_to_date, 
                                                             report_ordini_clienti_view_4.doc_total_sy, report_ordini_clienti_view_4.paid_sys, report_ordini_clienti_view_4.Price, report_ordini_clienti_view_4.line_total, report_ordini_clienti_view_4.Quantity, 
                                                             report_ordini_clienti_view_4.open_sum, report_ordini_clienti_view_4.importo_ordine_cliente_1, report_ordini_clienti_view_4.importo_ordine_cliente, 
                                                             report_ordini_clienti_view_4.DocDueDate AS doc_due_date, report_ordini_clienti_view_4.DocStatus, CASE WHEN order_num IS NULL THEN ordine_cliente ELSE order_num END AS ordine_cliente
                                   FROM            (SELECT        Statistical_group_code, Statistical_group_name, Customer_code, Customer_name, Order_num, Business_Line, Type, Loading_date, Terms_of_Payment, Total_Amount, Already_Paid, 
                                                                                       To_Be_Paid, Shipped_Amount, To_Be_Shipped_Amount, Note
                                                             FROM            (SELECT        Code AS Statistical_group_code, Statistical_group_name, Customer_code, Customer_name, CONVERT(varchar(MAX), Order_num) AS Order_num, Business_Line, Type, 
                                                                                                                 Loading_date, Terms_of_Payment, SUM(TotalAmountRow) AS Total_Amount, SUM(AlreadyPaidRow) AS Already_Paid, SUM(ToBePaidRow) AS To_Be_Paid, 
                                                                                                                 SUM(ShippedAmountRow) AS Shipped_Amount, SUM(ToBeShippedAmountRow) AS To_Be_Shipped_Amount, Note, DATEPART(yy, Loading_date) AS filtro_data
                                                                                       FROM            (SELECT        T5.Code, T5.Name AS Statistical_group_name, T0.CardCode AS Customer_code, T0.CardName AS Customer_name, T0.DocNum AS Order_num, 
                                                                                                                                           CL.LOBName AS Business_Line, CL.Causale AS Type, T0.DocDueDate AS Loading_date, T1.Price * T1.Quantity AS TotalAmountRow, 
                                                                                                                                           T1.Price * (T1.Quantity - T1.OpenQty) AS ShippedAmountRow, T1.Price * T1.OpenQty AS ToBeShippedAmountRow,
                                                                                                                                               (SELECT        COALESCE (SUM(DP.DpmPrcnt), 0) * (T1.LineTotal + T1.VatSum) / 100 AS Expr1
                                                                                                                                                 FROM            Oasis_Live.dbo.DPI1 AS D1 INNER JOIN
                                                                                                                                                                           Oasis_Live.dbo.ODPI AS DP ON D1.DocEntry = DP.DocEntry LEFT OUTER JOIN
                                                                                                                                                                           Oasis_Live.dbo.RIN1 AS RI ON RI.BaseType = 203 AND RI.BaseEntry = DP.DocEntry AND RI.LineNum = D1.LineNum
                                                                                                                                                 WHERE        (D1.BaseType = 17) AND (D1.BaseEntry = T1.DocEntry) AND (D1.U_SIGEA_K1BaseLine = T1.U_SIGEA_K1BaseLine) AND (RI.DocEntry IS NULL)) 
                                                                                                                                           AS AlreadyPaidRow, CASE WHEN CT.GroupNum IN (58, 59) THEN 0 ELSE
                                                                                                                                               (SELECT        T1.LineTotal + t1.VatSum - COALESCE (SUM(DP.DpmPrcnt), 0) * (T1.LineTotal + t1.VatSum) / 100
                                                                                                                                                 FROM            oasis_live.dbo.DPI1 D1 JOIN
                                                                                                                                                                           oasis_live.dbo.ODPI DP ON D1.Docentry = DP.DocEntry LEFT JOIN
                                                                                                                                                                           oasis_live.dbo.RIN1 RI ON RI.basetype = 203 AND RI.baseentry = DP.DocEntry AND RI.LineNum = D1.LineNum
                                                                                                                                                 WHERE        D1.BaseType = 17 AND D1.BaseEntry = T1.DocEntry AND D1.U_SIGEA_K1BaseLine = T1.U_SIGEA_K1BaseLine AND RI.docentry IS NULL) 
                                                                                                                                           END AS ToBePaidRow, AM.AreaManager, SL.SlpName AS Agent, CT.PymntGroup AS Terms_of_Payment, PY.Descript AS Payment_Mode, 
                                                                                                                                           REPLACE(REPLACE(CAST(T0.U_AS_NoteInterne AS VARCHAR(MAX)), CHAR(13), ' '), CHAR(10), '') AS Note
                                                                                                                 FROM            Oasis_Live.dbo.ORDR AS T0 INNER JOIN
                                                                                                                                           Oasis_Live.dbo.OCRD AS T4 ON T0.CardCode = T4.CardCode INNER JOIN
                                                                                                                                           Oasis_Live.dbo.AS_CLS_ORD AS CL ON CL.DocNum = T0.DocNum LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.[@AS_RAGGRSTAT] AS T5 ON T4.U_AS_RAGGRSTAT = T5.Code LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.RDR1 AS T1 ON T0.DocEntry = T1.DocEntry LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OSLP AS SL ON T0.SlpCode = SL.SlpCode LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.AS_AREAMANAGER AS AM ON COALESCE (T4.DfTcnician, 0) = AM.IdAreaManager LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OCTG AS CT ON CT.GroupNum = T0.GroupNum LEFT OUTER JOIN
                                                                                                                                           Oasis_Live.dbo.OPYM AS PY ON PY.PayMethCod = T0.PeyMethod
                                                                                                                 WHERE        (T0.DocDueDate BETWEEN '2015-01-01 00:00:00.000' AND '2020-12-31 00:00:00.000') AND (T0.CANCELED = 'N') AND (T0.Confirmed = 'Y')) AS T
                                                                                       GROUP BY Code, Statistical_group_name, Customer_code, Customer_name, CONVERT(varchar(MAX), Order_num), Business_Line, Type, Loading_date, Terms_of_Payment, Note, 
                                                                                                                 DATEPART(yy, Loading_date)) AS derivedtbl_1
                                                             $filtroAnni1) AS report_ordini_clienti_view_2 FULL OUTER JOIN
                                                                 (SELECT        TOP (100) PERCENT REPLACE(REPLACE(DocNum, ':', ''), 'i', '') AS ordine_fornitore, REPLACE(REPLACE(NumAtCard, ':', ''), 'i', '') AS ordine_cliente, ItemCode, Dscription AS descrizione, 
                                                                                             CardCode AS codice_fornitore, CardName AS nome_fornitore, DocDate AS doc_date, DocDueDate, DocTotal AS doc_total, PaidToDate AS paid_to_date, DocTotalSy AS doc_total_sy, 
                                                                                             PaidSys AS paid_sys, Price, LineTotal AS line_total, Quantity, OpenSum AS open_sum, CardCode1 AS codice_cliente, CardName1 AS nome_cliente, PaidSys1 AS importo_ordine_cliente_1, 
                                                                                             DocTotalSt1 AS importo_ordine_cliente, data_spedizione, DocStatus
                                                                   FROM            (SELECT        TOP (100) PERCENT report_ordini_clienti_view_1.DocNum, report_ordini_clienti_view_1.NumAtCard, report_ordini_clienti_view_1.ItemCode, 
                                                                                                                       report_ordini_clienti_view_1.Dscription, report_ordini_clienti_view_1.CardCode, report_ordini_clienti_view_1.CardName, report_ordini_clienti_view_1.DocDate, 
                                                                                                                       report_ordini_clienti_view_1.DocDueDate, report_ordini_clienti_view_1.Expr1 AS OrdineCliente, report_ordini_clienti_view_1.DocTotal, 
                                                                                                                       report_ordini_clienti_view_1.PaidToDate, report_ordini_clienti_view_1.DocTotalSy, report_ordini_clienti_view_1.PaidSys, report_ordini_clienti_view_1.Price, 
                                                                                                                       report_ordini_clienti_view_1.LineTotal, report_ordini_clienti_view_1.Quantity, report_ordini_clienti_view_1.OpenSum, Oasis_Live.dbo.ORDR.CardName AS CardName1, 
                                                                                                                       Oasis_Live.dbo.ORDR.CardCode AS CardCode1, Oasis_Live.dbo.ORDR.PaidSys AS PaidSys1, Oasis_Live.dbo.ORDR.DocTotalSy AS DocTotalSt1, Oasis_Live.dbo.ORDR.Ref1, 
                                                                                                                       Oasis_Live.dbo.ORDR.Ref2, Oasis_Live.dbo.ORDR.DocDueDate AS data_spedizione, report_ordini_clienti_view_1.DocStatus
                                                                                             FROM            (SELECT        Oasis_Live.dbo.OPOR.DocNum, Oasis_Live.dbo.OPOR.NumAtCard, Oasis_Live.dbo.POR1.ItemCode, Oasis_Live.dbo.POR1.Dscription, 
                                                                                                                                                 Oasis_Live.dbo.OPOR.CardCode, Oasis_Live.dbo.OPOR.CardName, Oasis_Live.dbo.OPOR.DocDate, Oasis_Live.dbo.OPOR.DocDueDate, 
                                                                                                                                                 CASE WHEN isnumeric(Oasis_Live.dbo.OPOR.NumAtCard) = 1 THEN numatcard ELSE NULL END AS Expr1, Oasis_Live.dbo.OPOR.DocTotal, 
                                                                                                                                                 Oasis_Live.dbo.OPOR.PaidToDate, Oasis_Live.dbo.OPOR.DocTotalSy, Oasis_Live.dbo.OPOR.PaidSys, Oasis_Live.dbo.POR1.Price, 
                                                                                                                                                 Oasis_Live.dbo.POR1.LineTotal, Oasis_Live.dbo.POR1.Quantity, Oasis_Live.dbo.POR1.OpenSum, Oasis_Live.dbo.OPOR.DocStatus
                                                                                                                       FROM            Oasis_Live.dbo.OPOR LEFT OUTER JOIN
                                                                                                                                                 Oasis_Live.dbo.POR1 LEFT OUTER JOIN
                                                                                                                                                 Oasis_Live.dbo.OITM ON Oasis_Live.dbo.POR1.ItemCode = Oasis_Live.dbo.OITM.ItemCode ON 
                                                                                                                                                 Oasis_Live.dbo.OPOR.DocEntry = Oasis_Live.dbo.POR1.DocEntry
                                                                                                                       WHERE        (isnumeric(Oasis_Live.dbo.OPOR.DocNum) = 1) AND (Oasis_Live.dbo.OPOR.CANCELED <> 'Y') $filtroAnni2) AS report_ordini_clienti_view_1 LEFT OUTER JOIN
                                                                                                                       Oasis_Live.dbo.ORDR ON report_ordini_clienti_view_1.Expr1 = Oasis_Live.dbo.ORDR.DocNum
                                                                                             WHERE        (isnumeric(report_ordini_clienti_view_1.DocNum) = 1)) AS report_ordini_clienti_view_3
                                                                   WHERE        (isnumeric(DocNum) = 1)) AS report_ordini_clienti_view_4 ON report_ordini_clienti_view_2.Order_num = report_ordini_clienti_view_4.ordine_cliente) AS report_ordini_clienti_view_5) 
        AS report_ordini_clienti_view_6) AS report_ordini_clienti_view WHERE $filterConditionsString $orderBy OPTION ( QUERYTRACEON 9481 )";	
    }*/
    if(sizeof($filterConditions)==0)
        $query2="SELECT * FROM report_ordini_cliente_table $orderBy OPTION ( QUERYTRACEON 9481 )";
    else
    {
        foreach ($filterConditions as $JSONfilterConditions) 
        {
            $filterConditions = json_decode(json_encode($JSONfilterConditions, true),true);
            $filterConditionsString.="[".$filterConditions['colonna']."] ".$filterConditions['operatore']." ".$filterConditions['valore']." AND";
        }
        
        $filterConditionsString=substr($filterConditionsString, 0, -3);
        $query2="SELECT * FROM report_ordini_cliente_table WHERE $filterConditionsString $orderBy OPTION ( QUERYTRACEON 9481 )";	
    }
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $ordine_cliente=$row2["ordine_cliente"];
            $ordine_cliente=str_replace("'","||",$ordine_cliente);
            $ordine_cliente=str_replace(" ","|_|",$ordine_cliente);
            $ordine_cliente=str_replace("/","|-|",$ordine_cliente);
            $ordine_cliente=str_replace("\\","|--|",$ordine_cliente);
            $ordine_cliente=str_replace("&","|e|",$ordine_cliente);
            $ordine_cliente=str_replace("=","|uguale|",$ordine_cliente);
            $ordine["ordine_cliente"]=utf8_encode($ordine_cliente);
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