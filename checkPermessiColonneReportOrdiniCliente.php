<?php
	include "session.php";
	include "connessione.php";
		
	$stmt = sqlsrv_query( $conn, "SELECT * FROM permessi_colonne_report_ordini_cliente WHERE utente=".$_SESSION['id_utente']);

    if ($stmt) 
    {
        $rows = sqlsrv_has_rows( $stmt );
        if ($rows === true)
            echo "true";
        else
            echo "false";
    }
    else
        echo "false";
	
?>