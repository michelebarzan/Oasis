
<?php

    include "connessione.php";

    $ordine=$_REQUEST['ordine'];

    $fotoOrdine=[];

    //$server_adress=$_SERVER['SERVER_ADDR'];
    $server_adress="remote.oasisgroup.it";
    $path="http://$server_adress/oasisfotoproduzione/FotoProduzioneAndroid/";

    $query2="SELECT DISTINCT percorso,stazione FROM dbo.view_allegati_registrazioni WHERE ordine='$ordine'";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $stazione=$row2["stazione"];

            $nomeFile=explode($stazione."/",$row2['percorso'])[1];
            $foto["stazione"]=$stazione;
            $foto["nomeFile"]=$nomeFile;
            $foto["percorso"]=$path.$ordine."/".$stazione."/".$nomeFile;
            array_push($fotoOrdine,$foto);
        }
        echo json_encode($fotoOrdine);
    }
    else
        die("error");

?>