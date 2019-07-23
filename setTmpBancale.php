<?php
	include "session.php";
	include "connessione.php";
	$bancale=$_REQUEST['bancale'];
	
	$q="INSERT INTO tmpBancali (bancale) VALUES ('$bancale')";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
?>