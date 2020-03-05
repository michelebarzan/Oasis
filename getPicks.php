
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

    $query2="SELECT TOP($filterTop) * FROM view_stampa_checklist WHERE chiuso='$filterChiuso' AND controllato='$filterControllato' AND stampato='$filterStampato' ORDER BY [$orderBy] $orderType";	
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

    echo json_encode($picks);

?>