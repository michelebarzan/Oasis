<?php

    include "Session.php";
    include "connessione.php";

    $n_pick=$_REQUEST["n_pick"];

    $q3="SELECT bancali.* FROM bancali WHERE n_Pick='$n_pick'";
    $r3=sqlsrv_query($conn,$q3);
    if($r3==FALSE)
    {
        die("error");
    }
    else
    {
        $rows3 = sqlsrv_has_rows( $r3 );
        if ($rows3 === true)
        {
            $qMax="SELECT MAX(numero) AS max FROM bancali WHERE n_Pick='$n_pick'";
            $rMax=sqlsrv_query($conn,$qMax);
            if($rMax==FALSE)
            {
                die("error");
            }
            else
            {
                while($rowMax=sqlsrv_fetch_array($rMax))
                {
                    $numero=$rowMax['max']+1;
                    $bancale='BANCALE'.$n_pick.'.'.$numero;
                    $qInsert="INSERT INTO bancali (nome,n_Pick,numero) VALUES ('$bancale',$n_pick,$numero)";
                }
            }
        }
        else 
        {
            $numero=0;
            $bancale='BANCALE'.$n_pick.'.'.$numero;
            $qInsert="INSERT INTO bancali (nome,n_Pick,numero) VALUES ('$bancale',$n_pick,$numero)";
        }
    }
    $rInsert=sqlsrv_query($conn,$qInsert);
    if($rInsert==FALSE)
    {
        die("error");
    }

?>