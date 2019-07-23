<?php

	include "Session.php";
	include "connessione.php";
	
	$colore=$_REQUEST['colore'];
	$id_colore_collezione=$_REQUEST['id'];
	
	$query2="UPDATE colori_collezioni SET colore='$colore' WHERE id_colore_collezione=$id_colore_collezione";	
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