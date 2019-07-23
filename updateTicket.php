<?php

	include "Session.php";
	include "connessione.php";
	
	$colonna=$_REQUEST['colonna'];
	$valore=$_REQUEST['valore'];
	$id_ticket=$_REQUEST['id_ticket'];
	
	$query2="UPDATE ticket SET [$colonna]='$valore' WHERE id_ticket=$id_ticket";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo "ok";
	}
?>