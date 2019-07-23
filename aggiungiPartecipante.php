<?php

	include "Session.php";
	include "connessione.php";
	
	$id_ticket=$_REQUEST['id_ticket'];
	$username=$_REQUEST['username'];
	
	$query2="INSERT INTO partecipanti_ticket (ticket,partecipante,dataOra) SELECT $id_ticket, utenti.id_utente,getDate() FROM utenti WHERE username='$username'";	
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