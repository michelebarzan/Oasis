<?php

    include "connessione.php";

    $lotti=[];

    $q3="SELECT * FROM oasis_produzione.dbo.lotti ORDER BY dataOra DESC";
    $r3=sqlsrv_query($conn,$q3);
    if($r3==FALSE)
    {
        die("error".$q3);
    }
    else
    {
        while($row3=sqlsrv_fetch_array($r3))
        {
            $lotto["id_lotto"] = $row3["id_lotto"];
            $lotto["lotto"] = $row3["lotto"];
            $lotto["dataOraString"] = $row3["dataOra"]->format("d/m/Y H:i:s");
            $lotto["dataOra"] = $row3["dataOra"];
            $lotto["note"] = $row3["note"];
            $lotto["chiuso"] = filter_var($row3["chiuso"], FILTER_VALIDATE_BOOLEAN);
            $lotto["producibile"] = filter_var($row3["producibile"], FILTER_VALIDATE_BOOLEAN);
            
            array_push($lotti,$lotto);
        }
    }

    echo json_encode($lotti);

?>