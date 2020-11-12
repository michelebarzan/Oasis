<?php

    include "connessione.php";

    $ordine=$_REQUEST["ordine"];
	
	$pick["trovato"]=false;

    $query2="SELECT dbo.view_stampa_checklist.n_Pick, dbo.view_stampa_checklist.DataPick, dbo.view_stampa_checklist.descrPick, MAX(dbo.view_stampa_checklist.chiuso) AS chiuso, MAX(dbo.view_stampa_checklist.dataChiusura) 
                AS dataChiusura, MAX(dbo.view_stampa_checklist.controllato) AS controllato, MAX(dbo.view_stampa_checklist.dataControllato) AS dataControllato, MAX(dbo.view_stampa_checklist.stampato) AS stampato, 
                MAX(dbo.view_stampa_checklist.data_stampa_cecklist) AS data_stampa_cecklist, MAX(dbo.view_stampa_checklist.utenteChiusura) AS utenteChiusura, MAX(dbo.view_stampa_checklist.utenteControllato) AS utenteControllato, 
                MAX(dbo.view_stampa_checklist.utente_stampa_checklist) AS utente_stampa_checklist, dbo.view_stampa_checklist.nOrdini, dbo.view_stampa_checklist.nBancali, dbo.view_stampa_checklist.nGruppi, 
                dbo.view_stampa_checklist.righe
            FROM dbo.view_stampa_checklist INNER JOIN
                    (SELECT TOP (1) n_Pick
                    FROM dbo.T_Picking_01
                    WHERE (docNum = '$ordine')) AS derivedtbl_1 ON dbo.view_stampa_checklist.n_Pick = derivedtbl_1.n_Pick
            GROUP BY dbo.view_stampa_checklist.n_Pick, dbo.view_stampa_checklist.DataPick, dbo.view_stampa_checklist.descrPick, dbo.view_stampa_checklist.nOrdini, dbo.view_stampa_checklist.nBancali, dbo.view_stampa_checklist.nGruppi,  dbo.view_stampa_checklist.righe";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
			$pick["trovato"]=true;
			
            $pick["n_Pick"]=$row2['n_Pick'];
            if($row2['DataPick']==NULL)
                $pick["DataPick"]="";
            else
                $pick["DataPick"]=$row2['DataPick']->format('d/m/Y');
            $pick["descrPick"]=utf8_encode($row2['descrPick']);
            $pick["chiuso"]=$row2['chiuso'];
            if($row2['dataChiusura']==NULL)
                $pick["dataChiusura"]="";
            else
                $pick["dataChiusura"]=$row2['dataChiusura']->format('d/m/Y H:m:i');
            $pick["controllato"]=$row2['controllato'];
            if($row2['dataControllato']==NULL)
                $pick["dataControllato"]="";
            else
                $pick["dataControllato"]=$row2['dataControllato']->format('d/m/Y H:m:i');
            $pick["stampato"]=$row2['stampato'];
            if($row2['data_stampa_cecklist']==NULL)
                $pick["data_stampa_cecklist"]="";
            else
                $pick["data_stampa_cecklist"]=$row2['data_stampa_cecklist']->format('d/m/Y H:m:i');
            $pick["utente_stampa_checklist"]=$row2['utente_stampa_checklist'];
            $pick["utenteControllato"]=$row2['utenteControllato'];
            $pick["utenteChiusura"]=$row2['utenteChiusura'];
            $pick["nOrdini"]=$row2['nOrdini'];
            $pick["nBancali"]=$row2['nBancali'];
            $pick["nGruppi"]=$row2['nGruppi'];
            $pick["righe"]=$row2['righe'];
            $pick["righeChiuse"]=getRigheChiuse($conn,$row2['n_Pick']);
        }
        echo json_encode($pick);
    }
    else
        die("error0".$query2);

    function getRigheChiuse($conn,$n_Pick)
    {
        $query2="SELECT n_Pick, ISNULL(COUNT(*),0) AS righeChiuse
                FROM dbo.T_Picking_01 AS T_Picking_01_1
                WHERE (chiuso = 'V') AND (n_Pick = $n_Pick)
                GROUP BY n_Pick";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            while($row2=sqlsrv_fetch_array($result2))
            {
                return $row2['righeChiuse'];
            }
            return 0;
        }
        else
            die("error".$query2);
    }
?>