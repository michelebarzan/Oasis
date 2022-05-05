<?php

    include "connessione.php";

    $lotto = $_REQUEST["lotto"];
    $note = $_REQUEST["note"];

    $q2="INSERT INTO oasis_produzione.dbo.lotti (lotto,note,dataOra,chiuso,producibile) VALUES ('$lotto','$note',GETDATE(),'false','false')";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        $q3="SELECT MAX(id_lotto) AS id_lotto FROM oasis_produzione.dbo.lotti WHERE lotto = '$lotto'";
        $r3=sqlsrv_query($conn,$q3);
        if($r3==FALSE)
        {
            die("error".$q3);
        }
        else
        {
            while($row3=sqlsrv_fetch_array($r3))
            {
                echo $row3["id_lotto"];
            }
        }
    }

?>