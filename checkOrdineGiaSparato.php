<?php
	include "connessione.php";

	$ordineForDati=$_REQUEST['ordineForDati'];
	$stazione=$_REQUEST['stazione'];
	
	$query2="select TOP(1) registrazioni_produzione.*,utenti.username FROM registrazioni_produzione,utenti WHERE registrazioni_produzione.utente=utenti.id_utente AND ordine='".$ordineForDati."' AND stazione='".$stazione."'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo "L' ordine è gia stato sparato in questa stazione da ".$row2['username']." il ".$row2['dataOra']->format('d/m/Y').".";
		}
	}
?>