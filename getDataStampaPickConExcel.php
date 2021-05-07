<?php

    include "connessione.php";

    $n_Pick=$_REQUEST["n_Pick"];

    $righe_pick=[];

    $query2="SELECT docNum AS [Order], itemCode AS [Item code], 
                CASE WHEN t .descriptionLang = '' OR
                t .descriptionLang = ' ' OR
                LEN(t .descriptionLang) = 1 OR
                len(t .descriptionLang) = 0 OR
                t .descriptionLang IS NULL THEN t .dscription ELSE t .descriptionLang END AS [Description],  quantity AS Qnt, pesoNetto AS [Net Weight], pesoLordo AS [Gross Weight], Misure AS Measures, concat('Box n. ',gruppo) AS Boxes, codiceDoganale AS [INTRA Code], nome as bancale, t.nome, t.numero, t.peso, t.lunghezza, t.larghezza, t.altezza, t.note
            FROM (SELECT dbo.T_Picking_01.id_picking, dbo.T_Picking_01.docNum, dbo.T_Picking_01.lineNum, dbo.T_Picking_01.itemCode, dbo.T_Picking_01.dscription, dbo.T_Picking_01.quantity, dbo.T_Picking_01.onHand, 
                                        dbo.T_Picking_01.prcrmntMtd, dbo.T_Picking_01.bancale, dbo.T_Picking_01.gruppo, dbo.T_Picking_01.sparato, dbo.T_Picking_01.volume, dbo.T_Picking_01.pesoNetto, dbo.T_Picking_01.pesoLordo, 
                                        dbo.T_Picking_01.Misure, CASE WHEN chiuso = 'V' THEN 'true' ELSE 'false' END AS chiuso, dbo.T_Picking_01.dataChiusura, dbo.bancali.nome, dbo.bancali.numero, dbo.bancali.peso, dbo.bancali.lunghezza, 
                                        dbo.bancali.larghezza, dbo.bancali.altezza, dbo.bancali.note, dbo.T_Picking_01.codiceDoganale, dbo.T_Picking_01.descriptionLang COLLATE SQL_Latin1_General_CP1_CI_AS AS descriptionLang
                FROM dbo.T_Picking_01 LEFT OUTER JOIN
                                        dbo.bancali ON dbo.T_Picking_01.bancale = dbo.bancali.id_bancale where dbo.T_Picking_01.n_Pick='$n_Pick' AND dbo.T_Picking_01.chiuso='V') AS t
            ORDER BY bancale";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $riga["Order"]=$row2['Order'];
            $riga["Item code"]=$row2['Item code'];
            $riga["Description"]=utf8_encode($row2['Description']);
            $riga["Qnt"]=$row2['Qnt'];
            $riga["Net Weight"]=$row2['Net Weight'];
            $riga["Gross Weight"]=$row2['Gross Weight'];
            $riga["Measures"]=$row2['Measures'];
            $riga["Boxes"]=$row2['Boxes'];
            $riga["INTRA Code"]=$row2['INTRA Code'];

            $riga["bancale"]=$row2['bancale'];
            $riga["nomeBancale"]=$row2['nome'];
            $riga["numeroBancale"]=$row2['numero'];
            $riga["pesoBancale"]=$row2['peso'];
            $riga["lunghezzaBancale"]=$row2['lunghezza'];
            $riga["larghezzaBancale"]=$row2['larghezza'];
            $riga["altezzaBancale"]=$row2['altezza'];
            $riga["noteBancale"]=$row2['note'];

            array_push($righe_pick,$riga);
        }
    }
    else
        die("error".$query2);

    echo json_encode($righe_pick);

?>