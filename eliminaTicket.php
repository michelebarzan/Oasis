<?php

	include "Session.php";
	include "connessione.php";
	
	$id_ticket=$_REQUEST['id_ticket'];
	
	/*$query2="DELETE partecipanti_ticket FROM partecipanti_ticket WHERE ticket=$id_ticket";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$query3="DELETE ticket FROM ticket WHERE id_ticket=$id_ticket";	
		$result3=sqlsrv_query($conn,$query3);
		if($result3==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}*/
	$query3="UPDATE ticket SET eliminato='true',dataOraEliminazione=getDate() WHERE id_ticket=$id_ticket";	
	$result3=sqlsrv_query($conn,$query3);
	if($result3==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo "ok";
	}
?>