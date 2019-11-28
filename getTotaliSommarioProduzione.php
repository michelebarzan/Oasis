<?php

    include "Session.php";
    include "connessione.php";

    $settimana=$_REQUEST['settimana'];
    $stazione=$_REQUEST['stazione'];

    if($stazione=="CAB_LAC" || $stazione=="CAB_ACR")
    {
        $stazioneVisualizzata="gestione_verniciatura";
        $colonna="mq";
    }
    if($stazione=="PTO_PTO")
    {
        $stazioneVisualizzata="gestione_punto_punto";
        $colonna="totale_pezzi";
    }
    if($stazione=="MNT_MAST" || $stazione=="MNT_ACA" || $stazione=="MNT_HOME" || $stazione=="MNT_LUT")
    {
        $stazioneVisualizzata="gestione_montaggio";
        $colonna="totale_pezzi";
    }
        
    $query2="SELECT sum($colonna) AS totale FROM dbo.$stazioneVisualizzata WHERE stazione='$stazione' AND settimana='$settimana'";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            if($colonna=="totale_pezzi")
                echo $row2['totale'];
            else
                echo number_format($row2['totale'],1);
        }
    }

?>