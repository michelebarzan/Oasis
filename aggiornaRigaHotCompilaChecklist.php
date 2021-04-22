<?php

    include "Session.php";
    include "connessione.php";

    $id_picking=$_REQUEST["id_picking"];
    $colonna=$_REQUEST["colonna"];
    $valore=$_REQUEST["valore"];
    $n_pick=$_REQUEST["n_pick"];

    if($colonna=="gruppo")
    {
        $q="UPDATE T_Picking_01 SET gruppo=$valore WHERE id_picking=$id_picking";
        $r=sqlsrv_query($conn,$q);
        if($r==FALSE)
        {
            die("error1".$q);
        }
    }
    else
    {
        if($valore=="Nessuno")
        {
            $q2="UPDATE T_Picking_01 SET bancale=NULL WHERE id_picking=$id_picking";
            $r2=sqlsrv_query($conn,$q2);
            if($r2==FALSE)
            {
                die("error2");
            }
        }
        else
        {
            $q="SELECT * FROM bancali WHERE nome='$valore' AND n_Pick='$n_pick'";
            $r=sqlsrv_query($conn,$q);
            if($r==FALSE)
            {
                die("error1");
            }
            else
            {
                $rows = sqlsrv_has_rows( $r );
                if ($rows === TRUE)
                {
                    $q2="UPDATE T_Picking_01 SET bancale=(SELECT id_bancale FROM bancali WHERE nome='$valore') WHERE id_picking=$id_picking";
                    $r2=sqlsrv_query($conn,$q2);
                    if($r2==FALSE)
                    {
                        die("error2");
                    }
                }
                else
                {
                    if($valore=="Nuovo bancale")
                    {
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
                        else
                        {
                            $q4="UPDATE T_Picking_01 SET bancale=(SELECT id_bancale FROM bancali WHERE nome='$bancale') WHERE id_picking=$id_picking";
                            $r4=sqlsrv_query($conn,$q4);
                            if($r4==FALSE)
                            {
                                die("error2");
                            }
                        }
                    }
                }
            }
        }
    }

?>