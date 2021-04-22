<?php

    include "Session.php";
    include "connessione.php";

    $id_bancale=$_REQUEST["id_bancale"];
    $colonna=$_REQUEST["colonna"];
    $valore=str_replace("'","''",$_REQUEST["valore"]);
    $n_pick=$_REQUEST["n_pick"];

    if($colonna=="tipo")
    {
        $q="UPDATE bancali 
            SET nome=(SELECT '$valore' + CONVERT(varchar(MAX),
                (SELECT n_Pick
                FROM dbo.bancali
                WHERE (id_bancale = $id_bancale))) + '.' + CONVERT(varchar(MAX),
                (SELECT numero
                FROM dbo.bancali AS bancali_1
                WHERE (id_bancale = $id_bancale)))) 
            WHERE id_bancale=$id_bancale";
        $r=sqlsrv_query($conn,$q);
        if($r==FALSE)
        {
            die("error1".$q);
        }
    }
    else
    {
        $q="UPDATE bancali SET $colonna=$valore WHERE id_bancale=$id_bancale";
        $r=sqlsrv_query($conn,$q);
        if($r==FALSE)
        {
            die("error1".$q);
        }
    }

?>