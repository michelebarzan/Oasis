<?php
	include "session.php";
	include "connessione.php";
	
	$N_Pick=$_REQUEST['N_Pick'];
	$controllato=$_REQUEST['controllato'];
	
	$q="UPDATE T_Picking_01 SET controllato='$controllato' WHERE N_Pick=$N_Pick";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		echo "ok";
?>