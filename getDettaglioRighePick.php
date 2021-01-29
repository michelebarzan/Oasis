<?php

    include "connessione.php";

    $n_Pick=$_REQUEST["n_Pick"];
    if(isset($_REQUEST["orderBy"]))
        $orderBy=$_REQUEST["orderBy"];
    else
        $orderBy="docnum";

    $righe_pick=[];
    $totali["ordini"]=0;
    $totali["volume"]=0;
    $totali["pesoNetto"]=0;
    $totali["pesoLordo"]=0;
    $totali["chiusi"]=0;

    $query2="SELECT dbo.T_Picking_01.id_picking, dbo.T_Picking_01.docNum, dbo.T_Picking_01.lineNum, dbo.T_Picking_01.itemCode, dbo.T_Picking_01.dscription, dbo.T_Picking_01.quantity, dbo.T_Picking_01.onHand, 
                dbo.T_Picking_01.prcrmntMtd, dbo.T_Picking_01.bancale, dbo.T_Picking_01.gruppo, dbo.T_Picking_01.sparato, dbo.T_Picking_01.volume, dbo.T_Picking_01.pesoNetto, dbo.T_Picking_01.pesoLordo, dbo.T_Picking_01.Misure, 
                CASE WHEN chiuso = 'V' THEN 'true' ELSE 'false' END AS chiuso, dbo.T_Picking_01.dataChiusura, dbo.bancali.nome, dbo.bancali.numero, dbo.bancali.peso, dbo.bancali.lunghezza, dbo.bancali.larghezza, dbo.bancali.altezza, 
                dbo.bancali.note, dbo.T_Picking_01.codiceDoganale, dbo.T_Picking_01.descriptionLang
            FROM dbo.T_Picking_01 INNER JOIN
                dbo.bancali ON dbo.T_Picking_01.bancale = dbo.bancali.id_bancale
            WHERE (dbo.T_Picking_01.n_Pick = '$n_Pick')
            ORDER BY $orderBy";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $riga["id_picking"]=$row2['id_picking'];
            $riga["docNum"]=$row2['docNum'];
            $riga["lineNum"]=$row2['lineNum'];
            $riga["itemCode"]=$row2['itemCode'];
            $riga["dscription"]=utf8_encode($row2['dscription']);
            $riga["quantity"]=$row2['quantity'];
            $riga["onHand"]=$row2['onHand'];
            $riga["prcrmntMtd"]=$row2['prcrmntMtd'];
            $riga["bancale"]=$row2['bancale'];
            $riga["gruppo"]=$row2['gruppo'];
            $riga["sparato"]=$row2['sparato'];
            $riga["volume"]=$row2['volume'];
            $riga["pesoNetto"]=$row2['pesoNetto'];
            $riga["pesoLordo"]=$row2['pesoLordo'];
            $riga["Misure"]=$row2['Misure'];
            $riga["chiuso"]=$row2['chiuso'] === 'true'? true: false;
            $riga["codiceDoganale"]=$row2['codiceDoganale'];
            $riga["descriptionLang"]=utf8_encode($row2['descriptionLang']);
            $riga["dataChiusura"]=$row2['dataChiusura'];
            if($riga["dataChiusura"]!="")
                $riga["dataChiusuraString"]=$row2['dataChiusura']->format("d/m/Y H:i:s");
            else
                $riga["dataChiusuraString"]="";

            $totali["ordini"]++;
            $totali["volume"]+=$row2['volume'];
            $totali["pesoNetto"]+=$row2['pesoNetto'];
            $totali["pesoLordo"]+=$row2['pesoLordo'];
            if($row2['chiuso']=="true")
                $totali["chiusi"]++;

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
        die("error");

    $query3="SELECT COUNT(*) AS nBancali FROM bancali WHERE (n_Pick = '$n_Pick')";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==TRUE)
    {
        while($row3=sqlsrv_fetch_array($result3))
        {
            $totali["bancali"]=$row3['nBancali'];
        }
    }
    else
        die("error");    

    $arrayResponse["righe_pick"]=$righe_pick;
    $arrayResponse["totali"]=$totali;

    echo json_encode($arrayResponse);

?>