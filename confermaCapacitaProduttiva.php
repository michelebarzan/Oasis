<?php

	include "Session.php";
	include "connessione.php";

	$stazione=$_REQUEST['stazione'];
	$um=$_REQUEST['um'];
	$week=$_REQUEST['week'];
	$capacitaProduttiva=$_REQUEST['capacitaProduttiva'];
	
	$query3="DELETE capacita_produttiva FROM capacita_produttiva WHERE settimana=$week AND stazione='$stazione'";
	$result3=sqlsrv_query($conn,$query3);
	if($result3==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$query2="INSERT INTO capacita_produttiva (settimana,capacita,um,stazione) VALUES ($week,$capacitaProduttiva,'$um','$stazione')";
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
	}
	
?>