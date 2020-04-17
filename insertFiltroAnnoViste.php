<?php

	include "connessione.php";
	
    $queries=json_decode($_REQUEST['JSONqueries']);	
    $utente=$_REQUEST['utente'];	
    $utilizzo=$_REQUEST['utilizzo'];	
    
    if(sqlsrv_query($conn,"DELETE FROM filtro_anno_viste WHERE utente=$utente AND utilizzo='$utilizzo'")==FALSE)
            die("error");
    
    foreach ($queries as $query)
    {
        if(sqlsrv_query($conn,$query)==FALSE)
            die("error");
    }
	
?>