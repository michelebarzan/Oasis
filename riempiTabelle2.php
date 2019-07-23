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
	
	
	
	function svuotaMontaggio($conn)
	{
		$query="DELETE carico_montaggi FROM carico_montaggi";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiMontaggio($conn)
	{
		$query="INSERT INTO carico_montaggi([settimana],[stazione],[totale_pezzi],[basi_portalavabo],[basi_accostabili],[colonne],[pensili],[altro]) SELECT [settimana],[stazione],[totale_pezzi],[basi_portalavabo],[basi_accostabili],[colonne],[pensili],[altro] FROM Q_carico_montaggi";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function svuotaPtoPto($conn)
	{
		$query="DELETE carico_punto_punto FROM carico_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiPtoPto($conn)
	{
		$query="INSERT INTO [dbo].[carico_punto_punto] ([settimana],[stazione],[ordini],[pezzi]) SELECT [settimana],[stazione],[ordini],[pezzi] FROM Q_carico_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function svuotaVerniciatura($conn)
	{
		$query="DELETE carico_verniciatura FROM carico_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiVerniciatura($conn)
	{
		$query="INSERT INTO [dbo].[carico_verniciatura] ([settimana],[stazione],[ordini],[pezzi],[mq]) SELECT [settimana],[stazione],[ordini],[pezzi],[mq] FROM Q_carico_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>