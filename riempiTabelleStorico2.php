<?php
	include "connessione.php";
	include "Session.php";

	if(set_time_limit(240))
	{
		svuotaPtoPto($conn);
		riempiPtoPto($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	function svuotaPtoPto($conn)
	{
		$query="DELETE storico_punto_punto FROM storico_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiPtoPto($conn)
	{
		$query="INSERT INTO [dbo].[storico_punto_punto] ([settimana],[stazione],[ordini],[pezzi]) SELECT [settimana],[stazione],[ordini],[pezzi] FROM Q_st_carico_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
?>