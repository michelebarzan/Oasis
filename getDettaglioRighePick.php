<?php

    include "connessione.php";

    $n_Pick=$_REQUEST["n_Pick"];

    $righe_pick=[];

    $query2="SELECT id_picking, docNum, lineNum, itemCode, dscription, quantity, onHand, prcrmntMtd, bancale, gruppo, sparato, volume, pesoNetto, pesoLordo, Misure, CASE WHEN chiuso='V' THEN 'true' ELSE 'false' END AS chiuso, dataChiusura
            FROM dbo.T_Picking_01
            WHERE (n_Pick = '$n_Pick')";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $riga["id_picking"]=$row2['id_picking'];
            $riga["docNum"]=$row2['docNum'];
            $riga["lineNum"]=$row2['lineNum'];
            $riga["itemCode"]=$row2['itemCode'];
            $riga["dscription"]=$row2['dscription'];
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
            $riga["dataChiusura"]=$row2['dataChiusura'];
            if($riga["dataChiusura"]!="")
                $riga["dataChiusuraString"]=$row2['dataChiusura']->format("d/m/Y H:i:s");
            else
                $riga["dataChiusuraString"]="";

            array_push($righe_pick,$riga);
        }
    }
    else
        die("error");

    echo json_encode($righe_pick);

?>