<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];
    $data=$_REQUEST["data"];

    $articoli = [];

    foreach ($data as $row_lcl)
    {
        array_push($articoli,$row_lcl[0]);
    }

    $articoli = array_unique($articoli);

    $articoli_in = "'".implode("','",$articoli)."'";

    $articoli_trovati = [];

    $q="SELECT * FROM oasis_produzione.dbo.articoli WHERE codice_articolo IN ($articoli_in)";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
        die("error".$q);
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            array_push($articoli_trovati,$row["codice_articolo"]);
        }
    }

    $articoli_mancanti = array_diff($articoli,$articoli_trovati);

    $valuesArray=[];
    foreach ($articoli_mancanti as $articolo_mancante)
    {
        $descrizione = "";
        foreach ($data as $row_lcl_2)
        {
            if($row_lcl_2[0] == $articolo_mancante)
            {
                $descrizione = $row_lcl_2[1];
                break;
            }
        }
        array_push($valuesArray,"('$articolo_mancante','$descrizione','false')");
    }

    $valuesArrayChunkes = array_chunk($valuesArray,1000);

    foreach ($valuesArrayChunkes as $chunk)
    {
        $q2="INSERT INTO oasis_produzione.dbo.articoli (codice_articolo,descrizione,eliminato) VALUES";
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

    $id_articoli = [];
    $q5="SELECT * FROM oasis_produzione.dbo.articoli WHERE codice_articolo IN ($articoli_in)";
    $r5=sqlsrv_query($conn,$q5);
    if($r5==FALSE)
        die("error".$q5);
    else
    {
        while($row5=sqlsrv_fetch_array($r5))
        {
            $id_articoliObj["id_articolo"] = $row5["id_articolo"];
            $id_articoliObj["codice_articolo"] = $row5["codice_articolo"];

            array_push($id_articoli,$id_articoliObj);
        }
    }

    foreach ($data as $row_lcl_3)
    {
        $codice_articolo=$row_lcl_3[0];
        foreach ($id_articoli as $id_articoliObj_lcl)
        {
            if($id_articoliObj_lcl["codice_articolo"] == $codice_articolo)
            {
                $id_articolo=$id_articoliObj_lcl["id_articolo"];
                break;
            }
        }
        $qnt=$row_lcl_3[2];

        $q3="DELETE FROM oasis_produzione.dbo.articoli_lotti WHERE lotto = $id_lotto AND articolo = $id_articolo";
        $r3=sqlsrv_query($conn,$q3);
        if($r3==FALSE)
            die("error".$q3);

        $valuesArray2=[];
        for ($i=0; $i < $qnt; $i++)
        { 
            array_push($valuesArray2,"($id_lotto,$id_articolo)");
        }

        $valuesArray2Chunkes = array_chunk($valuesArray2,1000);

        foreach ($valuesArray2Chunkes as $chunk2)
        {
            $q4="INSERT INTO oasis_produzione.dbo.articoli_lotti (lotto,articolo) VALUES";
            $prefix2 = " ";
            foreach ($chunk2 as $item2)
            {
                $q4 .= $prefix2.$item2;
                $prefix2 = ",";
            }
        
            $r4=sqlsrv_query($conn,$q4);
            if($r4==FALSE)
                die("error".$q4);
        }
    }

?>