<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $id_articolo=$_REQUEST["id_articolo"];
    $qnt=$_REQUEST["qnt"];

    $q="DELETE FROM oasis_produzione.dbo.articoli_lotti WHERE lotto = $id_lotto AND articolo = $id_articolo";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
        die("error".$q);

    $valuesArray=[];
    for ($i=0; $i < $qnt; $i++)
    { 
        array_push($valuesArray,"($id_lotto,$id_articolo)");
    }

    $valuesArrayChunkes = array_chunk($valuesArray,1000);

    foreach ($valuesArrayChunkes as $chunk)
    {
        $q2="INSERT INTO oasis_produzione.dbo.articoli_lotti (lotto,articolo) VALUES";
        $prefix = " ";
        foreach ($chunk as $item)
        {
            $q2 .= $prefix.$item;
            $prefix = ",";
        }
    
        $r2=sqlsrv_query($conn,$q2);
        if($r2==FALSE)
            die("error".$q2);
    }

?>