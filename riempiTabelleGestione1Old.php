<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(240))
	{
		svuotaMontaggio($conn);
		riempiMontaggio($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	function svuotaMontaggio($conn)
	{
		$query="DELETE gestione_montaggio FROM gestione_montaggio";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiMontaggio($conn)
	{
		$query="INSERT INTO [dbo].[gestione_montaggio]
           ([docnum]
           ,[settimana]
           ,[stazione]
           ,[totale_pezzi]
           ,[basi_portalavabo]
           ,[colonne]
           ,[pensili]
           ,[basi_accostabili]
           ,[Altro]
           ,[dataConsegna]
           ,[collezione]
           ,[sigla]) SELECT DISTINCT * FROM dettaglioMon_2";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
?>