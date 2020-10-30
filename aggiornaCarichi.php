<?php

    include "connessione.php";

    set_time_limit(240);

    $q="EXEC riempiTmpPicking";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
    }

?>