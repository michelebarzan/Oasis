<?php
    include "connessione.php";
    include "Session.php";

    $viewName=$_REQUEST['tmpViewName'];

    $q="DROP VIEW [$viewName]";
    $resultRighe=sqlsrv_query($conn,$q);

    if($resultRighe==TRUE)
    echo "ok";
    else
    {
        echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
    }
?>