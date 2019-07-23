<?php
	include "session.php";
	include "connessione.php";
	
	$nome=$_REQUEST['nome'];
	$id_bancale=$_REQUEST['id_bancale'];
	
	$q="UPDATE bancali SET nome='$nome' WHERE id_bancale=$id_bancale";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		echo "ok";
?>