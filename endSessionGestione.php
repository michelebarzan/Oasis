<?php
	include "session.php";
	include "connessione.php";
		
	$q2="DELETE tmpGestione FROM tmpGestione WHERE username='".$_SESSION['Username']."'";
	$r2=sqlsrv_query($conn,$q2);
	if($r2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		echo "ok";
?>