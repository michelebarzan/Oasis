<?php
    include "connessione.php";
    include "Session.php";

    $viewName=$_REQUEST['viewName'];

    $resultRighe=sqlsrv_query($conn,"DROP VIEW [$viewName]");
?>