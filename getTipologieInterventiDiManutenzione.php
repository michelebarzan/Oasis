<?php

    include "Session.php";
    include "connessione.php";

    $tipologie=[];

    $query2="SELECT * FROM tipologie_interventi_di_manutenzione where eliminata='false'";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $tipologia["id_tipologia"]=$row2['id_tipologia'];
            $tipologia["label"]=$row2['label'];
            array_push($tipologie,$tipologia);
        }
    }
    else
        die("error");

    echo json_encode($tipologie);
?>