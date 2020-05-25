
<?php

    include "Session.php";
    include "connessione.php";

    $filterTop=$_REQUEST["filterTop"];
    $filterChiuso=$_REQUEST["filterChiuso"];
    $filterControllato=$_REQUEST["filterControllato"];
    $filterStampato=$_REQUEST["filterStampato"];
    $orderBy=$_REQUEST["orderBy"];
    $orderType=$_REQUEST["orderType"];

    $picks=[];

    if($filterChiuso!="both" && $filterControllato!="both" && $filterStampato!="both")
	{
		$query2="SELECT TOP($filterTop) n_Pick, DataPick, descrPick, MAX(chiuso) AS chiuso, MAX(dataChiusura) AS dataChiusura, MAX(controllato) AS controllato, MAX(dataControllato) AS dataControllato, MAX(stampato) AS stampato, 
				 MAX(data_stampa_cecklist) AS data_stampa_cecklist, MAX(utenteChiusura) AS utenteChiusura, MAX(utenteControllato) AS utenteControllato, MAX(utente_stampa_checklist) AS utente_stampa_checklist, nOrdini, nBancali, 
				 nGruppi, righe FROM view_stampa_checklist WHERE chiuso='$filterChiuso' AND controllato='$filterControllato' AND stampato='$filterStampato' GROUP BY n_Pick, DataPick, descrPick, nOrdini, nBancali, nGruppi, righe ORDER BY [$orderBy] $orderType";	
	}
    else
    {
        if($filterChiuso=="both" && $filterControllato=="both" && $filterStampato=="both")
		{
			$query2="SELECT TOP($filterTop) n_Pick, DataPick, descrPick, MAX(chiuso) AS chiuso, MAX(dataChiusura) AS dataChiusura, MAX(controllato) AS controllato, MAX(dataControllato) AS dataControllato, MAX(stampato) AS stampato, 
                         MAX(data_stampa_cecklist) AS data_stampa_cecklist, MAX(utenteChiusura) AS utenteChiusura, MAX(utenteControllato) AS utenteControllato, MAX(utente_stampa_checklist) AS utente_stampa_checklist, nOrdini, nBancali, 
                         nGruppi, righe FROM view_stampa_checklist GROUP BY n_Pick, DataPick, descrPick, nOrdini, nBancali, nGruppi, righe ORDER BY [$orderBy] $orderType";	
		}
        else
        {
            $query2="SELECT TOP($filterTop) n_Pick, DataPick, descrPick, MAX(chiuso) AS chiuso, MAX(dataChiusura) AS dataChiusura, MAX(controllato) AS controllato, MAX(dataControllato) AS dataControllato, MAX(stampato) AS stampato, 
                         MAX(data_stampa_cecklist) AS data_stampa_cecklist, MAX(utenteChiusura) AS utenteChiusura, MAX(utenteControllato) AS utenteControllato, MAX(utente_stampa_checklist) AS utente_stampa_checklist, nOrdini, nBancali, 
                         nGruppi, righe FROM view_stampa_checklist WHERE ";
            if($filterChiuso!="both")
                $query2.="chiuso='$filterChiuso' AND ";	
            if($filterControllato!="both")
                $query2.="controllato='$filterControllato' AND ";	
            if($filterStampato!="both")
                $query2.="stampato='$filterStampato' AND ";	
            if(substr($query2, -4)=="AND ")
                $query2=substr($query2,0, -4);
            $query2.=" GROUP BY n_Pick, DataPick, descrPick, nOrdini, nBancali, nGruppi, righe ORDER BY [$orderBy] $orderType";
        }
    }
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
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

            array_push($picks,$pick);
        }
    }
    else
        die("error".$query2);
	
	//echo $query2;

    echo json_encode($picks);

?>