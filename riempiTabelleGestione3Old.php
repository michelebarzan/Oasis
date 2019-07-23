<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(120))
	{
		svuotaVerniciatura($conn);
		riempiVerniciatura($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	
	function svuotaVerniciatura($conn)
	{
		$query="DELETE gestione_verniciatura FROM gestione_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiVerniciatura($conn)
	{
		$query="INSERT INTO [dbo].[gestione_verniciatura]
           ([docnum]
           ,[stazione]
           ,[totale_pezzi]
           ,[basi_portalavabo]
           ,[colonne]
           ,[pensili]
           ,[basi_accostabili]
           ,[Altro]
           ,[mq]
           ,[settimana]
           ,[dataConsegna]
           ,[collezione]
           ,[sigla]) SELECT DISTINCT * FROM dettaglioVer_2";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>