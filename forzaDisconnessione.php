<?php
	include "session.php";
	include "connessione.php";
		
	$username=$_REQUEST['username'];
		
	$q="DELETE tmpGestione FROM tmpGestione WHERE username='$username'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo "ok";
	}
?>