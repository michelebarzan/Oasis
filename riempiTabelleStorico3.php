<?php
	include "connessione.php";
	include "Session.php";

	if(set_time_limit(240))
	{
		svuotaVerniciatura($conn);
		riempiVerniciatura($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	function svuotaVerniciatura($conn)
	{
		$query="DELETE storico_verniciatura FROM storico_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiVerniciatura($conn)
	{
		$query="INSERT INTO [dbo].[storico_verniciatura] ([settimana],[stazione],[ordini],[pezzi],[mq]) SELECT [settimana],[stazione],[ordini],[pezzi],[mq] FROM Q_st_carico_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>